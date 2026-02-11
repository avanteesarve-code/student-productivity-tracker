public with sharing class StudySessionController {

    @AuraEnabled(cacheable=true)
    public static List<Study_Session__c> getStudySessions() {
        return [
            SELECT Id, Study_Date__c, Subject__c, Duration_Hours__c
            FROM Study_Session__c
            ORDER BY Study_Date__c DESC
        ];
    }
}
