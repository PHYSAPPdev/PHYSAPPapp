import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import styles from '../styles/Styles';
import stylesCalcs from '../styles/Calc';

// Define the topic type with a generic ID
interface Topic<T = string> {
  id: T;
  label: string;
  icon: string;
}

interface TopicButtonsProps<T = string> {
  visible: boolean;
  onSelect: (id: T) => void;
  topics: Topic<T>[];
}

export default function TopicButtons<T = string>({ 
  visible, 
  onSelect, 
  topics 
}: TopicButtonsProps<T>) {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : 50,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}>
      {topics.map((topic) => (
        <Card key={String(topic.id)} style={styles.card as StyleProp<ViewStyle>}>
          <TouchableOpacity
            onPress={() => onSelect(topic.id)}
            style={stylesCalcs.cardTitleContainer as StyleProp<ViewStyle>}>
            <Text style={stylesCalcs.cardTitleText as StyleProp<TextStyle>}>
              {topic.label}
            </Text>
            <FontAwesome5 
              name={topic.icon as any} 
              solid
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </Card>
      ))}
    </Animated.View>
  );
}