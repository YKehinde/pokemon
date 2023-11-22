# pokemon
Online Pokedex using Poke API &amp; React (Vite)


## Available Scripts

In the project directory, you can run:

### `npm i` or `npm install`
Install dependencies

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser.

## Tools

### React + Vite
Using Vite for simplicity

### React Query
Using this as a way to cache data tp reduce the calls

### axios
Just a fan of axios. I prefer it to conventional fetch. I find it you write less code

### Sass
Easier/quicker development. Usually less lines and repetition. Nesting to aid specificity.

### React Router
Using this to create dynamic pages for each pokemon. I can then open each one, populate the data based on the clicked pokemon name without having to pass props.


## What I've done
* Created a home page which is a list of the pokemon
* Paginated the list as there are over 1000 pokemon
* Each name is a link to the details page of the pokemon
* added a search bar to quickly access a particular pokemon if you know the name
* If you search or click on a pokemon name, the details page is opened up on a path of their name e.g. `/pikachu`
* On the details page you have key attributes and some of the main information you'd probably like on a pokemon
* Added a back button the details page to go back to the main List page

## What else I woud do (with more time)
* Clean up the styling a bit more
* Add some unit tests, particularly for the util functions
* Add page numbers to let the user know where they are in the long list of pokemon allowing them to skip to a particular page
* Figure out a way to add images to the list of pokemon on the List page. Tried to minimise the calls
* Stagger the animation on the sprites
* Delve into the additional sprites and possibal make it a carousel
* Add card components for the types to have the colour coded to an extent
* Append measurements like height and weight to have the metric, e.g. kg
* I would have used typescript properly
