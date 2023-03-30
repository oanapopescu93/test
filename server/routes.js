var express = require("express")
var path = require("path")
var router = express.Router()

var message = require('./var/constants').message

// Have Node serve the files for our built React app
router.use(express.static(path.resolve(__dirname, '../client/build')))

// Handle GET requests to /api route
router.get("/api", (req, res) => {
  res.json({ message });
})

// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = router