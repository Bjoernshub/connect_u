import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { useContext } from 'react';
import InterestsContext from '../../context/InterestsContext';
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    name: 'Sports & Fitness',
    interests: [
      'Running',
      'Swimming',
      'Cycling',
      'Yoga',
      'Gym workouts',
      'Martial Arts',
      'Dance',
    ],
  },
  {
    name: 'Outdoor Activities',
    interests: [
      'Hiking',
      'Camping',
      'Fishing',
      'Rock Climbing',
      'Kayaking',
      'Birdwatching',
      'Gardening',
    ],
  },
  {
    name: 'Dating & Relationships',
    interests: [
      'Singles Events',
      'Speed Dating',
      'Relationship Workshops',
      'Online Dating',
      'Couples Activities',
      'Marriage & Family Counseling',
      'Relationship Coaching',
    ],
  },
  {
    name: 'Hobbies & Crafts',
    interests: [
      'Painting',
      'Drawing',
      'Sculpting',
      'Photography',
      'Knitting',
      'Sewing',
      'Woodworking',
    ],
  },
  {
    name: 'Arts & Culture',
    interests: [
      'Museums',
      'Theater',
      'Opera',
      'Ballet',
      'Street Art',
      'Art Galleries',
      'Cultural Festivals',
    ],
  },
  {
    name: 'Board Games & Tabletop Games',
    interests: [
      'Strategy Games',
      'Card Games',
      'Role-Playing Games',
      'Miniature Games',
      'Trivia Games',
      'Puzzle Games',
      'Party Games',
    ],
  },
  {
    name: 'Technology & Gadgets',
    interests: [
      'Computers & Software',
      'Mobile Devices',
      'Robotics',
      'Virtual Reality',
      'Gaming',
      'Home Automation',
      '3D Printing',
    ],
  },
  {
    name: 'Books & Literature',
    interests: [
      'Fiction',
      'Non-fiction',
      'Poetry',
      'Graphic Novels',
      'Book Clubs',
      'Writing Workshops',
      'Author Events',
    ],
  },
  {
    name: 'Movies & TV Shows',
    interests: [
      'Action & Adventure',
      'Comedy',
      'Drama',
      'Science Fiction & Fantasy',
      'Documentary',
      'Animation',
      'Foreign Films',
    ],
  },
  {
    name: 'Music & Concerts',
    interests: [
      'Rock',
      'Pop',
      'Jazz',
      'Classical',
      'Electronic',
      'Hip Hop',
      'World Music',
    ],
  },
  {
    name: 'Food & Drink',
    interests: [
      'Cooking Classes',
      'Wine Tasting',
      'Beer Tasting',
      'Food Festivals',
      'International Cuisine',
      'Baking',
      'Coffee & Tea',
    ],
  },
  {
    name: 'Travel & Adventure',
    interests: [
      'Road Trips',
      'Backpacking',
      'Cruises',
      'Cultural Tours',
      'Adventure Sports',
      'Eco-Tourism',
      'City Tours',
    ],
  },
  {
    name: 'Volunteering & Community Service',
    interests: [
      'Animal Welfare',
      'Environmental Conservation',
      'Homelessness & Housing',
      'Youth Development',
      'Senior Support',
      'Health & Medicine',
      'Disaster Relief',
    ],
  },
  {
    name: 'Language & Cultural Exchange',
    interests: [
      'Language Classes',
      'Conversation Partners',
      'Language Exchange Events',
      'Cultural Presentations',
      'International Film Screenings',
      'Cooking & Dining Experiences',
      'Cultural Performances',
    ],
  },
  {
    name: 'Parenting & Family',
    interests: [
      'Playdates',
      'Parenting Workshops',
      'Support Groups',
      'Family Outings',
      'Education & School Activities',
      'Childcare & Babysitting',
      'Pregnancy & Newborn Care',
    ],
  },
  {
    name: 'Pets & Animals',
    interests: [
      'Dog Walking',
      'Pet Playdates',
      'Animal Adoption Events',
      'Pet Training',
      'Pet Health & Wellness',
      'Wildlife Rehabilitation',
      'Animal Rights & Activism',
    ],
  },
  {
    name: 'Education & Learning',
    interests: [
      'Workshops & Seminars',
      'Online Courses',
      'Professional Development',
      'Skill Sharing',
      'Tutoring & Mentoring',
      'Continuing Education',
      'Lifelong Learning',
    ],
  },
  {
    name: 'Career & Networking',
    interests: [
      'Professional Associations',
      'Job Search Support',
      'Industry Conferences',
      'Entrepreneurship',
      'Freelancing',
      'Coworking Spaces',
      'Mentorship Programs',
    ],
  },
  {
    name: 'Health & Wellness',
    interests: [
      'Meditation',
      'Mindfulness',
      'Nutrition',
      'Mental Health Support',
      'Alternative Medicine',
      'Holistic Health',
      'Stress Management',
    ],
  },
  {
    name: 'Spirituality & Religion',
    interests: [
      'Faith-based Communities',
      'Spiritual Growth',
      'Meditation Retreats',
      'Interfaith Dialogues',
      'Study Groups',
      'Prayer Meetings',
      'Religious Services',
    ],
  },
  {
    name: 'Environment & Sustainability',
    interests: [
      'Conservation Efforts',
      'Clean Energy',
      'Recycling & Waste Reduction',
      'Sustainable Living',
      'Eco-friendly Products',
      'Urban Farming',
      'Climate Change Activism',
    ],
  },
  {
    name: 'Social & Nightlife',
    interests: [
      'Bars & Clubs',
      'Happy Hours',
      'Themed Parties',
      'Live Music Venues',
      'Comedy Shows',
      'Wine Bars',
      'Networking Events',
    ],
  },
];

const EditInterestsScreen = ({ route, navigation  }) => {
  const { interests, updateInterests } = useContext(InterestsContext);
  const { selectedInterests: initialSelectedInterests } = route.params;
  const [selectedInterests, setSelectedInterests] = useState(interests);

  console.log('Initial interests in EditInterestsScreen:', interests);

  const toggleInterest = (interest) => {
    console.log('Toggling interest:', interest)
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const onSaveButtonPress = () => {
    console.log('Saving interests:', selectedInterests);
    updateInterests(selectedInterests);
    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSaveButtonPress} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });

    return unsubscribe;
  }, [navigation, onSaveButtonPress]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.interests.map((interest) => (
              <CheckBox
                key={interest}
                title={interest}
                checked={selectedInterests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              />
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={onSaveButtonPress}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    categoryContainer: {
      marginTop: 20,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

export default EditInterestsScreen;