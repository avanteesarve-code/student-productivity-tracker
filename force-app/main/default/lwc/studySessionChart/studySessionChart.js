import { LightningElement, wire, api } from 'lwc';
import getStudyHoursBySubject from '@salesforce/apex/StudySessionController.getStudyHoursBySubject';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';
import { refreshApex } from '@salesforce/apex';


export default class StudySessionChart extends LightningElement {

    chart;
    chartJsInitialized = false;
    chartData;

    _refreshTrigger;

    @api
set refreshTrigger(value) {
    this._refreshTrigger = value;

    this.refreshChartData();
}

get refreshTrigger() {
    return this._refreshTrigger;
}

async refreshChartData() {
    if (this.wiredChartResult) {
        await refreshApex(this.wiredChartResult);
    }
}
   wiredChartResult;

@wire(getStudyHoursBySubject)
wiredData(value) {
    this.wiredChartResult = value;

    const { data, error } = value;

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
            }
        });
    }
}
