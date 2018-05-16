(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
        headers:{
            Authorization:'Client-ID 693ae0e8e827520887cd6cd22cc009f2463d9d0e8ba73981f32989bd3771c606'
        }
    }).then(response =>response.json())
        .then(addImage)
        .catch(e => requestError(e, 'image'));
    //json methoduda bir promise döndürür.

    //NW times api
    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText} &api-key=3e6e0ae424dd4945ae3cf44c72eb32ab`)
    .then(response => response.json())
    .then(addText)
    .catch(e => requestError(e, 'text'));
    });

    function addImage(data) {
    let htmlContent = '';
    const firstImage = data.results[0];

    if (firstImage) {
        htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
    } else {
        htmlContent = 'Unfortunately, no image was returned for your search.'
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}
function addText(data){
    let htmlContent = '';
    const firstTitle = data.response.docs[0];
    if(firstTitle){
        htmlContent = `<section>
            <h1>${firstTitle.headline.main}</h1>
            <p> ${firstTitle.snippet}</p>
         </section>`;
    }else{
        htmlContent = 'Unfortunately, no new was returned for your search.'
    }
    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}
function requestError(){
    console.log(e);
     responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

})();   
