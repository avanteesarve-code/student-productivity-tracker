## Student Productivity Tracker (Salesforce)
📌 Project Overview

The Student Productivity Tracker is a Salesforce-based application that helps students record and manage their daily study sessions.
This project demonstrates practical Salesforce development, including custom objects, validation rules, Apex triggers, bulk-safe logic, and automated testing - all tracked using GitHub.

The goal of this project is to showcase real-world Salesforce DX development practices, not just theoretical learning.

📝 Problem Statement

Students often lack a structured way to track:<br>
-What subjects they study<br>
-On which dates<br>
-For how long<br>

This application provides a simple yet scalable solution to log study sessions while enforcing meaningful business rules.

⚙️ Tech Stack

Platform: Salesforce (Developer Edition)<br>
Language: Apex<br>
IDE: Visual Studio Code<br>
CLI: Salesforce CLI (SF CLI)<br>
Extensions: Salesforce Extension Pack<br>
Version Control: Git & GitHub<br>
Project Format: Salesforce DX (SFDX)<br>

## Features Implemented

1. Custom Object – Study Session:<br>
A custom Salesforce object to store individual study sessions.<br>
Fields:<br>
Study_Date__c : Date of study<br>
Subject__c : Subject studied<br>
Duration_Hours__c : Number of hours studied<br>

2. Validation Rule:<br>
Ensures study duration values are valid<br>
Prevents incorrect data entry at the UI level<br>

3. Apex Trigger with Service Class Pattern:<br>
Trigger executes before insert<br>
Business logic is handled in a separate service class<br>
Follows the thin trigger, fat service best practice<br>

Business Rule Implemented:<br>
A student can log multiple subjects on the same date,<br>
but cannot log the same subject more than once for a given date.<br>

4. Bulk-Safe Apex Logic:<br>
-Handles single and bulk record inserts<br>
-Uses Set collections for efficiency<br>
-Executes a single SOQL query outside loops<br>
-Fully compliant with Salesforce governor limits<br>

5. Apex Test Class:<br>
Covers both positive and negative scenarios<br>
Validates trigger behavior<br>
Ensures deployment readiness (75%+ test coverage)<br>

## Project Structure
force-app/<br>
 └── main/<br>
     └── default/<br>
         ├── classes/<br>
         │   ├── StudySessionService.cls<br>
         │   ├── StudySessionServiceTest.cls<br>
         │   └── *.cls-meta.xml<br>
         ├── triggers/<br>
         │   ├── StudySessionTrigger.trigger<br>
         │   └── *.trigger-meta.xml<br>
         └── objects/<br>
             └── Study_Session__c/<br>

## Development Workflow
1. Created metadata (Object, Fields, Validation Rules) in Salesforce Org<br>
2. Retrieved metadata into VS Code using Salesforce CLI<br>
3. Implemented Apex logic using service-class architecture<br>
4. Deployed changes to Salesforce Org<br>
5. Verified functionality via UI testing and Apex tests<br>
6. Committed changes daily to GitHub to track progress<br>

## Testing & Validation
Manual testing through Salesforce UI<br>
Automated Apex testing using:<br>

'''sf apex run test --test-level RunLocalTests'''<br>

Bulk scenarios tested to ensure scalability and correctness<br>

## Author
Avantee Sarve<br>
Computer Science and Business Systems Student<br>
Aspiring Salesforce Developer<br>


🔗 GitHub: [avanteesarve-code](https://github.com/avanteesarve-code)<br>
🔗 [Student Productivity Tracker Repository](https://github.com/avanteesarve-code/student-productivity-tracker)

