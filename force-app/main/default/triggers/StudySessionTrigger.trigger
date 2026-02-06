trigger StudySessionTrigger on Study_Session__c (before insert) {
    StudySessionService.preventDuplicateSessions(Trigger.new);
}
