import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../../App'; 

describe('App', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Welcome to React')).toBeTruthy(); // Replace 'Welcome to React' with text present in your App component
  });
});
