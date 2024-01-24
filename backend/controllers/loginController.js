const db = require("../helpers/db");
const md5 = require('md5');
const createTokens = require("../helpers/jwt");
const _ =require("underscore")

exports.userLoginController = async (req, res) => {
    const { username, password } = req.body;
    db.query("select * from user where username=?", [username], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            if (_.isEmpty(result)) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                if (md5(password) === result[0].password) {
                    const accessToken = createTokens(result[0]);
                    res.cookie("access-token", accessToken, {
                        maxAge: 60 * 60 * 24 * 30,
                        httpOnly: false,
                        sameSite: 'none',
                        secure: true,
                    });
                    return res.status(200).json({ message: 'Login successful', token: accessToken });
                } else {
                    return res.status(401).json({ message: 'Login Details are Incorrect' });
                }
                
            }
        }
    })
};