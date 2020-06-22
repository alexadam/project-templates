const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3030

app.use(cors())
app.use(bodyParser.json())

var todos = [{
    id: 1,
    text: "Todo 1",
    completed: false
}]

app.get('/', (req, res) => res.json(todos))

app.post('/', (req, res) => {
    const newTodos = req.body
    console.log(JSON.stringify(newTodos))

    todos = newTodos
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))