var passport = require('passport');
const User = require('../../sequelize/models/User');
const Icon = require('../../sequelize/models/Icon');



exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (authError, user) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      };
      if (!user) {
        return res.send('NO EXISTING USER');
      };
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        };
        return res.redirect(`/${req.user.email}`);
      });
    })(req, res, next);
};


exports.join = async (req, res, next) => {
  const { email, password, Given_name, Last_name } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    await User.create({
      email,
      password,
      Given_name,
      Last_name
    });
    userIdData = await User.findOne({where : {email}});
    await Icon.create({linkedin : "0", github : "0", facebook : "0", twitter : "0", UserId : userIdData.id})
    return res.redirect('/users/login');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}


exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated())
    next();
  } else {
    res.redirect('/users/login');
  }
};