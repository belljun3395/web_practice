var express = require('express'),
    router = express.Router();

var { schema, rootValue, source } = require('../../sequelize/models/_graphql')
var { graphqlHTTP } = require('express-graphql');
var { graphql } = require('graphql');



var {authenticate, isLoggedIn, join}  = require('../middlewares/verify.js');
const { joinTest, userGetEdit, userPostEdit, userPostRemove } = require('../middlewares/userPage');


router.get('/login', function(req,res) {
    res.render("login");
})

router.get('/join', function(req,res) {
    res.render("join");
})

router.get('/edit/:user',isLoggedIn , userGetEdit)



router.post('/test', joinTest)

router.post('/join', join )

router.post('/login', authenticate );

router.post('/edit/:user', userPostEdit)

router.post('/remove/:user',userPostRemove)


router.use('/test/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  }));

// router.use('/test/graphql2', );

// graphql({ schema,source,rootValue }).then((response) => {
//     console.log("############################");
//     console.log(source);
//     console.log(rootValue)
//     console.log(response);
//   });

module.exports = router;
