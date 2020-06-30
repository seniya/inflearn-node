var express = require('express');
var router = express.Router();

const Comment = require('../schemas/comment');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  Comment.find({ commenter: req.params.id }).populate('commenter')
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.patch('/:id', function (req, res, next) {
  Comment.update({ _id: req.params.id }, { comment: req.body.comment })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.delete('/:id', function (req, res, next) {
  Comment.remove({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
