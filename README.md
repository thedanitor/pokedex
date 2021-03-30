# Pokedex

Complete Pokedex app with all 898 Pokemon, sorted by generation.

Deployed: https://thedanitor.github.io/pokedex/

![Pokedex Screenshot](/images/screenshot.png)

## Table of Contents

* [Description](#description)
* [Technologies Used](#technologies)
* [Usage](#usage)
* [Additions](#additions)
* [Acknowledgements](#acknowledgements)

## Description

What started out as the Day 37 code along video from Udemy's 50 projects in 50 days series turned into a complete pokedex app. I expanded on the basic functionality of the site by including choices for all generations of Pokemon and making the cards look more like actual Pokemon Cards.

## Technologies

* JavaScript
* CSS
* HTML
* PokeAPI
* Font Awesome

## Usage

Go to https://thedanitor.github.io/pokedex/ in your browser.\
Watch as cards are loaded for the first generation of Pokemon.\
Click on the buttons to load Pokemon from different generations.\
When at the bottom of the page, click on the arrow to return to the top.

![Pokedex Scroll](/images/pokedex_scroll.gif)

## Additions

* When cards are hovered the image changes to the shiny sprite version.
* Changed card colors.
* Styled cards to make them look more like Pokemon Cards.
* Added height and weight info.
* Added a function that checks if the image url exists. If it does not, then the main card image is the sprite version.
* Created a navbar with buttons for each generation of pokemon.
* Added bulbapedia link to each card when user clicks on shiny sprite.
* Converted height from decimeters to cm and m depending on size.
* Converted weight from hectograms to g and m depending on size.
* Removed characters after - from names, so all will fit on one line.
* Added button to scroll to top of page.
* Created a pokeball favicon.

## Acknowledgements

First off, I would like to give credit to Brad Traversy and https://www.udemy.com/course/50-projects-50-days/ for getting me started with this project. Thanks to https://pokeapi.co/ for the API and https://pokeres.bastionbot.org/ for the sprite images. Also, https://bulbapedia.bulbagarden.net/wiki/Main_Page was a great resource for all things Pokemon.