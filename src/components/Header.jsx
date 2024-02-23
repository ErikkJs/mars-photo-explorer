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
