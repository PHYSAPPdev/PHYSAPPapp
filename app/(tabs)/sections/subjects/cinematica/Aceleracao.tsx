import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface AceleracaoProps {
    onBack: () => void;
}

export default function Aceleracao({ onBack }: AceleracaoProps) {
  const [acel, setAcel] = useState<string>(''); // Aceleração (m/s²)
  const [deltaV, setDeltaV] = useState<string>(''); // Variação de velocidade (m/s)
  const [deltaT, setDeltaT] = useState<string>(''); // Variação de tempo (s)
  const [res, setRes] = useState<string>(''); // Resultado

  useEffect(() => {
    const inputs = [acel, deltaV, deltaT].filter((val) => val !== '');

    if (inputs.length < 2) {
      setRes('Insira dois valores');
      return;
    }

    if (inputs.length > 2) {
      setRes('Preencha apenas dois valores');
      return;
    }

    const a = parseFloat(acel);
    const dv = parseFloat(deltaV);
    const dt = parseFloat(deltaT);

    try {
      if (acel === '' && !isNaN(dv) && !isNaN(dt)) {
        setRes(`a = ${(dv / dt).toFixed(2)} m/s²`);
      } else if (deltaV === '' && !isNaN(a) && !isNaN(dt)) {
        setRes(`ΔV = ${(a * dt).toFixed(2)} m/s`);
      } else if (deltaT === '' && !isNaN(a) && !isNaN(dv)) {
        setRes(`Δt = ${(dv / a).toFixed(2)} s`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [acel, deltaV, deltaT]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Aceleração Média (MUV)'}
        formula={'a = ΔV / Δt'}
        desc={`• a = Aceleração (m/s²)
• ΔV = Variação da velocidade (m/s)
• Δt = Variação do tempo (s)`}
      />

      {/* Seção de Cálculo */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        {/* Entrada de Aceleração */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Aceleração (a) em m/s²:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 9.8"
            value={acel}
            onChangeText={setAcel}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de ΔV */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Variação de velocidade (ΔV) em m/s:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 20"
            value={deltaV}
            onChangeText={setDeltaV}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de Δt */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Variação de tempo (Δt) em segundos:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 2"
            value={deltaT}
            onChangeText={setDeltaT}
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
        text={`A aceleração média mede a taxa de variação da velocidade em relação ao tempo.

Fórmulas derivadas:
• ΔV = a × Δt  (Variação da velocidade)
• Δt = ΔV / a  (Tempo necessário para a variação)`}
      />
    </ScrollView>
  );
}