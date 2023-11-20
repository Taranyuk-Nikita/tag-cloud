const fs = require('fs/promises')
const express = require('express');
const router = express.Router();

/* Для отправки тегов */

router.get('/', function (req, res, next) {
  res.render('index');
})

router.post('/sendtag', function (req, res, next) {
  tags_string = `${req.body.tag_1};${req.body.tag_2};${req.body.tag_3};`
  fs.mkdir(`public/base`, {
    recursive: true
  }).then(() => {
    fs.appendFile('public/base/tags.txt', tags_string.toUpperCase())
  })
  res.status(200);
})

/* Для просмотра тегов */

router.get('/tagcloud', function (req, res, next) {
  res.render('tagcloud');
});

router.get('/gettags', function (req, res, next) {
  fs.readFile("public/base/tags.txt")
    .then(data => res.status(200).send(data))
})

module.exports = router
