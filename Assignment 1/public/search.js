typePoke = "normal";
showPoke = '';
abilityPoke = " " ;
ability = '';
namePoke = '';
poke_type = 'normal'
to_add = ''
filter_request = ''
// Type


// function processByType(data){
//     showPoke = '';

//     for (i = 0 ; i < data.types.length; i++)
//         if(data.types[i].type.name == typePoke)
//             showPoke += `<div class = "PokeType"><a href="/profile/${data.id}"><img src="${data.sprites.front_default}" alt="${data.name}"></a></div>`
//     console.log(showPoke)
//     show = showPoke
//     $("main").html(show)
// }

// function displayPokeType(by_type){
//     typePoke = by_type;
//     for(i=1; i<1126; i++) {
//         $.ajax({
//             type: "GET",
//             url : `https://pokeapi.co/api/v2/pokemon/${i}`,
//             success: processByType
//         })
//     }

// }
// Get pokemon with type selected

function get_random_pokemon(data) {
    console.log(data)
    to_add += `  <div class="img-container"> ${data.name} <br>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"> 
    </a>
    <br>
    ${data.types[0].type.name} type
    </div>`

}

// Display pokemon
async function load_type(data) {
    to_add = ''
    console.log("function called")
    for(i = 1; i < data.pokemon.length; i ++){
        if (i % 3 == 1) { 
            to_add += `<div class="clearfix">`
        }

        await $.ajax({
            "url": `https://pokeapi.co/api/v2/pokemon/${data.pokemon[i].pokemon.name}/`,
            "type": "GET",
            "success": get_random_pokemon
        })


        if (i % 3 == 0) {
            to_add += `</div>`
        }
    }
    $("main").html(to_add)
    filter_button = `<button onclick="history_return(to_add)">${filter_request}</button>`
    append_history();
}


function get_Poke_by_type(poke_type){
    console.log(poke_type)
    $.ajax({
        "url": `https://pokeapi.co/api/v2/type/${poke_type}`,
        "type": "GET",
        "success": load_type
    })

}

// Populates Type Search Options
function loadtypes(data){
    types = ''

    for(i = 0; i < data.results.length; i ++){
        types += `<option value="${data.results[i].name}">${data.results[i].name}</option>`
        types += '<br>'
    }
    console.log(types)
    $('#poke_type').html(types)
}

// Get's pokemon that are the same type
function get_Poke_types(){
    console.log('working')
    $.ajax({
        "url": `https://pokeapi.co/api/v2/type`,
        "type": "GET",
        "success": loadtypes
    })

}

// Name
function showPoke_name(data){
    console.log(data);
    namePoke  = data.name
    reveal_pokemon = '';
    reveal_pokemon += `<div class="img-container" id="pokeReveal"> <b>This Pokemon Name:</b> ${data.name} <br>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"> 
    </a>
    <br>Click on the Pokemon to reveal it's stats!</div>`
    $("main").html(reveal_pokemon);
    filter_button = `<button id ="${data.name}" onclick="history_return(reveal_pokemon)">${data.name}</button>`
    append_history();
}


function alertError(){
    alert("Wrong Input!")
}
function searchPokeName(){
    // console.log("test")
    var searchName = $("#name_input").val()
    console.log(JSON.stringify(searchName))
    $.ajax({
        "url": `https://pokeapi.co/api/v2/pokemon/${searchName}`,
        "type": "GET",
        "success": showPoke_name,
        error: alertError
    })
}

// get Pokemon Ability 

function get_pokemon_ability(data){
    console.log(data)
    ability += `  <div class="img-container"> ${data.name} <br>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"> 
    </a>
    <br>
    ${data.types[0].type.name} type
    </div>`

}
function searchPokeAbility(){

    console.log("This button was pressed")
    var searchAbility = $("#ability_input").val();
    abilityPoke = searchAbility
    console.log(abilityPoke);
    $.ajax({
        "url": `https://pokeapi.co/api/v2/ability/${abilityPoke}`,
        "type": "GET",
        "success": showPoke_ability,
        error: alertError
    })
}
async function showPoke_ability(data) {
    ability = '';
    console.log("function called")
    console.log(abilityPoke);
    console.log(data)
    console.log(data.pokemon)
    console.log(data.pokemon[0])
    console.log(data.pokemon[0].pokemon)
    // get to pokemon name
    console.log(data.pokemon[0].pokemon.name)
    for(i = 1; i < data.pokemon.length; i ++){
        if (i % 3 == 1) { 
            ability += `<div class="clearfix">`
        }

        await $.ajax({
            "url": `https://pokeapi.co/api/v2/pokemon/${data.pokemon[i].pokemon.name}/`,
            "type": "GET",
            "success": get_pokemon_ability
        })


        if (i % 3 == 0) {
            ability += `</div>`
        }
    }
    $("main").html(ability)
    filter_button = `<button id= "${data.pokemon[0].pokemon.name}" onclick="history_return(ability)">${abilityPoke}</button>`
    append_history();
}

// History Section

function append_history(){
    button_text = "<button class='remove_button'>Hide this</button>"
    styled_output = "<span id='search'>" + filter_button + button_text +"</span>";
    $('.history').append(styled_output)
}

function history_return(data){
    $("#name_input").empty();
    $("#ability_input").empty();
    $("main").html(data)
}

// History buttons
function hide_(){
    $(this).parent().remove();
}

function clear(){
    $('.history').html(" ")
}

//set up function

function setup(){
    // get the pokemon types
    get_Poke_types();
    $('#poke_type').change(() => {
        // get poke selected client type
        filter_button =$('#poke_type option:selected').val();
        get_Poke_by_type(filter_button);
        filter_request = filter_button
    })
    $("#name").click(searchPokeName)
    $("#ability").click(searchPokeAbility)
    $("#clear").click(clear)

    $('body').on("click", ".remove_button", hide_);

}
$(document).ready(setup)