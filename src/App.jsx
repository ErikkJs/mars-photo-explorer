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
    setError(false);
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
