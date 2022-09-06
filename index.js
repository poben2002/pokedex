/**
 * Name: Benjamin Po
 * Date: July 25, 2022
 * Section: CSE 154 AB
 *
 * This is the injex.js file that is used by all pages in my pokemon
 * information website. It provides the funcions neccesary to fetch
 * data from the poke.api website and display some basic information
 * about the pokemon the user wants the search.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Function that initializes the search button when the window
   * loads.
   */
  function init() {
    let search = id('find');
    search.addEventListener('click', getPokemon);
  }

  /**
   * Helper function that takes a string and returns the
   * string in all lowercase letters
   * @param {String} string - Any string
   * @return {String} lowercase version of string
   */
  function lowerCase(string) {
    return string.toLowerCase();
  }

  /**
   * Fetches information from poke.api and utilizies that data to
   * display information about pokemon that the user searched for
   */
  function getPokemon() {
    const name = id('name').value;
    const pokemonName = lowerCase(name);
    let currentTag = this;
    console.log(currentTag);
    //fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
      .then(statusCheck)
      .then((response) => response.json())
      .then((data) => {
        createPokemonCard(data.name, data.sprites.other["official-artwork"].front_default);
        createPokemonInfo(data.name, data.weight, data.height, data.types[0].type.name);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  /**
   * Creates a pokemon card for the pokemon that the user searched for
   * which contains the name and an image of the pokemon. Put into the
   * pokedex section of the webpage.
   * @param {String} pokemon - Name of the pokemon
   * @param {String} picture - String of the picture.src
   */
  function createPokemonCard(pokemon, picture) {
    let pokedex = id('pokedex');
    let pokemonCard = document.createElement('div');
    pokemonCard.classList.add('poke');
    let pokeName = document.createElement('p');
    let pokemonImg = document.createElement('img');
    pokemonImg.src = "" + picture;
    pokemonImg.alt = "" + pokemon;
    pokeName.appendChild(document.createTextNode(pokemon));
    pokemonCard.appendChild(pokeName);
    pokemonCard.appendChild(pokemonImg);
    pokemonCard.id = pokemon;
    pokedex.appendChild(pokemonCard);
  }

  /**
   * Displays the height in meters, weight in kilograms and type
   * of the pokemon that the user searched for. Appends the information
   * onto the already created pokemon card.
   * @param {String} pokemon - Name of the pokemon
   * @param {Number} weight - Numerical weight value of the pokemon
   * @param {Number} height - Numerical height value of the pokemon
   * @param {String} type - Name of the type of the pokemon
   */
  function createPokemonInfo(pokemon, weight, height, type) {
    let targetPokemon = id(pokemon);
    let pokeWeight = document.createElement('p');
    let pokeType = document.createElement('p');
    let pokeHeight = document.createElement('p');
    type = "Type: " + type;
    weight = "Weight: " + weight / 100 + "kg";
    height = "Height: " + height / 10 + "m";
    pokeWeight.appendChild(document.createTextNode(weight));
    pokeHeight.appendChild(document.createTextNode(height));
    pokeType.appendChild(document.createTextNode(type));
    targetPokemon.appendChild(pokeWeight);
    targetPokemon.appendChild(pokeHeight);
    targetPokemon.appendChild(pokeType);
  }

  /**
   * Displays an error message if the pokemon the user searches for
   * is not found in the poke.api database
   * @param {object} err - Error passed by the .catch
   */
  function handleError(err) {
    let errorDisplay = document.createElement('div');
    let pokedex = id('pokedex');
    let pokeError = document.createElement('p');
    pokeError.appendChild(document.createTextNode(err));
    errorDisplay.appendChild(pokeError);
    pokedex.appendChild(errorDisplay);
  }

  /**
   * Helper shorthand method for document.getElementById
   * @param {string} idName - Id of tag in HTML
   * @returns {HTMLElement} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

})();
