import React, { createContext, useState } from 'react';

const ProfilePictureContext = createContext();

export const ProfilePictureProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  return (
    <ProfilePictureContext.Provider value={{ image, setImage }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};

export default ProfilePictureContext;
