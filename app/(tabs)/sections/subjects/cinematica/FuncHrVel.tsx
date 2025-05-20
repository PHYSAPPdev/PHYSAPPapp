import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface FuncHrVelProps {
    onBack: () => void;
}

export default function FuncHrVel({ onBack }: FuncHrVelProps) {
  const [velFinal, setVelFinal] = useState<string>('');      // V (m/s)
  const [velInicial, setVelInicial] = useState<string>('');  // V₀ (m/s)
  const [aceleracao, setAceleracao] = useState<string>('');  // A (m/s²)
  const [tempo, setTempo] = useState<string>('');            // T (s)
  const [res, setRes] = useState<string>('');                // Resultado

  useEffect(() => {
    const inputs = [velFinal, velInicial, aceleracao, tempo].filter((val) => val !== '');

    if (inputs.length < 3) {
      setRes('Insira três valores');
      return;
    }

    if (inputs.length > 3) {
      setRes('Preencha apenas três valores');
      return;
    }

    const V = parseFloat(velFinal);
    const V0 = parseFloat(velInicial);
    const A = parseFloat(aceleracao);
    const T = parseFloat(tempo);

    try {
      if (velFinal === '' && !isNaN(V0) && !isNaN(A) && !isNaN(T)) {
        setRes(`V = ${(V0 + A * T).toFixed(2)} m/s`);
      } else if (velInicial === '' && !isNaN(V) && !isNaN(A) && !isNaN(T)) {
        setRes(`V₀ = ${(V - A * T).toFixed(2)} m/s`);
      } else if (aceleracao === '' && !isNaN(V) && !isNaN(V0) && !isNaN(T)) {
        setRes(`A = ${((V - V0) / T).toFixed(2)} m/s²`);
      } else if (tempo === '' && !isNaN(V) && !isNaN(V0) && !isNaN(A)) {
        setRes(`T = ${((V - V0) / A).toFixed(2)} s`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [velFinal, velInicial, aceleracao, tempo]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Função Horária da Velocidade (MUV)'}
        formula={'V = V₀ + A × T'}
        desc={`• V = Velocidade final (m/s)
• V₀ = Velocidade inicial (m/s)
• A = Aceleração (m/s²)
• T = Tempo (s)`}
      />

      {/* Seção de Cálculo */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        {/* Entrada de Velocidade Final (V) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Velocidade Final (V) em m/s:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 30"
            value={velFinal}
            onChangeText={setVelFinal}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Velocidade Inicial (V₀) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Velocidade Inicial (V₀) em m/s:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 10"
            value={velInicial}
            onChangeText={setVelInicial}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Aceleração (A) */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Aceleração (A) em m/s²:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 2"
            value={aceleracao}
            onChangeText={setAceleracao}
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
        text={`A função horária da velocidade descreve o movimento uniformemente variado (MUV), onde há aceleração constante.

Fórmulas derivadas:
• V₀ = V - A × T  (Velocidade inicial)
• A = (V - V₀) / T  (Aceleração)
• T = (V - V₀) / A  (Tempo)

Exemplo:
Um carro acelera de 10 m/s (V₀) a 2 m/s² (A):
• Após 5s (T): V = 10 + 2×5 = 20 m/s
• Se atingir 30 m/s (V) com mesma aceleração: T = (30-10)/2 = 10s`}
      />
    </ScrollView>
  );
}