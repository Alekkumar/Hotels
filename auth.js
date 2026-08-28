

const passport = require("passport");
const localpassport = require("passport-local").Strategy;
const person = require('./models/person.js');

passport.use(new localpassport(async (username, password, done) => {
  try {
    console.log('Received credentials:', username, password);
    const user = await person.findOne({ username });
    //console.log('User found:',user);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    const isPasswordmatch = await user.comparepassword(password);
    if (isPasswordmatch) {
      return done(null, user);
    }
    else {
      return done(null, false, { message: 'Incorrect password.' })
    }
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
