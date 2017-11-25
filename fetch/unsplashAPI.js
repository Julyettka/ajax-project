const buttonGet = document.getElementById('get');
buttonGet.addEventListener('click', sendReqest);
const imgField = document.getElementById("image-received");
const articleField = document.getElementById('articles');

function sendReqest(){
	const searchedForText = document.getElementById('input-text').value;
	let urlImg = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
	const unsplashHeader = new Headers();
	unsplashHeader.append('Authorization',
		'Client-ID f2a1f815f0b96c22d6e284850e4a5d833b66d129e8dc83093ea5fe5dc4d16b9e');
	fetch(urlImg, {headers: unsplashHeader})
	.then(response => response.json())
	.then(addImageHandler)
	.catch(e => requestError(e, 'image'));

	let urlArticle = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=
	${searchedForText}&api-key=37bf624c5a0f4d20b289f682205aa9c8`;
	fetch(urlArticle)
	.then(response => response.json())
	.then(addArticleHandler)
	.catch(e => requestErrorArticle(e));;
}

function addImageHandler(data){
	const firstImg = data.results[0];
	let firstImgUrl = firstImg.urls.regular;
	imgField.innerHTML = "<img src="+firstImgUrl + ">";
}

function requestError(e, part) {
    console.log(e);
    imgField.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

function addArticleHandler(data){
	data.response.docs.forEach((article)=>{
		articleField.innerHTML += `<li class='article'><h2><a href = "${article.web_url}">${article.headline.main}</a></h2></li>
		<p>${article.snippet}</p>`});
};

function requestErrorArticle(e){
	console.log(e);
	articleField.innerHTML="<h2>An error occurred</h2>";
}



