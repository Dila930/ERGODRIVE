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

  // Statistics data
  statistics = {
    totalTests: 156,
    averageScore: 78.5,
    highestScore: 95,
    lowestScore: 45,
    improvementRate: 12.3,
    lastTestDate: '2024-01-15',
    testDuration: '15 menit'
  };

  // Performance trends
  performanceTrends = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    data: [65, 72, 68, 75, 80, 78, 82]
  };

  // Detailed analysis data
  detailedAnalysis = {
    reactionTime: {
      current: 1.2,
      average: 1.5,
      improvement: -0.3,
      unit: 'detik'
    },
    accuracy: {
      current: 92,
      average: 85,
      improvement: 7,
      unit: '%'
    },
    fatigueLevel: {
      current: 15,
      average: 25,
      improvement: -10,
      unit: '%'
    },
    focusLevel: {
      current: 88,
      average: 75,
      improvement: 13,
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
