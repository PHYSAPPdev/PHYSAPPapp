import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface FuncHrPosProps {
    onBack: () => void;
}

export default function FuncHrPos({ onBack }: FuncHrPosProps) {
  const [posFinal, setPosFinal] = useState<string>('');      // S (m)
  const [posInicial, setPosInicial] = useState<string>('');  // S₀ (m)
  const [velocidade, setVelocidade] = useState<string>('');  // V (m/s)
  const [tempo, setTempo] = useState<string>('');            // T (s)
  const [res, setRes] = useState<string>('');                // Resultado

  useEffect(() => {
    const inputs = [posFinal, posInicial, velocidade, tempo].filter((val) => val !== '');

    if (inputs.length < 3) {
      setRes('Insira três valores');
      return;
    }

    if (inputs.length > 3) {
      setRes('Preencha apenas três valores');
      return;
    }

    const S = parseFloat(posFinal);
    const S0 = parseFloat(posInicial);
    const V = parseFloat(velocidade);
    const T = parseFloat(tempo);

    try {
      if (posFinal === '' && !isNaN(S0) && !isNaN(V) && !isNaN(T)) {
        setRes(`S = ${(S0 + V * T).toFixed(2)} m`);
      } else if (posInicial === '' && !isNaN(S) && !isNaN(V) && !isNaN(T)) {
        setRes(`S₀ = ${(S - V * T).toFixed(2)} m`);
      } else if (velocidade === '' && !isNaN(S) && !isNaN(S0) && !isNaN(T)) {
        setRes(`V = ${((S - S0) / T).toFixed(2)} m/s`);
      } else if (tempo === '' && !isNaN(S) && !isNaN(S0) && !isNaN(V)) {
        setRes(`T = ${((S - S0) / V).toFixed(2)} s`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [posFinal, posInicial, velocidade, tempo]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Função Horária da Posição (MUV)'}
        formula={'S = S₀ + V × T'}
        desc={`• S = Posição final (m)
• S₀ = Posição inicial (m)
• V = Velocidade (m/s)
• T = Tempo (s)`}
      />

      {/* Seção de Cálculo */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        {/* Entrada de Posição Final (S) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Posição Final (S) em metros:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 100"
            value={posFinal}
            onChangeText={setPosFinal}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Posição Inicial (S₀) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Posição Inicial (S₀) em metros:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 0"
            value={posInicial}
            onChangeText={setPosInicial}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Velocidade (V) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Velocidade (V) em m/s:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 10"
            value={velocidade}
            onChangeText={setVelocidade}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Tempo (T) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Tempo (T) em segundos:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 5"
            value={tempo}
            onChangeText={setTempo}
          />
        </View>

        {/* Resultado */}
        <View style={stylesCalcs.resultContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.resultLabel as StyleProp<TextStyle>}>Resultado:</Text>
          <Text style={stylesCalcs.resultValue as StyleProp<TextStyle>}>{res}</Text>
        </View>
      </View>

      {/* Explicação */}
      <Explanation
        text={`A função horária da posição descreve o movimento uniforme (MU), onde a velocidade é constante.

Fórmulas derivadas:
• S₀ = S - V × T  (Posição inicial)
• V = (S - S₀) / T  (Velocidade)
• T = (S - S₀) / V  (Tempo)`}
      />
    </ScrollView>
  );
}