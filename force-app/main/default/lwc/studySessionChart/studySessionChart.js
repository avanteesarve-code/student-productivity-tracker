import { LightningElement, wire } from 'lwc';
import getStudyHoursBySubject from '@salesforce/apex/StudySessionController.getStudyHoursBySubject';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';

export default class StudySessionChart extends LightningElement {

    chart;
    chartJsInitialized = false;
    chartData;

    @wire(getStudyHoursBySubject)
    wiredData({ data, error }) {
        if (data) {
            this.chartData = data;
            this.renderChart();
        } else if (error) {
            console.error(error);
        }
    }

    renderedCallback() {
        if (this.chartJsInitialized) {
            return;
        }

        
        loadScript(this, ChartJS)
            .then(() => {
                this.chartJsInitialized = true;
                if (this.chartData) {
                    this.renderChart();
                }
            })
            .catch(error => {
                console.error('ChartJS load error:', error);
            });
    }

   renderChart() {

    if (!this.chartJsInitialized || !this.chartData) {
        return;
    }

    const canvas = this.template.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Convert Map → Array
    const labels = Object.keys(this.chartData);
    const values = Object.values(this.chartData);

    if (this.chart) {
        this.chart.destroy();
    }

    this.chart = new window.Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Total Study Hours',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}}
