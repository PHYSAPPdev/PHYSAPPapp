import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/Styles';

export default function Header({ onMenuPress }: { onMenuPress: () => void }) {
  return (
    <View style={styles.header}>
      <Image 
        source={require('../assets/images/icon.png')} 
        style={styles.logo} 
      />
      
      <TouchableOpacity onPress={onMenuPress}>
        <FontAwesome name="bars" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}