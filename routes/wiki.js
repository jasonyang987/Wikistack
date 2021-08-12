const express = require('express')
const router = express.Router();
// const addPage = require('../views/addPage')
const {addPage} = require('../views')
const { Page } = require("../models");

module.exports = router

router.get('/', (req, res) =>{
  res.send("Hello")
})

router.get('/add', (req, res) => {
  res.send(addPage())
})

router.post('/', (req, res) => {
  res.json(req.body)
})




router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

// function slug (string){
//   return string.replace(/ /gi, '_')
// }

Page.beforeCreate((pageInstance) => {
  pageInstance.title = generateSlug(pageInstance.title)
})
