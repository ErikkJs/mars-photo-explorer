# Mars Rover Explorer

This workshop will take you through a simple React application using `create-react-app`, styled with
`styled-components`, and making HTTP requests using Axios to interact with the Mars Rover Photos
API.

## Learning Goals

- Understand how to set up a new React project
- Learn to organize and create React components
- Fetch and display data from an external API
- Style components using styled-components
- Prepare and deploy your project

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js and npm
- A code editor (like VSCode)
- Basic understanding of React and JavaScript

1.  **Create a New React App**

    - Open a terminal.
    - Run `npx create-react-app mars-photo-explorer` to create a new React project.
    - Navigate into your project directory with `cd mars-photo-explorer`.

2.  **Install Dependencies**

    - Install styled-components for styling and Axios for making HTTP requests

      `npm install axios styled-components`

### Step 2: Create Basic Components

**Setup Component Files** its good practice, staying organized is a habit and makes working on code
in the future much enjoyable. Other engineers will love if your folder structure is easy to
navigate. we want to code for others.

    -   In the `src` directory, create a new folder named `components`.
    -   Inside `components`, create files for your components: `Header.jsx`, `Error.jsx`, `SearchForm.jsx`, `PhotoGallery.jsx`.

**Implement the Header Component**

    -   In `Header.jsx`, create a functional component that returns a header element with a title.
    -   Export the component as the default export.
    -   Import the component in `App.jsx` and render it at the top of the app.
    -   Style the header using styled-components.
    -   Use the `Header` component to display the title of your app.

```jsx
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #282c34;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Header = () => (
  <StyledHeader>
    <h1>Mars Photo Explorer</h1>
  </StyledHeader>
);

export default Header;
```

**Implement the Error Component**

- In `Error.jsx`, create a functional component that returns a styled div to display an error
  message.
- Export the component as the default export.
- Import the component in `App.jsx` and render it conditionally when an error occurs.

Error.js

```jsx
import styled from 'styled-components';

const StyledError = styled.div`
  color: #ff6b6b;
  background-color: #ffebeb;
  padding: 10px;
  margin: 20px 0;
  border-left: 5px solid #ff6b6b;
  border-radius: 5px;
`;

export default StyledError;
```

**Implement the SearchForm Component**

- In `SearchForm.jsx`, create a functional component that returns a form with input fields for the
  user to select a rover, date, and camera.
- Export the component as the default export.
- Import the component in `App.jsx` and render it below the `Header` component.
- Style the form using styled-components.
- Implement event handlers for form submission and input changes.
- Use the `SearchForm` component to allow users to select a rover, date, and camera to search for
  photos. I made some css ones with for you to use, but feel free to change them to your liking.

SearchForm.jsx

```jsx
import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Select = styled.select`
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Input = styled.input`
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SearchForm = ({onSubmit, onRoverChange, onDateChange, onCameraChange}) => (
  <Form onSubmit={onSubmit}>
    <Label>
      Rover:
      <Select onChange={onRoverChange}>
        <option value='Curiosity'>Curiosity</option>
        <option value='Opportunity'>Opportunity</option>
        <option value='Spirit'>Spirit</option>
      </Select>
    </Label>
    <Label>
      Earth Date (YYYY-MM-DD):
      <Input type='date' onChange={onDateChange} />
    </Label>
    <Label>
      Camera:
      <Select onChange={onCameraChange}>
        <option value=''>All Cameras</option>
        <option value='FHAZ'>Front Hazard Avoidance Camera</option>
        <option value='RHAZ'>Rear Hazard Avoidance Camera</option>
        {/* Add more options here refer to the nasa docs*/}
      </Select>
    </Label>
    <Button type='submit'>Search</Button>
  </Form>
);

export default SearchForm;
```

**Implement the PhotoGallery Component**

- In `PhotoGallery.jsx`, create a functional component that returns a styled div to display a grid
  of photos.
- Export the component as the default export.
- Import the component in `App.jsx` and render it below the `SearchForm` component.
- Style the gallery using styled-components.
- Use the `PhotoGallery` component to display the photos fetched from the API.
- Map through the photos and display them as `<img>` elements.
- Style the photos as needed.

