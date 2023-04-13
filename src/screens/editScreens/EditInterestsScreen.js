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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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
    items: [
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

const EditInterestsScreen = ({ route }) => {
  const { interests, updateInterests } = useContext(InterestsContext);
  const [selectedItems, setSelectedItems] = useState(interests);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.saveInterests) {
      handleSaveButton();
      // Clear the saveInterests param after saving.
      navigation.setParams({ saveInterests: false });
    }
  }, [route.params?.saveInterests]);

  const toggleItem = (item) => {
    console.log('Toggling item:', item)
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSaveButton = () => {
    console.log('Saving interests:', selectedItems);
    updateInterests(selectedItems);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.items.map((item) => (
              <CheckBox
                key={item}
                title={item}
                checked={selectedItems.includes(item)}
                onPress={() => toggleItem(item)}
              />
            ))}
          </View>
        ))}
      </View>
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