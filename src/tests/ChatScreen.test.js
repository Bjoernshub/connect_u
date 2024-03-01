import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContext } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import ChatScreen from '../screens/ChatScreen';

// Mock des ThemeContext Value
const mockThemeContextValue = {
  isDarkMode: false, // oder true, abhängig von Ihrem Standardtheme oder Testfall
};

// Mock des Navigation Context
const mockNavigationContext = {
  navigate: jest.fn(),
  setOptions: jest.fn(),
};

describe('ChatScreen', () => {
  it('renders without crashing', () => {
    render(
      <ThemeContext.Provider value={mockThemeContextValue}>
        <NavigationContext.Provider value={mockNavigationContext}>
          <ChatScreen />
        </NavigationContext.Provider>
      </ThemeContext.Provider>
    );

    // Hier könnten Sie weitere Überprüfungen hinzufügen, z.B. ob bestimmte Elemente vorhanden sind
    // Beispiel: expect(getByText('No chats available')).toBeDefined();
  });
});
