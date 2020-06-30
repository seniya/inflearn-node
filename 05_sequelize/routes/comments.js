const express = require('express');
const router = express.Router();
const { User, Comment } = require('../models');

// GET /comments
// GET /comments/:id
router.get('/:id', (req, res, next) => {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id }
    }
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      console.error(err);
      next(err);
    });
});

router.patch('/:id', (req, res, next) => {
  Comment.update({
    comment: req.body.comment,
  }, {
    where: { id: req.params.id }
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  Comment.destroy({
    where: { id: req.params.id }
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;