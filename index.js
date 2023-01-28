const { response } = require('express')
const express = require('express')
const app = express()

const contacts = [
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

const PORT = 3001
app.listen(PORT)