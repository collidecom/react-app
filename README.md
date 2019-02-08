### Basic functionality
Time spent: 20-30 hours  

* Login functionality
* Supporter/Creator Dashboard
* Creator Profile
* Accept video chats as a Creator (Creator can be on any page of the website)
* Floating Audio & Video player that lets the user go to different pages but still play media.
* PDF CORS workaround library, meaning PDFs are viewable.
* Blurring of Posts (now outdated due to multi-sub implementation)


### Run Project
1. `npm i` in project root. install dependencies of dependencies if required.
* `npm i -g typescript` to install TypeScript on your machine (as opposed to just this project directory).
2. `npm start` to serve project locally.
3. `npm run build` to generate a deployable build.

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
