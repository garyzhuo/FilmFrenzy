
/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all comments
router.get('/movie/:movieId', function (req, res) {
    db.Comment.find({ movieId: req.params.movieId })
        .then(comments => {res.json(comments) 
        console.log(comments)})
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new comment document using the form data, 
// and redirects the user to the new comment's show page
router.post('/', (req, res) => {
    db.Comment.create(req.body)
        .then(comment => res.json(comment))
})

// Show Route (GET/Read): Will display an individual comment document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Comment.findById(req.params.id)
        .then(comment => res.json(comment))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified comment document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(comment => res.json(comment))
})

// Destroy Route (DELETE/Delete): This route deletes a comment document 
// using the URL parameter (which will always be the comment document's ID)
router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndRemove(req.params.id)
        .then(() => res.send('You deleted comment ' + req.params.id))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router