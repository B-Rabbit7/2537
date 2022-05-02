function generateAllPokemons(data){
    
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
    $('.PokeGallery').append(`<div id="e"><img src="${data.sprites.front_default}" alt="${data.name}"></div>`)

    
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