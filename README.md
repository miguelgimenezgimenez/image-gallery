#  Photo Gallery


Deployed project at http://photo.miguelgimenez.tech (on Digital Ocean using nginx)

### Running the project

**Install dependencies:**


    $ yarn 
    or 
    $ npm install


**Run Project:**

    $ nvm use
    $ npm run dev   
 
Then go to ``http://localhost:3000/``


# DESCRIPTION

To do this project I have done the  UI with React, Redux, Babel, Webpack and material-ui. 

The App is being server rendered with the first set of elements loaded in a preloaded state, using express.

The main challenge of this project was to create a component that renders an infinite list of pictures, while it lazy loads next set when user scrolls to the end of the page.

The main problem was that the browser would overload when the list of pictures to show became bigger. To solve this problem I decided to render only the components that where on the viewport by adding them to an array , as you can see in the 
ListView component, this component also dispatches the functions to load more elements when the user scrolls past a certain position.


I have rushed to do the project since I am working on many things simultaneously and I didnt have experience server rendering. There are a few bugs which I havent had time to fix, hope you dont find them...
There is a lot more of testing and proptypes validation to be done.


Thanks and feedback is appreciated .


# ARCHITECTURE:


To Structure the project I decided to choose an atomic architecture

### Atoms

Simple components that consist of simple html Elements (or material-ui components).

### molecules

Components that are composed of atoms and/or  other simple components


### Organisms

Components that are composed of molecules and/or other components ... 