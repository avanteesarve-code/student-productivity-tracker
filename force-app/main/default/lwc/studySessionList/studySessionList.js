import { LightningElement, wire } from 'lwc';
import getStudySessions from '@salesforce/apex/StudySessionController.getStudySessions';
import createStudySession from '@salesforce/apex/StudySessionController.createStudySession';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getTotalStudyHours from '@salesforce/apex/StudySessionController.getTotalStudyHours';

export default class StudySessionList extends LightningElement {

    studyDate;
    subject;
    duration;

    sessions;
    wiredResult;

    columns = [
        { label: 'Date', fieldName: 'Study_Date__c', type: 'date' },
        { label: 'Subject', fieldName: 'Subject__c', type: 'text' },
        { label: 'Duration (Hours)', fieldName: 'Duration_Hours__c', type: 'number' }
    ];

    @wire(getStudySessions)
    wiredSessions(result) {
        this.wiredResult = result;
        if (result.data) {
            this.sessions = result.data;
        }
    }

    handleDateChange(event) {
        this.studyDate = event.target.value;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleDurationChange(event) {
        this.duration = event.target.value;
    }

    handleSave() {
        createStudySession({
            studyDate: this.studyDate,
            subject: this.subject,
            duration: this.duration
        })
        .then(() => {
            this.showToast('Success', 'Study Session Created', 'success');
            return refreshApex(this.wiredResult);
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
    @wire(getTotalStudyHours)
    wiredTotalHours({ data, error }) {
        if (data) {
            this.totalHours = data;
        }    else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
}
}