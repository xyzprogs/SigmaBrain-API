# Getting Started with Create Express

## SETUP ENVIROMENT VARIABLE
Create a .env file with following envrionment varibales
change the value for your setting
```javascript
#express
PORT=3000
HOST=localhost
IMAGE_STORAGE=/

#database
CONNECTION_LIMIT=10
PASSWORD=kai
DB_USER=root
DATABASE=CSE416
DB_HOST=localhost
DB_PORT=3306


#firebase
FIREBASE_ADMIN_CREDENTIALS=

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
/*User Schema*/
CREATE TABLE Users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    displayName VARCHAR(50) NOT NULL,
    experience INT DEFAULT 0,
    creationTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    isAdmin smallint DEFAULT 0,
    backgroundImage VARCHAR(1000),
    profileImage VARCHAR(1000),
    userDescription VARCHAR(500),
    topFeatureQuiz INT,
    PRIMARY KEY(userId),
    KEY(id)
);

/*Quiz Schema*/
CREATE TABLE Quiz(
	quizId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(32) NOT NULL,
    quizName varchar(50) DEFAULT "Untitled",
    quizCatgeory INT UNSIGNED NOT NULL,
    quizDescription varchar(200) DEFAULT "",
    isPublished smallint DEFAULT 0,
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

CREATE TABLE QuizComment(
	quizCommentId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quizId INT NOT NULL,
    quizComment VARCHAR(1000) NOT NULL,
	likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);

CREATE TABLE QuizCommentReply(
	quizCommentReplyId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quizCommentId INT NOT NULL,
    quizId INT NOT NULL,
	reply VARCHAR(1000) NOT NULL,
	likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);

/*Leaderboard Schema*/
CREATE TABLE Leaderboard(
	leaderboardId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(32) NOT NULL 
);

CREATE TABLE UserChannelScore(
	userChannelScoreId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    leaderboardId INT NOT NULL,
    score INT DEFAULT 0
);

/*Forum Schema*/
CREATE TABLE Forum(
	forumId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    forumName VARCHAR(100) NOT NULL,
    userId VARCHAR(32) NOT NULL
);

CREATE TABLE ForumPost(
	forumPostId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    forumId INT NOT NULL,
	postTitle VARCHAR(100) NOT NULL,
    postDescription VARCHAR(500),
    lkes INT DEFAULT 0,
    dislikes INT DEFAULT 0
); 

CREATE TABLE ForumPostComment(
	forumPostCommentId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    forumId INT NOT NULL,
    postComment VARCHAR(500) NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);

CREATE TABLE ForumPostCommentReply(
	forumPostCommentReplyId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    forumPostCommentId INT NOT NULL,
    forumId INT NOT NULL,
	reply VARCHAR(500) NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);

CREATE TABLE ForumAdmin(
	forumAdminId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    forumId INT NOT NULL,
    userId VARCHAR(32) NOT NULL 
);

/*Achievement Schema*/
CREATE TABLE Achievement(
	achievementId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    achievementName VARCHAR(100) NOT NULL,
    achievementDescription VARCHAR(200) NOT NULL,
    category INT NOT NULL,
    achievementLevel INT NOT NULL,
    completionAmount INT NOT NULL
);

CREATE TABLE UserAchievementProgress(
	userAchievementProgressId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    achievementId INT NOT NULL,
    userId VARCHAR(32) NOT NULL,
	category INT NOT NULL,
    achievementLevel INT NOT NULL,
    progress INT NOT NULL
);

CREATE TABLE UserAchievementCompletion(
	userAchievementCompletionId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    achievementId INT NOT NULL,
    userId VARCHAR(32) NOT NULL
);

/*Subscribe Schema*/
CREATE TABLE Subscribe(
	subscribeId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(32) NOT NULL,
    subscribeTo VARCHAR(32) NOT NULL
);

```


