# Getting Started with Create Express

## SETUP ENVIROMENT VARIABLE
Create a .env file with following envrionment varibales
change the value for your setting
```javascript
#express
PORT=3000
HOST=localhost

#database
CONNECTION_LIMIT=10
PASSWORD=kai
DB_USER=root
DATABASE=CSE416
DB_HOST=localhost
DB_PORT=3306
```

## SETUP FIREBASE AUTHENTICATION
https://firebase.google.com/docs/admin/setup#linux-or-macos

In project setting => service account => generate private key

To set the environment variable:

Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the file path of the JSON file that contains your service account key. This variable only applies to your current shell session, so if you open a new session, set the variable again.

Linux or Mac
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"

Windows With PowerShell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"


## Current Database Schema

```javascript

CREATE TABLE Users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    displayName VARCHAR(50) NOT NULL,
    experience INT DEFAULT 0,
    creationTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userId),
    KEY(id)
);

CREATE TABLE Quiz(
	quizId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(32) NOT NULL,
    quizName varchar(50) DEFAULT "Untitled",
    quizCatgeory INT UNSIGNED NOT NULL,
    quizDescription varchar(200) DEFAULT "",
    isPublished smallint,
    takeCounts INT DEFAULT 0,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    timeLimit DOUBLE DEFAULT 0,
    thumbnail VARCHAR(1000),
    creationTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Question(
	questionId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quizId INT NOT NULL,
    questionType INT,
    numberOfChoice INT NOT NULL CHECK(numberOfChoice BETWEEN 2 AND 10),
    image VARCHAR(1000),
    question VARCHAR(500) NOT NULL
);


CREATE TABLE QuestionChoice(
	choiceId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    questionId INT NOT NULL,
    quizId INT NOT NULL,
    is_right_choice tinyint,
    choice varchar(200)
);

```


