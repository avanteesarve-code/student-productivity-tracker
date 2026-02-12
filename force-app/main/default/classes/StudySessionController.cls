public with sharing class StudySessionController {

    @AuraEnabled(cacheable=true)
    public static List<Study_Session__c> getStudySessions() {
        return [
            SELECT Id, Study_Date__c, Subject__c, Duration_Hours__c
            FROM Study_Session__c
            ORDER BY Study_Date__c DESC
        ];
    }
    @AuraEnabled
public static void createStudySession(Date studyDate, String subject, Decimal duration) {

    Study_Session__c session = new Study_Session__c(
        Study_Date__c = studyDate,
        Subject__c = subject,
        Duration_Hours__c = duration
    );

    insert session;
}
}
