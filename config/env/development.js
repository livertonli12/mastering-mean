module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '1010808938964760',
    clientSecret: 'e736b512211c5610dfc63b37081fdda3',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback',
    profileFields: ['emails', 'displayName']
  }
};
