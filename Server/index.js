const express = require('express');
const cors = require('cors');
const monk = require('monk');

const db = monk('localhost/twitter');
const tweets = db.get('tweets');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Tweeted!'
	});
}); 

app.get('/tweet', (req, res) => {
	tweets
		.find()
		.then(tweets => {
			res.json(tweets);
		});
})

function isValidTweet(tweet) {
	return tweet.name && tweet.name.toString().trim() != '' && 
	tweet.content && tweet.content.toString().trim() != '';
}

app.post('/tweet', (req, res) => {
	if (isValidTweet(req.body)) {
		// insert into db

		const tweet = {
			name: req.body.name.toString(),
			content: req.body.content.toString(),
			created: new Date()
		};

		tweets
			.insert(tweet)
			.then(createdTweet => {
				res.json(createdTweet);
			});

	} else {
		res.status(422);
		res.json({
			message: 'Name and Content are required!'
		});
	}
});


app.listen(5000, () => {
	console.log('Listening on http://localhost:5000');
}); 