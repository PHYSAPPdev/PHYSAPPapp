// Entropia

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface EntropaPros {
    onBack: () => void;
}

export default function Entropia({ onBack }: EntropaPros) {
  const [Qrev, setQrev] = useState(''); // Calor reversível (J)
  const [T, setT] = useState(''); // Temperatura (K)
  const [deltaS, setDeltaS] = useState(''); // Variação da entropia (J/K)
  const [res, setRes] = useState('Insira dois valores');

  useEffect(() => {
    const inputs = [Qrev, T, deltaS].filter((val) => val !== '');

    if (inputs.length < 2) {
      setRes('Insira dois valores');
      return;
    }

    if (inputs.length > 2) {
      setRes('Preencha apenas dois valores');
      return;
    }

    const q = parseFloat(Qrev);
    const t = parseFloat(T);
    const ds = parseFloat(deltaS);

    try {
      if (deltaS === '' && !isNaN(q) && !isNaN(t) && t !== 0) {
        setRes(`ΔS = ${(q / t).toExponential(2)} J/K`);
      } else if (Qrev === '' && !isNaN(ds) && !isNaN(t)) {
        setRes(`Qrev = ${(ds * t).toExponential(2)} J`);
      } else if (T === '' && !isNaN(ds) && !isNaN(q) && ds !== 0) {
        setRes(`T = ${(q / ds).toExponential(2)} K`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [Qrev, T, deltaS]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Entropia (ΔS)'}
        formula={'ΔS = Qrev / T'}
        desc={`• ΔS = Variação da entropia (J/K)
• Qrev = Calor reversível (J)
• T = Temperatura absoluta (K)`}
      />

      {/* Entradas */}
      <View style={stylesCalcs.calculationSection}>
        <Text style={stylesCalcs.sectionTitle}>Realizar Cálculo</Text>

        {/* Entrada Qrev */}
        <View style={stylesCalcs.inputContainer}>
          <Text style={stylesCalcs.inputLabel}>
            Calor Reversível (Qrev) em Joules:
          </Text>
          <TextInput
            style={stylesCalcs.input}
            keyboardType="numeric"
            placeholder="Ex: 1200"
            value={Qrev}
            onChangeText={setQrev}
          />
        </View>

        <Text style={stylesCalcs.orText}>OU</Text>

        {/* Entrada Temperatura */}
        <View style={stylesCalcs.inputContainer}>
          <Text style={stylesCalcs.inputLabel}>Temperatura (T) em Kelvin:</Text>
          <TextInput
            style={stylesCalcs.input}
            keyboardType="numeric"
            placeholder="Ex: 300"
            value={T}
            onChangeText={setT}
          />
        </View>

        <Text style={stylesCalcs.orText}>OU</Text>

        {/* Entrada Entropia */}
        <View style={stylesCalcs.inputContainer}>
          <Text style={stylesCalcs.inputLabel}>Entropia (ΔS) em J/K:</Text>
          <TextInput
            style={stylesCalcs.input}
            keyboardType="numeric"
            placeholder="Ex: 4"
            value={deltaS}
            onChangeText={setDeltaS}
          />
        </View>

        {/* Resultado */}
        <View style={stylesCalcs.resultContainer}>
          <Text style={stylesCalcs.resultLabel}>Resultado:</Text>
          <Text style={stylesCalcs.resultValue}>{res}</Text>
        </View>
      </View>

      {/* Explicação */}
      <Explanation
        text={`A entropia mede o grau de desordem de um sistema. A fórmula ΔS = Qrev / T é válida para processos reversíveis, onde:
        
- Qrev é o calor trocado de forma reversível
- T é a temperatura constante

Fórmulas derivadas:
• Qrev = ΔS × T
• T = Qrev / ΔS`}
      />
    </ScrollView>
  );
}