PhotoGallery.jsx

```jsx
import React from 'react';
import styled from 'styled-components';

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Photo = styled.img`
  margin: 10px;
  width: 200px;
  height: auto;
`;

const PhotoGallery = ({photos}) => (
  <Gallery>
    {photos.map(photo => (
      <Photo key={photo.id} src={photo.img_src} alt='Mars' />
    ))}
  </Gallery>
);

export default PhotoGallery;
```

### Step 3: Fetching Data from the API

1.  **Setup State and Axios Request in App.js**
    - In `App.jsx`, import Axios and the components you've created.
    - Setup state using the `useState` hook to store the rover selection, sol/date input, camera
      type, and fetched photos.
    - Implement a function to fetch photos using Axios when the form is submitted. Use the NASA Mars
      Rover Photos API endpoint with the necessary parameters.
    - Pass the event handlers and state values as props to the `SearchForm` component.
    - Conditionally render the `Error` and `PhotoGallery` components based on the state.
```jsx
import React, {useState} from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import PhotoGallery from './components/PhotoGallery';
import StyledError from './components/Error';

function App() {
  const [rover, setRover] = useState('Curiosity');
  const [error, setError] = useState(false);
  const [earthDate, setEarthDate] = useState('');
  const [camera, setCamera] = useState('');
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async e => {
    e.preventDefault();
    const apiKey = 'DEMO_KEY'; // Replace with your actual API key
    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&api_key=${apiKey}`;

    if (camera) {
      apiUrl += `&camera=${camera}`;
    }
    try {
      const response = await axios.get(apiUrl);
      if (response.data.photos.length > 0) {
        setPhotos(response.data.photos);
      } else {
        setError('No photos found for this date. Please try another date.');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError('Failed to fetch photos... ');
    }
  };

  return (
    <div>
      <Header />
      <SearchForm
        onSubmit={fetchPhotos}
        onRoverChange={e => setRover(e.target.value)}
        onDateChange={e => setEarthDate(e.target.value)}
        onCameraChange={e => setCamera(e.target.value)}
      />
      {error && <StyledError>{error}</StyledError>}
      {photos.length > 0 && <PhotoGallery photos={photos} />}
    </div>
  );
}

export default App;
```

### Step 4: Improve the project!

**Responsiveness**

    Tips for making your app responsive, also you can use chrome dev tools to test responsiveness and other user agents to see how your app looks on different devices.
    use cmd _ option _ I to open dev tools and click on the device icon to see how your app looks on different devices. or if on windows use ctrl _ shift _ I to open dev tools and see what youve created.
    
    good to know: chrome://inspect

    -   Make sure your app looks good on different screen sizes and devices.
    -   Use media queries to adjust the layout and styles as needed.
    -   Test your app on different devices and browsers.
    -   Use a mobile-first approach to make your app mobile-friendly.
    -   Use flexbox or grid to create a responsive layout.
    -   Use relative units like `em`, `rem`, and `%` for font sizes, margins, and paddings.

### Step 5: Deployment

- Consider deploying your app using platforms like Netlify or Vercel for easy sharing or one of the
  big cloud providers like AWS and Google Cloud. I personally use amplify to host projects like
  this, quick simple set up and deployment is as easy as pushing to main.

### Step 6: Prepare for GitHub

1.  **Initialize Git**

    - Run `git init` in your project directory.
    - Add and commit your changes.

2.  **Create a GitHub Repository**

    - Go to GitHub and create a new repository.
    - Follow the instructions to push your local repo to GitHub.

3.  **Write a README**

    - Create a `README.md` file in your project directory.
    - Include project description, setup instructions, how to use the app, and API reference.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel,
ESLint, etc) right into your project so you have full control over them. All of the commands except
`eject` will still work, but they will point to the copied scripts so you can tweak them. At this
point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle
deployments, and you shouldn't feel obligated to use this feature. However we understand that this
tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here:
[https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here:
[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here:
[https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here:
[https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here:
[https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here:
[https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
