const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

// responses to different requests from front-end

router.post(
  '/', 
  userController.getStretches, 
  (req, res) => {
    return res.status(200).json(res.locals.apiRes);
});

router.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({  
      loggedIn: res.locals.signedIn,
      userDetail: res.locals.userDetail,
    });
  }
);

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({ 
      loggedIn: res.locals.signedIn,
      userDetail: res.locals.userDetail,
    });
  }
);

router.get(
  '/isLoggedIn', 
  sessionController.isLoggedIn, 
  (req, res) => {
    return res.json({ 
      loggedIn: res.locals.signedIn, 
      id: req.cookies.ssid 
    });
  }
);

router.get(
  '/logout', 
  (req, res) => {
  return res.status(200).clearCookie('cookieId').redirect('/');
  }
);

module.exports = router;


