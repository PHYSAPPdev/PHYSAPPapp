import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/Styles';
import { Page } from '../types/navigation'; // Import the Page type

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  action: () => void;
}

interface NavBarProps {
  visible: boolean;
  onNavigate: (route: Page) => void; // Now using Page type
  activeItem: number | null;
}

export default function NavBar({ visible, onNavigate, activeItem }: NavBarProps) {
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight * 0.2)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : 120,
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

  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: 'HOME PAGE',
      icon: 'home',
      action: () => onNavigate('home'),
    },
    {
      id: 2,
      label: 'Cinemática',
      icon: 'tachometer-alt',
      action: () => onNavigate('cinematica'),
    },
    {
      id: 3,
      label: 'Termodinâmica',
      icon: 'fire',
      action: () => onNavigate('termodinamica'),
    },
    {
      id: 4,
      label: 'Eletromagnetismo',
      icon: 'plug',
      action: () => onNavigate('eletromagnetismo'),
    },
  ];

  return (
    <Animated.View
      style={[
        styles.navbar as StyleProp<ViewStyle>,
        {
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        },
      ]}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={item.action}
          style={styles.navButton as StyleProp<ViewStyle>}
          accessibilityLabel={item.label}
          accessible={true}>
          <FontAwesome5
            name={item.icon as any}
            size={24}
            color={activeItem === item.id ? '#e32020' : 'white'}
          />
          <Text
            style={[
              styles.navText as StyleProp<TextStyle>,
              { color: activeItem === item.id ? '#e32020' : 'white' },
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}