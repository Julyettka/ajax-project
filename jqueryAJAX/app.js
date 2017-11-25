// We can chain on to .ajax() with a .done() method.
// We pass the .done() method a function that will run with the Ajax call is done!

/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const articleField = document.querySelector('#ul-articles');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
	    let urlImg = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;

		$.ajax({
			url: urlImg,
			headers: {
				Authorization : 'Client-ID f2a1f815f0b96c22d6e284850e4a5d833b66d129e8dc83093ea5fe5dc4d16b9e'
			}
		}).done(addImageHandler).fail(function(err){
			responseContainer.innerHTML = "<h2>An error occurred</h2>";
			console.log( 'An error occurred \uD83D\uDE1E' );
		});


		function addImageHandler(data) {
		    const firstImage = data.results[0];
		    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
		            <img src="${firstImage.urls.small}" alt="${searchedForText}">
		            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		        </figure>`
		    );
		}

		let urlArticle = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=
		${searchedForText}&api-key=37bf624c5a0f4d20b289f682205aa9c8`;
		$.ajax({
			url: urlArticle
		}).done(addArticleHandler)

		function addArticleHandler(data){
			data.response.docs.forEach((article)=>{
				articleField.innerHTML += `<li class='article'><h2><a href =
				"${article.web_url}">${article.headline.main}</a></h2></li>
				<p>${article.snippet}</p>`});
		}
    });


})();




