const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'Jojo',
            email: 'jojo@gmail.com',
            password: 'jojoa',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Mike',
            email: 'mike@gmail.com',
            password: 'airjordan',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)  
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0])
        } else {
            res.status(400).json('error')
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    })  
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.send('user does not exist')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.send('user does not exist')
    }
})

app.listen(3003, () => {
    console.log('app is running on port 3003')
})