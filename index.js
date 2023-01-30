const { response } = require('express')
const express = require('express')
const app = express()

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

app.delete('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(item => item.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)