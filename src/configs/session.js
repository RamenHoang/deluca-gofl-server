const session = require('express-session');
const MongoStore = require('connect-mongo');

let configSession = (app) => {
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL, autoRemove: "native"  }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
}

module.exports = configSession;
