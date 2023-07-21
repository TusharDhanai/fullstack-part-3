const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument.')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ba2x7ub.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const recordSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Record = mongoose.model('Record', recordSchema)

if (process.argv.length > 3) {

    const name = process.argv[3]
    const number = process.argv[4]

    const record = new Record({
        name: name,
        number: number,
    })

    record.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Record.find({}).then( result => {
        console.log('phonebook:')
        result.forEach(item => {
            console.log(item)
        })
        mongoose.connection.close()
    })
}