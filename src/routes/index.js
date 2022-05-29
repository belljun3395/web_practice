var express = require('express'),
    router = express.Router();  

const { userGet } = require('../middlewares/userPage');
const { isLoggedIn } = require('../middlewares/verify');

/* GET page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:user', userGet)


module.exports = router;
