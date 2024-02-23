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
