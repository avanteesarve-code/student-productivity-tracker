import { LightningElement, wire } from 'lwc';
import getStudySessions from '@salesforce/apex/StudySessionController.getStudySessions';

export default class StudySessionList extends LightningElement {

    sessions;
    columns = [
        { label: 'Date', fieldName: 'Study_Date__c', type: 'date' },
        { label: 'Subject', fieldName: 'Subject__c', type: 'text' },
        { label: 'Duration (Hours)', fieldName: 'Duration_Hours__c', type: 'number' }
    ];

    @wire(getStudySessions)
    wiredSessions({ error, data }) {
        if (data) {
            this.sessions = data;
        } else if (error) {
            console.error(error);
        }
    }
}
