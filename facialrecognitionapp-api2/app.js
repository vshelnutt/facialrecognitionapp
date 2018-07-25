const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'mf12it',
    database : 'facialrecognitionapp'
  }
});



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
	db('users')
	.returning('*')
	.insert({
		email: email,
		name: name,
		joined: new Date()
	}).then(user =>{
     res.json(user[0]);
	})
	.catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
   db.select('*').from('users').where({
   	id
   })
   .then(user => {
   	if (user.length) {
      res.json(user[0])
   	} else {
   		res.status(400).json('not found')
   	}
  })
   .catch(err => res.status(400).json('error getting user'))
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
  db('users')
.where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(entries => {
	res.json(entries[0]);
})
.catch(err => res.status(400).json('unable to get entries'))
})

app.listen(1337, () => {
	console.log('app running on port 1337')
})

