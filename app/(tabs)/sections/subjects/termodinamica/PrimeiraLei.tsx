import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface PrimeiraLeiProps {
  onBack: () => void;
}

export default function PrimeiraLei({ onBack }: PrimeiraLeiProps) {
  const [Q, setQ] = useState<string>(''); // Calor trocado (em Joules)
  const [W, setW] = useState<string>(''); // Trabalho realizado (em Joules)
  const [DeltaU, setDeltaU] = useState<string>(''); // Variação de energia interna (em Joules)
  const [res, setRes] = useState<string>(''); // Resultado

  useEffect(() => {
    const inputs = [Q, W, DeltaU].filter((val) => val !== '');

    if (inputs.length < 2) {
      setRes('Insira dois valores');
      return;
    }

    if (inputs.length > 2) {
      setRes('Preencha apenas dois valores');
      return;
    }

    try {
      const q = parseFloat(Q);
      const w = parseFloat(W);
      const delta = parseFloat(DeltaU);

      if (Q === '' && !isNaN(w) && !isNaN(delta)) {
        setRes(`Q = ${(delta + w).toExponential(2)} J`);
      } else if (W === '' && !isNaN(q) && !isNaN(delta)) {
        setRes(`W = ${(q - delta).toExponential(2)} J`);
      } else if (DeltaU === '' && !isNaN(q) && !isNaN(w)) {
        setRes(`ΔU = ${(q - w).toExponential(2)} J`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [Q, W, DeltaU]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Primeira Lei da Termodinâmica'}
        formula={'ΔU = Q - W'}
        desc={`• ΔU = Variação de energia interna (em Joules)
• Q = Calor trocado (em Joules)
• W = Trabalho realizado (em Joules)`}
      />

      {/* Seção de Cálculo */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        {/* Entrada de Q */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Calor (Q) em Joules:</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 5"
            value={Q}
            onChangeText={setQ}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de W */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Trabalho (W) em Joules:</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 3"
            value={W}
            onChangeText={setW}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Delta U */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Variação de Energia (ΔU) em Joules:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 2"
            value={DeltaU}
            onChangeText={setDeltaU}
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
        text={`A Primeira Lei da Termodinâmica relaciona a variação da energia interna (ΔU) com o calor trocado (Q) e o trabalho realizado (W).
        
Quando um sistema recebe calor (Q) ou realiza trabalho (W), a energia interna do sistema (ΔU) pode ser calculada com base nesta equação. Se você souber dois dos três valores (Q, W, ou ΔU), pode calcular o valor restante com esta calculadora.

Fórmulas derivadas:
• Q = ΔU + W
• W = Q - ΔU`}
      />
    </ScrollView>
  );
}