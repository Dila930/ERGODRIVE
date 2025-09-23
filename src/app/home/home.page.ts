import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
    isOnline: true
  };
  
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
  
  private updateInterval: any;
  
  constructor() {}
  
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
    // Here you could add logic to load different data based on the selected menu
    console.log('Selected menu item:', menuItem);
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
  
  // Method to get bar color based on value
  getBarColor(value: number): string {
    if (value >= 80) return '#28a745'; // Green for high values
    if (value >= 60) return '#ffc107'; // Yellow for medium values
    return '#dc3545'; // Red for low values
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
  
}
