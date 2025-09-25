import { Injectable } from '@angular/core';
import { 
  Auth, 
  authState, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User,
  UserCredential,
  updateProfile
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
  createdAt: any;
  lastLogin: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.user$ = authState(this.auth).pipe(
      tap(user => {
        this.isAuthenticatedSubject.next(!!user);
      })
    );

    // Check authentication state on app initialization
    this.checkAuthState();
  }

  // Check current authentication state
  private async checkAuthState() {
    const user = this.auth.currentUser;
    this.isAuthenticatedSubject.next(!!user);
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  // Login dengan Google
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      // Request email and profile information
      provider.addScope('email');
      provider.addScope('profile');
      
      const credential = await signInWithPopup(this.auth, provider);
      if (credential.user) {
        await this.updateUserData(credential);
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error("Login Google Gagal:", error);
      throw this.handleAuthError(error);
    }
  }

  // Login dengan Email & Password
  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      if (!email || !password) {
        throw new Error('Email dan password tidak boleh kosong');
      }

      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      if (credential.user) {
        await this.updateUserData(credential);
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error("Login Gagal:", error);
      throw this.handleAuthError(error);
    }
  }

  // Register with Email & Password
  async registerWithEmail(email: string, password: string, displayName?: string): Promise<void> {
    try {
      if (!email || !password) {
        throw new Error('Email dan password tidak boleh kosong');
      }

      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (credential.user) {
        // Update display name if provided
        if (displayName) {
          await this.updateUserProfile({ displayName });
        }
        await this.updateUserData(credential);
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error("Register Gagal:", error);
      throw this.handleAuthError(error);
    }
  }

  // Update user profile (display name, photo URL, etc.)
  private async updateUserProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      await updateProfile(user, profile);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/welcome']);
    } catch (error: any) {
      console.error("Logout Gagal:", error);
      throw this.handleAuthError(error);
    }
  }

  // Handle Firebase authentication errors
  private handleAuthError(error: any): Error {
    let message = 'Terjadi kesalahan yang tidak diketahui';

    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Akun tidak ditemukan';
          break;
        case 'auth/wrong-password':
          message = 'Password salah';
          break;
        case 'auth/email-already-in-use':
          message = 'Email sudah digunakan';
          break;
        case 'auth/weak-password':
          message = 'Password terlalu lemah';
          break;
        case 'auth/invalid-email':
          message = 'Format email tidak valid';
          break;
        case 'auth/user-disabled':
          message = 'Akun telah dinonaktifkan';
          break;
        case 'auth/too-many-requests':
          message = 'Terlalu banyak percobaan login, coba lagi nanti';
          break;
        case 'auth/popup-closed-by-user':
          message = 'Login dibatalkan';
          break;
        case 'auth/popup-blocked':
          message = 'Popup diblokir oleh browser';
          break;
        default:
          message = error.message || 'Terjadi kesalahan saat autentikasi';
      }
    } else if (error.message) {
      message = error.message;
    }

    return new Error(message);
  }

  // Save or update user data in Firestore
  private async updateUserData(credential: UserCredential): Promise<void> {
    const user = credential.user;
    if (!user) return;

    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userSnap = await getDoc(userRef);
    const timestamp = serverTimestamp();

    const userData: UserData = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      providerId: credential.providerId || 'email',
      createdAt: userSnap.exists() ? userSnap.data()['createdAt'] : timestamp,
      lastLogin: timestamp
    };

    // If it's a new user, set the creation timestamp
    if (!userSnap.exists()) {
      userData.createdAt = timestamp;
    }

    return setDoc(userRef, userData, { merge: true });
  }

  // Get user data from Firestore
  getUserData(uid: string): Observable<UserData | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userRef)).pipe(
      switchMap(snapshot => {
        if (snapshot.exists()) {
          return [snapshot.data() as UserData];
        } else {
          return [null];
        }
      })
    );
  }
}