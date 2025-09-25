import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  
  activeMenuItem: string = 'Beban Kerja (Kemudi)';
  
  // Chart data for different metrics
  chartData = {
    kecepatanRataRata: {
      title: 'Kecepatan Rata-rata',
      data: [
        { label: 'Tanpa Lalu Lintas', value: 75, percentage: 75 },
        { label: 'Lawan Arah', value: 60, percentage: 60 },
        { label: 'Kendaraan Depan', value: 45, percentage: 45 }
      ]
    },
    sdlp: {
      title: 'SDLP',
      data: [
        { label: 'Tanpa Lalu Lintas', value: 85, percentage: 85 },
        { label: 'Lawan Arah', value: 70, percentage: 70 },
        { label: 'Kendaraan Depan', value: 55, percentage: 55 }
      ]
    },
    waktuReaksiPDT: {
      title: 'Waktu Reaksi PDT',
      data: [
        { label: 'Tanpa Lalu Lintas', value: 40, percentage: 40 },
        { label: 'Lawan Arah', value: 65, percentage: 65 },
        { label: 'Kendaraan Depan', value: 50, percentage: 50 }
      ]
    },
    pdtGagal: {
      title: 'PDT Gagal',
      data: [
        { label: 'Tanpa Lalu Lintas', value: 90, percentage: 90 },
        { label: 'Lawan Arah', value: 95, percentage: 95 },
        { label: 'Kendaraan Depan', value: 88, percentage: 88 }
      ]
    }
  };
  
  // Menu items for sidebar
  menuItems = [
    { id: 'beban-kerja-kemudi', label: 'Beban Kerja (Kemudi)', icon: 'speedometer-outline' },
    { id: 'beban-kerja-kejadian', label: 'Beban Kerja (Kejadian)', icon: 'alert-circle-outline' },
    { id: 'tes-kantuk', label: 'Tes Kantuk', icon: 'bed-outline' },
    { id: 'waktu-reaksi-rem', label: 'Waktu Reaksi Rem', icon: 'time-outline' },
    { id: 'waktu-reaksi-kemudi', label: 'Waktu Reaksi Kemudi', icon: 'car-outline' }
  ];
  
  // User information
  userInfo = {
    name: 'Jimmy',
    initial: 'J',
    status: 'Online',
    isOnline: true,
    email: 'jimmy@example.com',
    phone: '+62 812 3456 7890'
  };
  
  // Edit user information for modal
  editUserInfo = {
    name: 'Jimmy',
    email: 'jimmy@example.com',
    phone: '+62 812 3456 7890',
    status: 'Online'
  };
  
  // Modal state
  showProfileModal: boolean = false;
  
  // Dashboard statistics
  dashboardStats = {
    totalTests: 24,
    completedTests: 18,
    averageScore: 78,
    lastTestDate: '2024-01-15',
    streakDays: 5
  };
  
  // Recent activities
  recentActivities = [
    { id: 1, type: 'test', title: 'Tes Beban Kerja Kemudi', time: '2 jam yang lalu', status: 'completed' },
    { id: 2, type: 'alert', title: 'Peringatan Kantuk', time: '4 jam yang lalu', status: 'warning' },
    { id: 3, type: 'test', title: 'Tes Waktu Reaksi', time: '1 hari yang lalu', status: 'completed' },
    { id: 4, type: 'achievement', title: '5 Hari Berturut-turut', time: '2 hari yang lalu', status: 'success' }
  ];
  
  // Notifications
  notifications = [
    { id: 1, title: 'Tes Terjadwal', message: 'Tes Beban Kerja Kemudi akan dimulai dalam 1 jam', time: '30 menit yang lalu', read: false },
    { id: 2, title: 'Pencapaian', message: 'Anda telah menyelesaikan 20 tes!', time: '2 jam yang lalu', read: true },
    { id: 3, title: 'Peringatan', message: 'Waktu istirahat Anda kurang dari 6 jam', time: '5 jam yang lalu', read: true }
  ];
  
  // Performance trends
  performanceTrends = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    data: [65, 72, 68, 75, 80, 78, 82]
  };
  
  // Weekly performance data for new chart format
  weeklyPerformanceData = [
    { day: 'Sen', value: 65, score: '65%' },
    { day: 'Sel', value: 72, score: '72%' },
    { day: 'Rab', value: 68, score: '68%' },
    { day: 'Kam', value: 75, score: '75%' },
    { day: 'Jum', value: 80, score: '80%' },
    { day: 'Sab', value: 78, score: '78%' },
    { day: 'Min', value: 82, score: '82%' }
  ];
  
  private updateInterval: any;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Start real-time data updates
    this.startRealTimeUpdates();
  }
  
  ngOnDestroy() {
    // Clean up interval when component is destroyed
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
  
  // Start real-time data updates
  private startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateChartData();
    }, 5000); // Update every 5 seconds
  }
  
  // Method to handle menu item clicks
  selectMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
    
    // Navigate to the appropriate page based on menu item
    switch(menuItem) {
      case 'Beban Kerja (Kemudi)':
        this.router.navigate(['/beban-kerja-kemudi']);
        break;
      case 'Beban Kerja (Kejadian)':
        this.router.navigate(['/beban-kerja-kejadian']);
        break;
      case 'Tes Kantuk':
        this.router.navigate(['/tes-kantuk']);
        break;
      case 'Waktu Reaksi Rem':
        this.router.navigate(['/waktu-reaksi-rem']);
        break;
      case 'Waktu Reaksi Kemudi':
        this.router.navigate(['/waktu-reaksi-kemudi']);
        break;
      default:
        console.log('Selected menu item:', menuItem);
    }
  }
  
  // Method to get chart data by key
  getChartData(key: string) {
    return this.chartData[key as keyof typeof this.chartData] || null;
  }
  
  // Method to simulate real-time data updates
  updateChartData() {
    // This would typically come from an API or real-time data source
    Object.keys(this.chartData).forEach(key => {
      this.chartData[key as keyof typeof this.chartData].data.forEach(item => {
        // Add some random variation to simulate real-time updates
        const variation = Math.random() * 10 - 5; // -5 to +5
        item.value = Math.max(0, Math.min(100, item.value + variation));
        item.percentage = item.value;
      });
    });
  }
  
  
  // Method to get status color
  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#28a745';
      case 'warning': return '#ffc107';
      case 'success': return '#17a2b8';
      case 'error': return '#dc3545';
      default: return '#6c757d';
    }
  }
  
  // Method to get activity icon
  getActivityIcon(type: string): string {
    switch (type) {
      case 'test': return 'checkmark-circle-outline';
      case 'alert': return 'alert-circle-outline';
      case 'achievement': return 'trophy-outline';
      default: return 'information-circle-outline';
    }
  }
  
  // Method to mark notification as read
  markNotificationAsRead(notificationId: number) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }
  
  // Method to get unread notifications count
  getUnreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
  
  // Method to refresh data
  refreshData() {
    this.updateChartData();
    console.log('Data refreshed');
  }
  
  // Method to export data
  exportData() {
    console.log('Exporting data...');
    // Implementation for data export
  }
  
  // Method to get performance status
  getPerformanceStatus(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  }
  
  // Method to calculate progress percentage
  getProgressPercentage(): number {
    return (this.dashboardStats.completedTests / this.dashboardStats.totalTests) * 100;
  }
  
  // Profile modal methods
  openProfileModal() {
    // Load current user info into edit form
    this.editUserInfo = {
      name: this.userInfo.name,
      email: this.userInfo.email || '',
      phone: this.userInfo.phone || '',
      status: this.userInfo.status
    };
    this.showProfileModal = true;
  }
  
  closeProfileModal() {
    this.showProfileModal = false;
  }
  
  saveProfile() {
    // Update user info with edited data
    this.userInfo.name = this.editUserInfo.name;
    this.userInfo.email = this.editUserInfo.email;
    this.userInfo.phone = this.editUserInfo.phone;
    this.userInfo.status = this.editUserInfo.status;
    this.userInfo.initial = this.editUserInfo.name.charAt(0).toUpperCase();
    this.userInfo.isOnline = this.editUserInfo.status === 'Online';
    
    // Save to localStorage
    this.saveUserProfile();
    
    // Close modal
    this.closeProfileModal();
    
    console.log('Profile saved:', this.userInfo);
  }
  
  changeAvatar() {
    // For now, just generate a random initial
    const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const randomInitial = names[Math.floor(Math.random() * names.length)];
    this.userInfo.initial = randomInitial;
    this.editUserInfo.name = this.editUserInfo.name; // Keep the name but update initial
    
    console.log('Avatar changed to:', randomInitial);
  }
  
  saveUserProfile() {
    // Save user profile to localStorage
    try {
      localStorage.setItem('ergodriveUserProfile', JSON.stringify(this.userInfo));
      console.log('User profile saved to localStorage');
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }
  
  loadUserProfile() {
    // Load user profile from localStorage
    try {
      const savedProfile = localStorage.getItem('ergodriveUserProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        this.userInfo = { ...this.userInfo, ...profileData };
        console.log('User profile loaded from localStorage:', this.userInfo);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }
  
}
