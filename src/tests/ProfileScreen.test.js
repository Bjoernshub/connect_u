import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';

describe('ProfileScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<ProfileScreen />);
        const profileScreen = getByTestId('profile-screen');
        expect(profileScreen).toBeTruthy();
    });

    it('displays the username', () => {
        const { getByText } = render(<ProfileScreen />);
        const username = getByText('John Doe');
        expect(username).toBeTruthy();
    });

    it('allows image selection', () => {
        const { getByTestId } = render(<ProfileScreen />);
        const imagePickerButton = getByTestId('image-picker-button');
        fireEvent.press(imagePickerButton);
        // Add assertions for image selection logic
    });

    // Add more tests as needed
});
