const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const tweetEle = document.querySelector('.tweets');
const API_URL = 'http://localhost:5000/tweet';

loadingElement.style.display = '';

listAllTweets();

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get('name');
	const content = formData.get('content');

	const tweet = {
		name,
		content
	};

	loadingElement.style.display = '';
	form.style.display = 'none';

	fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(tweet),
		headers: {
			'content-type': 'application/json'
		}
	}).then(response => response.json())
	.then(createdTweet => {
	  	console.log(createdTweet);
		form.reset();
		form.style.display = '';
		listAllTweets();
		loadingElement.style.display = 'none';
	  });

});

function listAllTweets() {
	tweetEle.innerHTML = '';
	fetch(API_URL)
		.then(response => response.json())
		.then(tweets => {
			tweets.reverse();
			tweets.forEach(tweet => {
				const div = document.createElement('div');
				const header = document.createElement('h3');
				header.textContent = tweet.name;
				const contents = document.createElement('p');
				contents.textContent = tweet.content;
				const date = document.createElement('small');
				date.textContent = new Date(tweet.created);
				div.appendChild(header);
				div.appendChild(contents);
				div.appendChild(date);
				tweetEle.appendChild(div);
			});
			loadingElement.style.display = 'none';
		});
}