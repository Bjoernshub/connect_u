import React from 'react';
import ProfileStackNavigator from './ProfileStackNavigator';
import { InterestsProvider } from '../context/InterestsContext';

const ProfileWrapper = () => {
  return (
      <ProfileStackNavigator />
  );
};

export default ProfileWrapper;