(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

    });
    	 searchedForText= 'hippos';
    //Classic XHR bu ajax with jquery ile aynı işi yapar.
	const unsplashget=new XMLHttpRequest();
	unsplashget.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	unsplashget.onload=addImage;
	unsplashget.setRequestHeader('Authorization', 'Client-ID 693ae0e8e827520887cd6cd22cc009f2463d9d0e8ba73981f32989bd3771c606');
	unsplashget.send();
	
function addImage(){
	const data=JSON.parse(this.responseText);
	const firstImage=data.results[0];
	let htmlContent=`<figure>
		<img src='${firstImage.urls.regular}' alt='${searchedForText}'>
		<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
	</figure>`;

	responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}
	
})();