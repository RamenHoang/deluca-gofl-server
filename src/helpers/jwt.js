const jwt = require('jsonwebtoken')

let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {data: payload},
            process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    })
}

let verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if (err) {
                reject(err)
            }
            resolve(decoded)
        })
    })
}


module.exports = {
    generateToken,
    verifyToken
}