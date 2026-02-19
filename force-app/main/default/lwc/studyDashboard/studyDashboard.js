import {LightningElement} from 'lwc';

export default class StudyDashboard extends LightningElement {
    // This component serves as a container for the StudySessionList and StudySessionChart components.
   
    refreshTrigger = 0;
    handleRefreshChart() {
        // Incrementing the trigger to force child components to refresh their data
        this.refreshTrigger++;
    }
}   