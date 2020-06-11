const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const port = 8080
const user = {
    _id: 1,
    username: 'p',
    password: 'p'
};

app.use(session({
    secret: 'some-secret',
    saveUninitialized: false,
    resave: true,
    unset: 'destroy',
    cookie: {
        maxAge: 60 * 60 * 1000 // one hour
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

////

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        if (username === user.username && password === user.password) {
            return done(null, user);
        }
        else {
            done(null, false, { message: 'Invalid username or password.' });
        }
    }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
    done(null, user);
});

//////


app.get('/login', function(req, res) {
    res.send(
        '<form action="/login" method="POST">' +
        '<h2>Login</h2>' +
        '<p>Username: <input name="username"></p>' +
        '<p>Password: <input name="password"></p>' +
        '<p><input type="submit" value="Login"></p>' +
        '</form>'
    );
});

app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
});

app.post('/login',
    passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

function ensureAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.send('<p><a href="/login">Login</a></p>');
    }
}

/////

app.use('/', ensureAuthenticated, express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
