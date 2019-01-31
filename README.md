### Run Project
1. `npm i` in project root. install dependencies of dependencies if required.
2. `npm start` to serve project locally.
3. `npm i -g typescript` to install TypeScript on your machine (as opposed to just this project directory).

### Main Dependencies
#### Core
* https://reactjs.org/docs/getting-started.html
* https://github.com/facebook/create-react-app
#### UI
* https://material-ui.com/
* https://www.styled-components.com/
#### State Management
* https://mobx.js.org/index.html
* https://www.npmjs.com/package/react-router

### Project Structure
`index.tsx` provides the app with core dependencies.   

`App.tsx` is the base of the app, determing which components to show.  
* Important parts include the `Switch` and its `Route` subcomponents.  

`RootStore.tsx` is injected at app launch, and contains other stores that are dedicated to a specific responsibility (like `authStore, postStore, creatorProfileStore`.  
Stores can be dedicated to manage a whole page state (`creatorProfileStore`), or a specific component of the site, like `postStore`.  
Stores are where the important logic lies, like setting variables, making network requests, and processing network requests.
