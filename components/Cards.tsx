import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import stylesCalcs from '../styles/Calc';
import HomePage from '../app/(tabs)/Homepage';

// Interface for Formula component props
interface FormulaProps {
  title: string;
  formula: string;
  desc: string;
}

// Interface for Explanation component props
interface ExplanationProps {
  text: string;
}

// Interface for OnBackButton component props
interface OnBackButtonProps {
  onBack: () => void;
}

export function Formula({ title, formula, desc }: FormulaProps) {
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  return (
    <View>
      <Text style={stylesCalcs.title as StyleProp<TextStyle>}>{title}</Text>

      <TouchableOpacity
        style={stylesCalcs.card as StyleProp<ViewStyle>}
        onPress={() => setShowFormulaInfo(!showFormulaInfo)}
      >
        <View style={stylesCalcs.cardTitleContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.cardTitleText as StyleProp<TextStyle>}>
            Fórmula: {formula}
          </Text>
          <FontAwesome5 name="chevron-down" size={24} color="black" />
        </View>

        {showFormulaInfo && (
          <View style={stylesCalcs.cardContent as StyleProp<ViewStyle>}>
            <Text style={stylesCalcs.formulaText as StyleProp<TextStyle>}>
              {formula}
            </Text>
            <Text style={stylesCalcs.blueText as StyleProp<TextStyle>}>
              {desc}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export function Explanation({ text }: ExplanationProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <TouchableOpacity
      style={stylesCalcs.card as StyleProp<ViewStyle>}
      onPress={() => setShowExplanation(!showExplanation)}
    >
      <View style={stylesCalcs.cardTitleContainer as StyleProp<ViewStyle>}>
        <Text>
          Explicação do Conceito
        </Text>
        <FontAwesome5 name="chevron-down" size={24} color="black" />
      </View>

      {showExplanation && (
        <View style={stylesCalcs.cardContent as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.blueText as StyleProp<TextStyle>}>
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function OnBackButton({ onBack }: OnBackButtonProps) {
  return (
    <TouchableOpacity
      onPress={onBack}
      style={{
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 65,
      } as StyleProp<ViewStyle>}>
      <FontAwesome5 name="chevron-left" size={15} color="#2980b9" />
      <Text
        style={{
          color: '#2980b9',
          fontWeight: 'bold',
          fontSize: 18,
        } as StyleProp<TextStyle>}>
        Voltar
      </Text>
    </TouchableOpacity>
  );
}