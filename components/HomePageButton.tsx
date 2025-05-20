import React, { useState, ReactNode } from 'react';
import { TouchableOpacity, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Interface para as props do componente HomePageButton
interface HomePageButtonProps {
  text: string;
  contentComponent?: ReactNode; // Componente a ser renderizado no dropdown
  customStyles?: {
    card?: StyleProp<ViewStyle>;
    cardTitleContainer?: StyleProp<ViewStyle>;
    cardContent?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
  iconName?: string; // Nome do ícone (opcional)
  iconSize?: number; // Tamanho do ícone (opcional)
  iconColor?: string; // Cor do ícone (opcional)
}

export function HomePageButton({
  text,
  contentComponent,
  customStyles = {},
  iconName = 'chevron-down',
  iconSize = 24,
  iconColor = 'black',
}: HomePageButtonProps) {
  const [showContent, setShowContent] = useState(false);

  // Rotação do ícone baseado no estado
  const iconRotation = showContent ? '180deg' : '0deg';

  return (
    <TouchableOpacity
      style={[styles.card, customStyles.card]}
      onPress={() => setShowContent(!showContent)}
      activeOpacity={0.7}
    >
      <View style={[styles.cardTitleContainer, customStyles.cardTitleContainer]}>
        <Text style={[styles.text, customStyles.text]}>
          {text}
        </Text>
        <FontAwesome5 
          name={iconName} 
          size={iconSize} 
          color={iconColor}
        />
      </View>

      {showContent && (
        <View style={[styles.cardContent, customStyles.cardContent]}>
          {contentComponent || (
            <Text style={styles.defaultContentText}>
              Nenhum conteúdo definido
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

// Estilos padrão
const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as StyleProp<ViewStyle>,
  
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  
  cardContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  } as StyleProp<ViewStyle>,
  
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  } as StyleProp<TextStyle>,
  
  defaultContentText: {
    color: '#666',
    fontStyle: 'italic',
  } as StyleProp<TextStyle>,
};