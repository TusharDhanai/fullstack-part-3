const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

logger.token('content', function (req, res) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return;
})

app.use(logger(':method :url :status :res[content-length] :response-time ms :content'))

var contacts = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// generating id using the Math.random function.
const generateId = () => {
  return Math.ceil(Math.random()*1000000);
}

app.get('/api/persons',(request, response) => {
    response.json(contacts)
})

app.get('/info',(request, response) => {
    const contactCount = contacts.length
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${contactCount} people.</p>
        <p>${date}</p>
    `)
})

app.get('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    const person = contacts.find(item => item.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons',(request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "Missing name."
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: "Missing number."
        })
    }

    const isNameTaken = contacts.some(item => body.name === item.name)

    if (isNameTaken) {
        return response.status(400).json({
            error: "Name must be unique."
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(item => item.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})