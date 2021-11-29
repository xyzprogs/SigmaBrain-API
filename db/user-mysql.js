const db_pool = require('./mysql-init');
const mysql = require('mysql2');

createUser = (user) => {
    return new Promise((resolve, reject) => {
        db_pool.query('INSERT IGNORE INTO Users(userId, email, displayName) VALUES('
            + mysql.escape(user.userId) + ','
            + mysql.escape(user.email) + ','
            + mysql.escape(user.displayName) + ')', (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

getTopUsers = () => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM Users ORDER BY experience DESC LIMIT 10; ', (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


getChannelLeaderboard = (ownerId) => {
    //leaderboardId is the channel ID
    //Gets the top 10 users and scores based on the leaderboardID
    // return new Promise((resolve, reject) => {
    //     db_pool.query(`SELECT UserChannelScore.* , Users.displayName FROM UserChannelScore
    //         inner join Users on UserChannelScore.userId = Users.userId 
    //         where leaderboardId = ${mysql.escape(leaderboardId)} ORDER BY score desc LIMIT 10`, (err, result) => {
    //         if (err) {
    //             return reject(err)
    //         }
    //         return resolve(result)
    //     })
    // })
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT UserChannelScore.* , Users.displayName FROM UserChannelScore
        inner join Users on UserChannelScore.userId = Users.userId 
        where channelOwner =  ${mysql.escape(ownerId)} ORDER BY score desc LIMIT 10`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserProfileImage = (userId, url) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET profileImage = ${mysql.escape(url)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserBackgroundImage = (userId, url) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET backgroundImage = ${mysql.escape(url)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })

}

setUserDescription = (userId, description) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET userDescription = ${mysql.escape(description)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserTopFeatureQuiz = (userId, quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET topFeatureQuiz = ${mysql.escape(quizId)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserProfileImage = (userId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT profileImage FROM Users WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserBackgroundImage = (userId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT backgroundImage FROM Users WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserDescription = (userId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT userDescription FROM Users WHERE userid = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


createSubscribe = (userId, subscribeTo) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Subscribe (userId, subscribeTo)
        SELECT * FROM (SELECT ${mysql.escape(userId)}, ${mysql.escape(subscribeTo)}) AS tmp
        WHERE 
        NOT EXISTS ((
            SELECT * FROM Subscribe WHERE userId=${mysql.escape(userId)} AND subscribeTo=${mysql.escape(subscribeTo)}
        ) LIMIT 1)
        AND
        EXISTS (
            SELECT * FROM Users WHERE userId = ${mysql.escape(subscribeTo)}
        )`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


cancelSubscribe = (userId, subscribeTo) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Subscribe WHERE userId=${mysql.escape(userId)} AND subscribeTo=${mysql.escape(subscribeTo)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


getSubscriptions = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Subscribe WHERE userId = ${mysql.escape(userId)} ORDER BY subscribeId ASC LIMIT 11`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserInfo = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Users WHERE userId = ${mysql.escape(userId)} LIMIT 10`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserDisplayName = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT displayName FROM Users WHERE userId=${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getFollowers = ({uid, row})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM Subscribe WHERE subscribeTo = ${mysql.escape(uid)} LIMIT 10`
        if(row!==undefined && row!=null && row!=='undefined'){
            myquery = `SELECT * FROM Subscribe WHERE subscribeTo = ${mysql.escape(uid)} LIMIT ${row},10`
        }
        console.log(myquery)
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

updateUserExperience = (userId, experience) =>{
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET experience = ${mysql.escape(experience)} WHERE userId = ${mysql.escape(userId)}`, (err, result) =>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

updateUserDisplayName = (userId, displayName)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`UPDATE Users SET displayName = ${mysql.escape(displayName)} WHERE userId = ${mysql.escape(userId)}`, (err, result) =>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

getMoreSubscriptionsById = (userId, subscribeId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Subscribe WHERE userId = ${mysql.escape(userId)} AND subscribeId >= ${mysql.escape(subscribeId)} ORDER BY subscribeId ASC LIMIT 11`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createUserCategoryPreference = (userId, categoryList)=>{
    let myquery = "INSERT IGNORE INTO CatgeoryCustomize(userId, categoryId) VALUES"
    for(var i = 0; i < categoryList.length; i++){
        myquery += `(${mysql.escape(userId)}, ${mysql.escape(categoryList[i])}),`
    }
    myquery = myquery.slice(0, -1)
    return new Promise((resolve, reject)=>{
        db_pool.query(myquery, (err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

removeUserCategoryPreference = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM CatgeoryCustomize WHERE userId = ${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

obtainUserCategoryPreference = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM CatgeoryCustomize WHERE userId = ${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = {
    createUser,
    getTopUsers,
    getChannelLeaderboard,
    setUserProfileImage,
    setUserBackgroundImage,
    setUserDescription,
    setUserTopFeatureQuiz,
    getUserProfileImage,
    getUserBackgroundImage,
    getUserDescription,
    createSubscribe,
    cancelSubscribe,
    getSubscriptions,
    getUserInfo,
    getUserDisplayName,
    getFollowers,
    updateUserExperience,
    updateUserDisplayName,
    getMoreSubscriptionsById,
    obtainUserCategoryPreference,
    createUserCategoryPreference,
    removeUserCategoryPreference
}