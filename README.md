## Student Productivity Tracker (Salesforce)
📌 Project Overview

The Student Productivity Tracker is a Salesforce-based application that helps students record and manage their daily study sessions.
This project demonstrates practical Salesforce development, including custom objects, validation rules, Apex triggers, bulk-safe logic, and automated testing — all tracked using GitHub.

The goal of this project is to showcase real-world Salesforce DX development practices, not just theoretical learning.

📝 Problem Statement

Students often lack a structured way to track:
-What subjects they study
-On which dates
-For how long

This application provides a simple yet scalable solution to log study sessions while enforcing meaningful business rules.

⚙️ Tech Stack

Platform: Salesforce (Developer Edition)
Language: Apex
IDE: Visual Studio Code
CLI: Salesforce CLI (SF CLI)
Extensions: Salesforce Extension Pack
Version Control: Git & GitHub
Project Format: Salesforce DX (SFDX)

## Features Implemented

1. Custom Object – Study Session:
A custom Salesforce object to store individual study sessions.
Fields:
Study_Date__c : Date of study
Subject__c : Subject studied
Duration_Hours__c : Number of hours studied

2. Validation Rule:
Ensures study duration values are valid
Prevents incorrect data entry at the UI level

3. Apex Trigger with Service Class Pattern:
Trigger executes before insert
Business logic is handled in a separate service class
Follows the thin trigger, fat service best practice

Business Rule Implemented:
A student can log multiple subjects on the same date,
but cannot log the same subject more than once for a given date.

4. Bulk-Safe Apex Logic:
-Handles single and bulk record inserts
-Uses Set collections for efficiency
-Executes a single SOQL query outside loops
-Fully compliant with Salesforce governor limits

5. Apex Test Class:
Covers both positive and negative scenarios
Validates trigger behavior
Ensures deployment readiness (75%+ test coverage)

## Project Structure
force-app/
 └── main/
     └── default/
         ├── classes/
         │   ├── StudySessionService.cls
         │   ├── StudySessionServiceTest.cls
         │   └── *.cls-meta.xml
         ├── triggers/
         │   ├── StudySessionTrigger.trigger
         │   └── *.trigger-meta.xml
         └── objects/
             └── Study_Session__c/

## Development Workflow
1. Created metadata (Object, Fields, Validation Rules) in Salesforce Org
2. Retrieved metadata into VS Code using Salesforce CLI
3. Implemented Apex logic using service-class architecture
4. Deployed changes to Salesforce Org
5. Verified functionality via UI testing and Apex tests
6. Committed changes daily to GitHub to track progress

## Testing & Validation
Manual testing through Salesforce UI
Automated Apex testing using:

sf apex run test --test-level RunLocalTests

Bulk scenarios tested to ensure scalability and correctness

## Author
Avantee Sarve
Computer Science and Business Systems Student
Aspiring Salesforce Developer

🔗 GitHub: [avanteesarve-code](https://github.com/avanteesarve-code)
🔗 [Student Productivity Tracker Repository](https://github.com/avanteesarve-code/student-productivity-tracker)

