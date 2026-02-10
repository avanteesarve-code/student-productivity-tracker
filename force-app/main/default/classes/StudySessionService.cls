

public with sharing class StudySessionService {

    public static void preventDuplicateSessions(List<Study_Session__c> newSessions) {

        Set<Date> studyDates = new Set<Date>();
        Set<String> subjects = new Set<String>();

        for (Study_Session__c ss : newSessions) {
            if (ss.Study_Date__c != null) {
                studyDates.add(ss.Study_Date__c);
                subjects.add(ss.Subject__c);

            }
        }

        if (studyDates.isEmpty() || subjects.isEmpty()) return;

        // Build a set of existing Date+Subject combinations
        Set<String> existingCombos = new Set<String>();

        for (Study_Session__c existing : [
            SELECT Study_Date__c, Subject__c
            FROM Study_Session__c
            WHERE Study_Date__c IN :studyDates
            AND Subject__c IN :subjects
        ]) {
            existingCombos.add(
                String.valueOf(existing.Study_Date__c) + '-' + existing.Subject__c
            );
        }

        // Validate incoming records
        for (Study_Session__c ss : newSessions) {
            String key = String.valueOf(ss.Study_Date__c) + '-' + ss.Subject__c;
            if (existingCombos.contains(key)) {
                ss.addError('You already logged this subject for the selected date.');
            }
        }
    }
}
