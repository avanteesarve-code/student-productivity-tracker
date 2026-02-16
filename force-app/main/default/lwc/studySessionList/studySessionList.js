import { LightningElement, wire } from 'lwc';
import getStudySessions from '@salesforce/apex/StudySessionController.getStudySessions';
import createStudySession from '@salesforce/apex/StudySessionController.createStudySession';
import getTotalStudyHours from '@salesforce/apex/StudySessionController.getTotalStudyHours';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import {LightningConfirm} from 'lightning/confirm';

export default class StudySessionList extends LightningElement {

    studyDate;
    subject;
    duration;

    sessions;
    wiredResult;
    totalHours;
    isLoading = false;

    columns = [
        { label: 'Date', fieldName: 'Study_Date__c', type: 'date-local' },
        { label: 'Subject', fieldName: 'Subject__c', type: 'text' },
        { label: 'Duration (Hours)', fieldName: 'Duration_Hours__c', type: 'number' },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'Delete', name: 'delete' }
                ]
            }
        }
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

  
    @wire(getTotalStudyHours)
    wiredTotalHours({ data, error }) {
        if (data !== undefined) {
            this.totalHours = data;
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
                await refreshApex(this.wiredResult);
            }

        } catch (error) {
            this.showToast('Error', error?.body?.message || 'Unknown error', 'error');
        }

        this.isLoading = false;
    }

   
    async handleRowAction(event) {

    const actionName = event.detail.action.name;
    const row = event.detail.row;

    if (actionName === 'delete') {

        const confirmed = await LightningConfirm.open({
            message: 'Are you sure you want to delete this Study Session?',
            variant: 'header',
            label: 'Confirm Delete'
        });

        if (!confirmed) {
            return;
        }

        this.isLoading = true;

        try {

            await deleteRecord(row.Id);

            this.showToast('Success', 'Study Session Deleted', 'success');

            if (this.wiredResult) {
                await refreshApex(this.wiredResult);
            }

        } catch (error) {
            this.showToast('Error', error?.body?.message || 'Delete failed', 'error');
        }

        this.isLoading = false;
    }
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
}
