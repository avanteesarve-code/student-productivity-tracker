import { LightningElement, wire , api} from 'lwc';
import getStudySessions from '@salesforce/apex/StudySessionController.getStudySessions';
import createStudySession from '@salesforce/apex/StudySessionController.createStudySession';
import getTotalStudyHours from '@salesforce/apex/StudySessionController.getTotalStudyHours';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import LightningConfirm from 'lightning/confirm';
import {NavigationMixin} from 'lightning/navigation';

export default class StudySessionList extends NavigationMixin(LightningElement) {

    studyDate;
    subject;
    duration;

    sessions;
    wiredResult;
    totalHours;
    isLoading = false;

    // Helper to show lightning toasts; uses imported ShowToastEvent
    showToast(title, message, variant = 'info', mode = 'dismissible') {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant,
                mode
            })
        );
    }

    columns = [
        { label: 'Date', fieldName: 'Study_Date__c', type: 'date-local' },
        { label: 'Subject', fieldName: 'Subject__c', type: 'text' },
        { label: 'Duration (Hours)', fieldName: 'Duration_Hours__c', type: 'number' },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    {label : 'Edit', name: 'edit'}, // Placeholder for future edit functionality
                    { label: 'Delete', name: 'delete' }
                ]
            }
        }
    ];

 @api startDate;
    @api endDate;
    
    @wire(getStudySessions, {
        startDate: '$startDate',
        endDate: '$endDate'
    })
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
                this.dispatchEvent(new CustomEvent('refreshchart'));
            }

        } catch (error) {
            this.showToast('Error', error?.body?.message || 'Unknown error', 'error');
        }

        this.isLoading = false;
    
    }

   
    async handleRowAction(event) {

    const actionName = event.detail.action.name;
    const row = event.detail.row;

    if (actionName === 'edit') {

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {   
                recordId: row.Id,
                objectApiName: 'Study_Session__c',
                actionName: 'edit'
            }
        });
    }

    if (actionName === 'delete') {
        
        const confirmDelete = await LightningConfirm.open({
            message: 'Are you sure you want to delete this study session?',
            label: 'Confirm Deletion',
            variant: 'header',
            theme: 'error'
        });
        if (!confirmDelete) {
        return;
    }

        this.isLoading = true;

        try {

            await deleteRecord(row.Id);

            this.showToast('Success', 'Study Session Deleted', 'success');

            await refreshApex(this.wiredResult);
            this.dispatchEvent(new CustomEvent('refreshchart'));
        } catch (error) {
            this.showToast('Error', error?.body?.message || 'Delete failed', 'error');
        }

        this.isLoading = false;
    }
}
}
