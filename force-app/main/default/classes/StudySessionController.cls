public with sharing class StudySessionController {

   @AuraEnabled
public static void createStudySession(String studyDate, String subject, Decimal duration) {

    Date convertedDate = Date.newInstance(
        Integer.valueOf(studyDate.substring(0,4)),
        Integer.valueOf(studyDate.substring(5,7)),
        Integer.valueOf(studyDate.substring(8,10))
    );

    Study_Session__c session = new Study_Session__c(
        Study_Date__c = convertedDate,
        Subject__c = subject,
        Duration_Hours__c = duration
    );

    insert session;
}

    @AuraEnabled(cacheable=true)
public static Decimal getTotalStudyHours() {

    AggregateResult result = [
        SELECT SUM(Duration_Hours__c) totalHours
        FROM Study_Session__c
    ];

    return (Decimal) result.get('totalHours');
}
   @AuraEnabled(cacheable=true)
public static Map<String, Decimal> getStudyHoursBySubject(Date startDate, Date endDate) {

    Map<String, Decimal> studyHoursBySubject = new Map<String, Decimal>();

    String baseQuery =
        'SELECT Subject__c, SUM(Duration_Hours__c) totalHours FROM Study_Session__c';

    if (startDate != null && endDate != null) {
        baseQuery +=
            ' WHERE Study_Date__c >= :startDate AND Study_Date__c <= :endDate';
    }

    baseQuery += ' GROUP BY Subject__c';

    for (AggregateResult result : Database.query(baseQuery)) {
        studyHoursBySubject.put(
            (String) result.get('Subject__c'),
            (Decimal) result.get('totalHours')
        );
    }

    return studyHoursBySubject;
}

   @AuraEnabled(cacheable=true)
public static List<Study_Session__c> getStudySessions(Date startDate, Date endDate) {

    if (startDate == null && endDate == null) {
        return [
            SELECT Id, Study_Date__c, Subject__c, Duration_Hours__c
            FROM Study_Session__c
            ORDER BY Study_Date__c DESC
        ];
    }

    return [
        SELECT Id, Study_Date__c, Subject__c, Duration_Hours__c
        FROM Study_Session__c
        WHERE Study_Date__c >= :startDate
        AND Study_Date__c <= :endDate
        ORDER BY Study_Date__c DESC
    ];
}
}
