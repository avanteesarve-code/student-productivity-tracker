@IsTest
public class StudySessionServiceTest {

    @IsTest
    static void testDuplicateStudySessionBlocked() {

        // First Study Session (should succeed)
        Study_Session__c session1 = new Study_Session__c(
            Study_Date__c = Date.today(),
            Duration_Hours__c = 2,
            Subject__c = 'Math'
        );
        insert session1;

        // Second Study Session on same date (should fail)
        Study_Session__c session2 = new Study_Session__c(
            Study_Date__c = Date.today(),
            Duration_Hours__c = 3,
            Subject__c = 'Science'
        );

        Test.startTest();
        try {
            insert session2;
            System.assert(false, 'Duplicate session should not be allowed');
        } catch (DmlException e) {
            System.assert(
                e.getMessage().contains('already exists'),
                'Expected duplicate session error'
            );
        }
        Test.stopTest();
    }

    @IsTest
    static void testBulkInsertWithOneDuplicate() {

        // Existing record
        insert new Study_Session__c(
            Study_Date__c = Date.today(),
            Duration_Hours__c = 2,
            Subject__c = 'Math'
        );

        List<Study_Session__c> sessions = new List<Study_Session__c>{
            new Study_Session__c(
                Study_Date__c = Date.today(),
                Duration_Hours__c = 1,
                Subject__c = 'Physics'
            ),
            new Study_Session__c(
                Study_Date__c = Date.today().addDays(1),
                Duration_Hours__c = 3,
                Subject__c = 'Chemistry'
            )
        };

        Test.startTest();
        try {
            insert sessions;
            System.assert(false, 'One record should have failed');
        } catch (DmlException e) {
            System.assert(true);
        }
        Test.stopTest();
    }
}
