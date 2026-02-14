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
        { label: 'Date', fieldName: 'Study_Date__c', type: 'date-local' },
        { label: 'Subject', fieldName: 'Subject__c', type: 'text' },
        { label: 'Duration (Hours)', fieldName: 'Duration_Hours__c', type: 'number' }
    ];

    @wire(getStudySessions)
wiredSessions(value) {
    this.wiredResult = value;
    const { data, error } = value;

    if (data) {
        this.sessions = data;
    } else if (error) {
        console.error(error);
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

    async handleSave() {

    this.isLoading = true;

    try {

        await createStudySession({
            studyDate: this.studyDate,
            subject: this.subject,
            duration: this.duration
        });

        this.showToast('Success', 'Study Session Created', 'success');

        this.studyDate = null;
        this.subject = null;
        this.duration = null;

        if (this.wiredResult) {
            window.location.reload();
        }

    } catch (error) {
        this.showToast('Error', error?.body?.message || 'Unknown error', 'error');
    }

    this.isLoading = false;
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