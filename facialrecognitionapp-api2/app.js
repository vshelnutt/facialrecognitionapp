const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())


const database = {
	users: [
	{
		id: '123',
		name: 'john',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()

	},
	{
		id: '124',
		name: 'sally',
		email: 'sally@gmail.com',
		password: 'banannas',
		entries: 0,
		joined: new Date()

	}
	],
	login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}]

}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	bcrypt.compare('apples', '$2a$10$LvP8QwOAyHC.EI9XtmpkD.ps7uieOzaV8Nah9WR/q4phcikwQQzza'
, function(err, res) {
   console.log('first guess', res) 
});
bcrypt.compare('veggies', '$2a$10$LvP8QwOAyHC.EI9XtmpkD.ps7uieOzaV8Nah9WR/q4phcikwQQzza', function(err, res) {
    console.log('secondt guess', res) 
});

	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
     res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}	
})

app.post('/register', (req, res) => {
	const { email, name, password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
    	if (user.id === id) {
    		found = true;
    		return res.json(user);
    	} 
    })
    if (!found) {
    	res.status(400).json('user not found');
    }
})

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
    	if (user.id === id) {
    		found = true;
    		user.entries++
    		return res.json(user.entries);
    	} 
    })
     if (!found) {
    	res.status(400).json('user not found');
    }
})

app.listen(1337, () => {
	console.log('app running on port 1337')
})

