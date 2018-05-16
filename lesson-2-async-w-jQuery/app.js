/* eslint-env jquery */

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

    searchedForText='hippos';
    $.ajax({
    	url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}` ,
    	headers:{
    		Authorization:'Client-ID 693ae0e8e827520887cd6cd22cc009f2463d9d0e8ba73981f32989bd3771c606'
    	}
    }).done(addImage)
    .fail(function(err){
    	requestError(err,'image');
    });

 function addImage(images) {
    const firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    );
}

})();
