import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface VelMediaProps {
    onBack: () => void;
}

export default function VelocidadeMedia({ onBack }: VelMediaProps) {
  const [deltaS, setDeltaS] = useState<string>('');
  const [deltaT, setDeltaT] = useState<string>('');
  const [velMed, setVelMed] = useState<string>('');
  const [res, setRes] = useState<string>('');

  useEffect(() => {
    const inputs = [deltaS, deltaT, velMed].filter((val) => val !== '');

    if (inputs.length < 2) {
      setRes('Insira dois valores');
      return;
    }

    if (inputs.length > 2) {
      setRes('Preencha apenas dois valores');
      return;
    }

    const s = parseFloat(deltaS);
    const t = parseFloat(deltaT);
    const v = parseFloat(velMed);

    try {
      if (velMed === '' && !isNaN(s) && !isNaN(t)) {
        setRes(`Vm = ${(s / t).toFixed(2)} m/s`);
      } else if (deltaS === '' && !isNaN(v) && !isNaN(t)) {
        setRes(`ΔS = ${(v * t).toFixed(2)} m`);
      } else if (deltaT === '' && !isNaN(v) && !isNaN(s)) {
        setRes(`ΔT = ${(s / v).toFixed(2)} s`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [velMed, deltaS, deltaT]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Velocidade Média (MU)'}
        formula={'Vm = ΔS / ΔT'}
        desc={`• Vm = Velocidade média (m/s)
• ΔS = Variação do espaço (m)
• ΔT = Variação do tempo (s)`}
      />

      {/* Seção de Cálculo */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        {/* Entrada de VelMed */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Velocidade Média (Vm) em m/s:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 20"
            value={velMed}
            onChangeText={setVelMed}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de ΔS */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Variação do espaço (ΔS) em metros:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 40"
            value={deltaS}
            onChangeText={setDeltaS}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de ΔT */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Variação do tempo (ΔT) em segundos:
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
        text={`A velocidade média é a razão entre a variação do espaço percorrido e a variação do tempo gasto no percurso.

É uma grandeza escalar que nos dá uma ideia da rapidez com que um móvel se desloca, independentemente do caminho percorrido ou das variações de velocidade durante o trajeto.

Fórmulas derivadas:
• ΔS = Vm × ΔT
• ΔT = ΔS / Vm`}
      />
    </ScrollView>
  );
}