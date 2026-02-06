public with sharing class StudySessionService {

    public static void preventDuplicateSessions(List<Study_Session__c> newSessions) {

        Set<Date> studyDates = new Set<Date>();
        for (Study_Session__c ss : newSessions) {
            if (ss.Study_Date__c != null) {
                studyDates.add(ss.Study_Date__c);
            }
        }

        if (studyDates.isEmpty()) return;

        List<Study_Session__c> existingSessions = [
            SELECT Id, Study_Date__c
            FROM Study_Session__c
            WHERE Study_Date__c IN :studyDates
        ];

        if (!existingSessions.isEmpty()) {
            for (Study_Session__c ss : newSessions) {
                ss.addError('A study session already exists for this date.');
            }
        }
    }
}
