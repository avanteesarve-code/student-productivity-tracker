// NOTE: Current rule prevents more than one study session per day.
// This logic can be extended to allow multiple subjects per day if business rules change.


public with sharing class StudySessionService {

    public static void preventDuplicateSessions(List<Study_Session__c> newSessions) {

        Set<Date> studyDates = new Set<Date>();
        for (Study_Session__c ss : newSessions) {
            if (ss.Study_Date__c != null) {
                studyDates.add(ss.Study_Date__c);
            }
        }

        if (studyDates.isEmpty()) return;

        // Query existing sessions
        Set<Date> existingDates = new Set<Date>();
        for (Study_Session__c existing : [
            SELECT Study_Date__c
            FROM Study_Session__c
            WHERE Study_Date__c IN :studyDates
        ]) {
            existingDates.add(existing.Study_Date__c);
        }

        // Add error only to duplicates
        for (Study_Session__c ss : newSessions) {
            if (existingDates.contains(ss.Study_Date__c)) {
                ss.addError('A study session already exists for this date.');
            }
        }
    }
}
