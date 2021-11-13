const db_pool = require('./mysql-init');
const mysql = require('mysql2');

createUser = (user) => {
    return new Promise((resolve, reject) => {
        db_pool.query('INSERT INTO Users(userId, email, displayName) VALUES('
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


getChannelLeaderboard = (leaderboardId) => {
    //leaderboardId is the channel ID
    //Gets the top 10 users and scores based on the leaderboardID
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT * FROM UserChannelScore where 
                    leaderboardId = ${mysql.escape(leaderboardId)} ORDER BY score desc LIMIT 10`, (err, result) => {
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
        db_pool.query(`SELECT subscribeTo FROM Subscribe WHERE userId = ${mysql.escape(userId)}`, (err, result)=>{
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
    getUserInfo
}