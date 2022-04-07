const express = require("express")
const path = require("path")
const Container = require("./src/classContainer")

const app = express()
app.set('json spaces', 4)

const PORT = process.env.PORT || 8080
app.listen(
    PORT,
    () => console.log(`Server running on port: ${PORT}.`)
)

app.get(
    "/",
    (req, res) => res.sendFile( path.join(`${__dirname}/public/index.html`) )
)

const myFile = new Container ("./public/data.json")

app.get(
    "/products",
    (req, res) => myFile.getAll()
        .then( data => res.json(data) )
)

app.get(
    "/randomProduct",
    (req, res) => myFile.getAll()
        .then( data => data[Math.floor(Math.random() * data.length)] )
        .then( data => res.json([data]) )
)