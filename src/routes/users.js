var express = require('express'),
    router = express.Router();

var {authenticate, isLoggedIn, join}  = require('../middlewares/verify.js');
const { userGetEdit, userPostEdit, userPostRemove } = require('../middlewares/userPage');


router.get('/login', function(req,res) {
    res.render("login");
})

router.get('/join', function(req,res) {
    res.render("join");
})

router.get('/edit/:user',isLoggedIn ,userGetEdit)



router.post('/join', join )

router.post('/login', authenticate );

router.post('/edit/:user', userPostEdit)

router.post('/remove/:user',userPostRemove)

module.exports = router;
