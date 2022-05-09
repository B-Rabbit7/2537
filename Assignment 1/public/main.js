function generateAllPokemons(data){
    console.log(data)
    console.log(data.results[0].url)
    
    i = 0;
    while (i < 9){
        var randomPoke = Math.ceil(Math.random()* 1126);
        var randomPokeName = data.results[randomPoke].name;
        getRandomPokemons(randomPokeName);
        i++;
    }
}

function displayRandomPokemons(data){
    console.log(data)
    console.log(data.name)
    console.log(data.sprites)
    console.log(data.sprites.front_default)
    $('.PokeGallery').append(`<div class="image_container"><a href="/profile/${data.id}"><img src="${data.sprites.front_default}" alt="${data.name}"></a></div>`)

    
}

function getAllPokemons(){
    $.ajax({
        "url": `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
        "type": "GET",
        "success": generateAllPokemons
    })
}

function getRandomPokemons(randomPokeName){
    $.ajax({
        "url": `https://pokeapi.co/api/v2/pokemon/${randomPokeName}`,
        "type": "GET",
        "success": displayRandomPokemons
    })
}

function setup(){
    var PokeSearch = $("#searchPoke");
    getAllPokemons();
}

$(document).ready(setup)