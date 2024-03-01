import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { InterestsProvider } from './src/context/InterestsContext';
import { ProfilePictureProvider } from './src/context/ProfilePictureContext';
import { ThemeProvider } from './src/context/ThemeContext';
import LocationContext from './src/context/LocationContext';
import StackNavigator from './src/navigation/StackNavigator';


const App = () => {
  const [location, setLocation] = React.useState(null);

  return (
    <NavigationContainer>
      <ThemeProvider>
        <ProfilePictureProvider>
          <InterestsProvider>
            <LocationContext.Provider value={{ location, setLocation }}>
              <StackNavigator />
            </LocationContext.Provider>
          </InterestsProvider>
        </ProfilePictureProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
