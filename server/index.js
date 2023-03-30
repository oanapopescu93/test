const express = require("express")
const PORT = process.env.PORT || 1111
const app = express()

var routes = require("./routes")
app.use(routes) 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})