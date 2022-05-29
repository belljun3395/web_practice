var express = require('express'),
    router = express.Router();

var { schema, rootValue, source } = require('../../sequelize/models/_graphql')
var { graphqlHTTP } = require('express-graphql');
var { graphql } = require('graphql');



var {authenticate, isLoggedIn, join}  = require('../middlewares/verify.js');
const { joinTest, graphqlTest, userGetEdit, userPostEdit, userPostRemove } = require('../middlewares/userPage');


router.get('/login', function(req,res) {
    res.render("login");
})

router.get('/join', function(req,res) {
    res.render("join");
})

router.get('/edit/:user' , userGetEdit)



router.post('/join', join )

router.post('/login', authenticate );

router.post('/edit/:user', userPostEdit)

router.post('/remove/:user',userPostRemove)

router.post('/postman/join', joinTest)

router.post('/postman/graphql', graphqlTest)

router.use('/test/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  }));


module.exports = router;
