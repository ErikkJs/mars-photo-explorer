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
  &:hover {
    transform: scale(2.2);
    transition: cubic-bezier(0.215, 0.610, 0.355, 1) 0.5s;
  }
  cursor: pointer;
`;

const PhotoGallery = ({photos}) => (
  <Gallery>
    {photos.map(photo => (
      <Photo key={photo.id} src={photo.img_src} alt='Mars' />
    ))}
  </Gallery>
);

export default PhotoGallery;
