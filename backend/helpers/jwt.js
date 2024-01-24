const { sign } = require('jsonwebtoken');


const createTokens = (user) => {
    const accessToken = sign({ username: user.userName, id: user.UID, acessLevel: user.acessLevel, town: user.town }, process.env.JWT_SECRET);

    return accessToken;
};

module.exports = createTokens;