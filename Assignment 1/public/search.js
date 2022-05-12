typePoke = "normal";
showPoke = '';
abilityPoke = " " ;
ability = '';
namePoke = '';

// Type
function processByType(data){
    showPoke = ''
    for (i = 0 ; i < data.types.length; i++)
        if(data.types[i].type.name == typePoke)
            showPoke += `<div class = "PokeType"><a href="/profile/${data.id}"><img src="${data.sprites.front_default}" alt="${data.name}"></a></div>`
    
    $("main").append(showPoke)
}

function displayPokeType(by_type){
    typePoke = by_type;
    for(i=1; i<1126; i++) {
        $.ajax({
            type: "GET",
            url : `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processByType
        })
    }

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
    poke_button = `<button id ="${data.name}" onclick="history_return(reveal_pokemon)">${data.name}</button>`
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


        if (i % 3 == 0) { // only when i= 3, 6, 9
            ability += `</div>`
        }
    }
    $("main").html(ability)
    poke_button = `<button id= "${data.pokemon[0].pokemon.name}" onclick="history_return(ability)">${abilityPoke}</button>`
    append_history();
}

// History Section

function append_history(){
    button_text = "<button class='remove_button'>Hide this</button>"
    styled_output = "<span id='search'>" + poke_button + button_text +"</span>";
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
    displayPokeType($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type  = $("#poke_type option:selected").val();
        displayPokeType($("#poke_type option:selected").val())
    })
    $("#name").click(searchPokeName)
    $("#ability").click(searchPokeAbility)
    $("#clear").click(clear)

    $('body').on("click", ".remove_button", hide_);

}
$(document).ready(setup)