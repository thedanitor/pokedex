# Pokedex

If deployed: https://thedanitor.github.io/pokedex/

This project is from the Day 37 code along video from Udemy's 50 projects in 50 days series focused on web development. I have added some comments to the CSS and JavaScript to make notes to myself why certain choices are being made and what particular lines of code do.

### Overall Impression

This project was making a Pokedex using the PokeAPI. I was very excited to use this API as I had a deep love for all things Pokemon when I was younger. The most interesting part of this project was making the background color of the cards change depending on what type of Pokemon it was. 

### Things Learned

* When making a linear gradient it is good practice to set a solid background as well for browsers that don't support gradients.
* There is a ```padStart()``` method that pads current string with another string (multiple times if needed) until string reaches given length. Useful for adding 0 to beginning of numbers.

### Additions

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

https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number