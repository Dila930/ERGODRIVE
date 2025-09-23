import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-beban-kerja-kejadian',
  templateUrl: './beban-kerja-kejadian.page.html',
  styleUrls: ['./beban-kerja-kejadian.page.scss'],
  standalone: false,
})
export class BebanKerjaKejadianPage implements OnInit, OnDestroy {
  
  // Chart data for beban kerja kejadian
  chartData = {
    deteksiSensor: {
      title: 'Deteksi Sensor',
      data: [
        { label: 'Sensor Parkir', value: 88, percentage: 88 },
        { label: 'Sensor Tabrak', value: 92, percentage: 92 },
        { label: 'Sensor Blind Spot', value: 76, percentage: 76 },
        { label: 'Sensor Lintasan', value: 84, percentage: 84 }
      ]
    },
    sistemRem: {
      title: 'Sistem Rem ABS',
      data: [
        { label: 'Sensor Parkir', value: 1.2, percentage: 75 },
        { label: 'Sensor Tabrak', value: 0.8, percentage: 85 },
        { label: 'Sensor Blind Spot', value: 1.5, percentage: 65 },
        { label: 'Sensor Lintasan', value: 1.0, percentage: 80 }
      ]
    },
    akurasiNavigasi: {
      title: 'Akurasi Navigasi GPS',
      data: [
        { label: 'Sensor Parkir', value: 94, percentage: 94 },
        { label: 'Sensor Tabrak', value: 89, percentage: 89 },
        { label: 'Sensor Blind Spot', value: 82, percentage: 82 },
        { label: 'Sensor Lintasan', value: 91, percentage: 91 }
      ]
    },
    sistemKeamanan: {
      title: 'Sistem Keamanan',
      data: [
        { label: 'Sensor Parkir', value: 35, percentage: 35 },
        { label: 'Sensor Tabrak', value: 28, percentage: 28 },
        { label: 'Sensor Blind Spot', value: 45, percentage: 45 },
        { label: 'Sensor Lintasan', value: 52, percentage: 52 }
      ]
    }
  };

  // Statistics data
  statistics = {
    totalSensorEvents: 342,
    averageSystemResponse: 1.1,
    systemAccuracy: 89.5,
    safetyScore: 40.2,
    improvementRate: 8.7,
    lastMaintenanceDate: '2024-01-15',
    systemCheckDuration: '20 menit'
  };

  // Sensor types data
  sensorTypes = [
    {
      name: 'Sensor Parkir',
      icon: 'car-outline',
      count: 89,
      avgResponse: 1.2,
      accuracy: 94,
      safetyScore: 35,
      trend: 'up'
    },
    {
      name: 'Sensor Tabrak',
      icon: 'shield-outline',
      count: 76,
      avgResponse: 0.8,
      accuracy: 89,
      safetyScore: 28,
      trend: 'stable'
    },
    {
      name: 'Sensor Blind Spot',
      icon: 'eye-outline',
      count: 92,
      avgResponse: 1.5,
      accuracy: 82,
      safetyScore: 45,
      trend: 'down'
    },
    {
      name: 'Sensor Lintasan',
      icon: 'navigate-outline',
      count: 85,
      avgResponse: 1.0,
      accuracy: 91,
      safetyScore: 52,
      trend: 'up'
    }
  ];

  // Recent events
  recentEvents = [
    {
      id: 1,
      type: 'Pejalan Kaki',
      time: '2 menit yang lalu',
      responseTime: 1.1,
      accuracy: 96,
      stressLevel: 32,
      status: 'success'
    },
    {
      id: 2,
      type: 'Kendaraan Berhenti',
      time: '5 menit yang lalu',
      responseTime: 0.9,
      accuracy: 87,
      stressLevel: 25,
      status: 'success'
    },
    {
      id: 3,
      type: 'Perubahan Jalur',
      time: '8 menit yang lalu',
      responseTime: 1.8,
      accuracy: 78,
      stressLevel: 48,
      status: 'warning'
    },
    {
      id: 4,
      type: 'Hambatan Tiba-tiba',
      time: '12 menit yang lalu',
      responseTime: 1.2,
      accuracy: 93,
      stressLevel: 55,
      status: 'success'
    }
  ];

  // Performance trends
  performanceTrends = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    data: [82, 85, 79, 88, 91, 87, 90]
  };

  private updateInterval: any;

  constructor() {}

  ngOnInit() {
    this.startRealTimeUpdates();
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateChartData();
    }, 5000);
  }

  updateChartData() {
    Object.keys(this.chartData).forEach(key => {
      this.chartData[key as keyof typeof this.chartData].data.forEach(item => {
        const variation = Math.random() * 10 - 5;
        item.value = Math.max(0, Math.min(100, item.value + variation));
        item.percentage = item.value;
      });
    });
  }

  getBarColor(value: number): string {
    if (value >= 80) return '#28a745';
    if (value >= 60) return '#ffc107';
    return '#dc3545';
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'danger': return '#dc3545';
      default: return '#6c757d';
    }
  }

  getTrendIcon(trend: string): string {
    switch(trend) {
      case 'up': return 'trending-up-outline';
      case 'down': return 'trending-down-outline';
      case 'stable': return 'remove-outline';
      default: return 'help-outline';
    }
  }

  getTrendColor(trend: string): string {
    switch(trend) {
      case 'up': return '#28a745';
      case 'down': return '#dc3545';
      case 'stable': return '#ffc107';
      default: return '#6c757d';
    }
  }

  refreshData() {
    this.updateChartData();
  }

  exportData() {
    console.log('Exporting beban kerja kejadian data...');
  }

  getEventIcon(type: string): string {
    const event = this.eventTypes.find(e => e.name === type);
    return event ? event.icon : 'help-outline';
  }
}
