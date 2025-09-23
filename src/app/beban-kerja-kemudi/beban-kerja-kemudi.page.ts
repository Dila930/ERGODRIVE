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
    }
  };

  // Statistics data
  statistics = {
    totalTrips: 156,
    averageSpeed: 58.5,
    maxSpeed: 120,
    minSpeed: 0,
    efficiencyRate: 12.3,
    lastTripDate: '2024-01-15',
    tripDuration: '45 menit'
  };

  // Performance trends
  performanceTrends = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    data: [65, 72, 68, 75, 80, 78, 82]
  };

  // Detailed analysis data
  detailedAnalysis = {
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
    }
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
      case 'excellent': return '#28a745';
      case 'good': return '#17a2b8';
      case 'average': return '#ffc107';
      case 'poor': return '#fd7e14';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  }

  getPerformanceStatus(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    if (score >= 60) return 'poor';
    return 'critical';
  }

  refreshData() {
    this.updateChartData();
  }

  exportData() {
    console.log('Exporting beban kerja kemudi data...');
  }
}
