import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isVisible = true;
  isCollapsed = true; // Default collapsed saat pertama kali dibuka
  currentRoute: string = '';

  constructor(
    private router: Router,
    private authService: AuthService // <-- Disuntikkan
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  // Fungsi logout ditambahkan
  logout() {
    this.authService.logout();
  }

  // Fungsi untuk toggle sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
