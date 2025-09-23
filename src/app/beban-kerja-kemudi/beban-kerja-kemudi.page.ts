import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-beban-kerja-kemudi',
  templateUrl: './beban-kerja-kemudi.page.html',
  styleUrls: ['./beban-kerja-kemudi.page.scss'],
  standalone: false,
})
export class BebanKerjaKemudiPage implements OnInit, OnDestroy {
  
  // Chart data for beban kerja kemudi
  chartData = {
    // Existing charts
    kecepatanRataRata: {
      title: 'Kecepatan Rata-rata (km/h)',
      data: [
        { label: 'Jalan Tol', value: 85, percentage: 85 },
        { label: 'Jalan Raya', value: 55, percentage: 55 },
        { label: 'Perkotaan', value: 35, percentage: 35 }
      ]
    },
    konsumsiBbm: {
      title: 'Konsumsi BBM (km/L)',
      data: [
        { label: 'Jalan Tol', value: 12, percentage: 80 },
        { label: 'Jalan Raya', value: 10, percentage: 67 },
        { label: 'Perkotaan', value: 8, percentage: 53 }
      ]
    },
    suhuMesin: {
      title: 'Suhu Mesin (°C)',
      data: [
        { label: 'Jalan Tol', value: 85, percentage: 70 },
        { label: 'Jalan Raya', value: 90, percentage: 75 },
        { label: 'Perkotaan', value: 95, percentage: 79 }
      ]
    },
    tekananBan: {
      title: 'Tekanan Ban (PSI)',
      data: [
        { label: 'Depan Kiri', value: 32, percentage: 91 },
        { label: 'Depan Kanan', value: 31, percentage: 89 },
        { label: 'Belakang Kiri', value: 30, percentage: 86 },
        { label: 'Belakang Kanan', value: 30, percentage: 86 }
      ]
    },
    // New charts for template
    sdlp: {
      title: 'SDLP (cm)',
      data: [
        { label: 'Jalan Lurus', value: 12.5, percentage: 75 },
        { label: 'Belok Kanan', value: 15.2, percentage: 65 },
        { label: 'Belok Kiri', value: 14.8, percentage: 68 }
      ]
    },
    waktuReaksiPDT: {
      title: 'Waktu Reaksi PDT (ms)',
      data: [
        { label: 'Visual', value: 420, percentage: 80 },
        { label: 'Auditori', value: 380, percentage: 85 },
        { label: 'Taktil', value: 450, percentage: 75 }
      ]
    },
    pdtGagal: {
      title: 'PDT Gagal (%)',
      data: [
        { label: 'Visual', value: 8, percentage: 92 },
        { label: 'Auditori', value: 5, percentage: 95 },
        { label: 'Taktil', value: 12, percentage: 88 }
      ]
    }
  };

  // Statistics data
  statistics = {
    totalTrips: 156,
    totalTests: 42,
    averageSpeed: 58.5,
    averageScore: 87.5,
    maxSpeed: 120,
    minSpeed: 0,
    efficiencyRate: 12.3,
    improvementRate: 8.7,
    lastTripDate: '2024-01-15',
    tripDuration: '45 menit',
    testDuration: '15 menit'
  };

  // Performance trends
  performanceTrends = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    data: [65, 72, 68, 75, 80, 78, 82]
  };

  // Detailed analysis data
  detailedAnalysis = {
    // Existing properties
    enginePerformance: {
      current: 85,
      average: 78,
      improvement: 7,
      unit: '%'
    },
    fuelEfficiency: {
      current: 10.2,
      average: 9.5,
      improvement: 0.7,
      unit: 'km/L'
    },
    brakeCondition: {
      current: 92,
      average: 88,
      improvement: 4,
      unit: '%'
    },
    tireHealth: {
      current: 78,
      average: 82,
      improvement: -4,
      unit: '%'
    },
    // New properties for template
    reactionTime: {
      current: 1.2,
      average: 1.5,
      improvement: -0.3,
      unit: 's'
    },
    accuracy: {
      current: 92,
      average: 88,
      improvement: 4,
      unit: '%'
    },
    fatigueLevel: {
      current: 25,
      average: 30,
      improvement: -5,
      unit: '%'
    },
    focusLevel: {
      current: 88,
      average: 82,
      improvement: 6,
      unit: '%'
    }
  };

  private updateInterval: any;

  constructor() {}

  ngOnInit() {
    this.startRealTimeUpdates();
  }

  // Start real-time data updates
  private startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateChartData();
    }, 5000);
  }

  // Update chart data with random variations
  updateChartData() {
    Object.keys(this.chartData).forEach(key => {
      this.chartData[key as keyof typeof this.chartData].data.forEach(item => {
        const variation = Math.random() * 10 - 5;
        item.value = Math.max(0, Math.min(100, item.value + variation));
        item.percentage = item.value;
      });
    });
  }

  // Get bar color based on value
  getBarColor(value: number): string {
    if (value >= 80) return '#28a745'; // Green
    if (value >= 60) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  }

  // Get status color based on status
  getStatusColor(status: string): string {
    switch(status) {
      case 'success':
      case 'excellent':
        return '#28a745';
      case 'good':
        return '#17a2b8';
      case 'warning':
      case 'average':
        return '#ffc107';
      case 'poor':
        return '#fd7e14';
      case 'danger':
      case 'critical':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }

  // Get trend icon based on trend
  getTrendIcon(trend: string): string {
    switch(trend) {
      case 'up': return 'trending-up-outline';
      case 'down': return 'trending-down-outline';
      case 'stable': return 'remove-outline';
      default: return 'help-outline';
    }
  }

  // Get trend color based on trend
  getTrendColor(trend: string): string {
    switch(trend) {
      case 'up': return '#28a745';
      case 'down': return '#dc3545';
      case 'stable': return '#ffc107';
      default: return '#6c757d';
    }
  }

  // Get performance status based on score
  getPerformanceStatus(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    if (score >= 60) return 'poor';
    return 'critical';
  }

  // Refresh data
  refreshData() {
    this.updateChartData();
  }

  // Export data
  exportData() {
    console.log('Exporting beban kerja kemudi data...');
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
