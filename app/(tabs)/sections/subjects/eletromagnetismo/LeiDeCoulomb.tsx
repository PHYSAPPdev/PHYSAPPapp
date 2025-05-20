import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface LeiDeCoulombProps {
  onBack: () => void;
}

export default function LeiDeCoulomb({ onBack }: LeiDeCoulombProps) {
  const [F, setF] = useState<string>('');
  const [Q1, setQ1] = useState<string>('');
  const [Q2, setQ2] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [res, setRes] = useState<string>('');

  const k = 9 * Math.pow(10, 9); // Constante eletrostática (N·m²/C²)

  useEffect(() => {
    const f = parseFloat(F);
    const q1 = parseFloat(Q1);
    const q2 = parseFloat(Q2);
    const dist = parseFloat(d);

    const inputs = [F, Q1, Q2, d].filter((val) => val !== '');

    if (inputs.length < 3) {
      setRes('Insira três valores');
      return;
    }

    if (inputs.length > 3) {
      setRes('Preencha apenas três valores');
      return;
    }

    try {
      if (isNaN(f) && !isNaN(q1) && !isNaN(q2) && !isNaN(dist)) {
        const Fcalc = (k * Math.abs(q1 * q2)) / Math.pow(dist, 2);
        setRes(`F = ${Fcalc.toExponential(2)} N`);
      } else if (isNaN(q1) && !isNaN(f) && !isNaN(q2) && !isNaN(dist)) {
        const Q1calc = (f * Math.pow(dist, 2)) / (k * Math.abs(q2));
        setRes(`Q1 = ${Q1calc.toExponential(2)} C`);
      } else if (isNaN(q2) && !isNaN(f) && !isNaN(q1) && !isNaN(dist)) {
        const Q2calc = (f * Math.pow(dist, 2)) / (k * Math.abs(q1));
        setRes(`Q2 = ${Q2calc.toExponential(2)} C`);
      } else if (isNaN(dist) && !isNaN(f) && !isNaN(q1) && !isNaN(q2)) {
        const Dcalc = Math.sqrt((k * Math.abs(q1 * q2)) / f);
        setRes(`d = ${Dcalc.toExponential(2)} m`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [F, Q1, Q2, d, k]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Lei de Coulomb'}
        formula={'F = k × |Q1 × Q2| / d²'}
        desc={`• F = Força elétrica (N)\n• Q1 e Q2 = Cargas elétricas (C)\n• d = Distância entre as cargas (m)\n• k = 9 × 10⁹ N·m²/C²`}
      />

      {/* Campos de entrada */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Força Elétrica (F) em N:</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 3.6e-6"
            value={F}
            onChangeText={setF}
          />
        </View>

        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Carga Q1 em C:</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 2e-6"
            value={Q1}
            onChangeText={setQ1}
          />
        </View>

        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Carga Q2 em C:</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 1e-6"
            value={Q2}
            onChangeText={setQ2}
          />
        </View>

        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Distância (d) em metros:</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 0.05"
            value={d}
            onChangeText={setD}
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
        text={`A Lei de Coulomb descreve a força de atração ou repulsão entre duas cargas elétricas puntiformes. Essa força é diretamente proporcional ao produto das cargas e inversamente proporcional ao quadrado da distância entre elas.
          
Fórmulas derivadas:
• Q1 = (F × d²) / (k × |Q2|)
• Q2 = (F × d²) / (k × |Q1|)
• d = √[(k × |Q1 × Q2|) / F]`}
      />
    </ScrollView>
  );
}