import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';

describe('ProfileScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<ProfileScreen />);
        const profileScreen = getByTestId('profile-screen');
        expect(profileScreen).toBeTruthy();
    });

});
