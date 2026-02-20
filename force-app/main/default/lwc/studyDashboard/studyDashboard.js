import { LightningElement } from 'lwc';

export default class StudyDashboard extends LightningElement {

    refreshTrigger = 0;
    startDate;
    endDate;

    handleRefreshChart() {
        this.refreshTrigger++;
    }

    handleStartDateChange(event) {
        this.startDate = event.target.value;
        this.handleRefreshChart();
    }

    handleEndDateChange(event) {  
        this.endDate = event.target.value;
        this.handleRefreshChart();
    }
}