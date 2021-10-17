const auth = require('firebase/auth')

testUser = async (req, res) => {
    console.log(req.headers);
    res.sendStatus(200);
}

module.exports = {
    testUser
}