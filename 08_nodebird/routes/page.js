const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');


router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile', {
    title: '내 정보 - nodebiard',
    user: req.user,
  })
})

router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', {
    title: '회원가입 - nodebiard',
    user: req.user,
    joinError: req.flash('joinError'),
  })
})

router.get('/', (req, res, next) => {
  // console.log('req.user =>>>> ', req.user);
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    }
  })
    .then((posts) => {
      res.render('main', {
        title: '메인페이지',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      })
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
})

module.exports = router;