import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContext, ThemeContext, ProfilePictureContext } from 'react-native'; // Import contexts correctly
import HomeScreen from '../screens/HomeScreen';

// Mock the necessary contexts and navigation prop
const mockThemeContextValue = {
  isDarkMode: false, // Adjust this value based on your theme context structure
};
const mockProfilePictureContextValue = {
  image: 'https://example.com/profile.jpg', // Adjust this value based on your profile picture context structure
};
const mockNavigation = {
  navigate: vi.fn(),
  addListener: vi.fn().mockImplementation((event, callback) => callback()),
  removeListener: vi.fn(),
};

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContextValue}>
        <ProfilePictureContext.Provider value={mockProfilePictureContextValue}>
          <NavigationContext.Provider value={mockNavigation}>
            <HomeScreen />
          </NavigationContext.Provider>
        </ProfilePictureContext.Provider>
      </ThemeContext.Provider>
    );

    // Example assertion: Check if the main container is rendered
    // Note: You need to add `testID="main-container"` to your main View component in HomeScreen for this to work
    const mainContainer = getByTestId('main-container');
    expect(mainContainer).toBeTruthy();
  });
});
