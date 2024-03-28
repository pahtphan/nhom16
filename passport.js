const passport = require('passport'); 

const GoogleStrategy = require('passport-google-oauth2').Strategy; 
const FacebookStrategy = require('passport-facebook').Strategy; 

passport.serializeUser((user , done) => { 
	done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
	done(null, user); 
}); 

passport.use(new GoogleStrategy({ 
	clientID:process.env.CLIENT_ID, // Your Credentials here. 
	clientSecret:process.env.CLIENT_SECRET, // Your Credentials here. 
	callbackURL:"http://godashop.com/auth/google/callback", 
	passReqToCallback:true
}, 
function(request, accessToken, refreshToken, profile, callback) { 
	console.log(profile);
	return callback(null, profile); 
} 
));

// // login by facebook

// passport.serializeUser((user , cb) => { 
// 	cb(null , user); 
// }) 
// passport.deserializeUser(function(user, cb) { 
// 	cb(null, user); 
// }); 

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://godashop.com/auth/facebook/callback",
// 	enableProof: true
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
