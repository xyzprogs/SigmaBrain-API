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



