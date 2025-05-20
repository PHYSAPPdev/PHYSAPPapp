// Energia Interna

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface EnergiaInternaProps {
    onBack: () => void;
}

export default function EnergiaInterna({ onBack }: EnergiaInternaProps) {
  const [Uf, setUf] = useState(''); // Energia interna final
  const [Ui, setUi] = useState(''); // Energia interna inicial
  const [DeltaU, setDeltaU] = useState(''); // Variação de energia interna
  const [res, setRes] = useState('');

  useEffect(() => {
    const uf = parseFloat(Uf);
    const ui = parseFloat(Ui);
    const delta = parseFloat(DeltaU);

    // Checa o valor de cada item dentro do array
    const inputs = [Uf, Ui, DeltaU].filter((val) => val !== ''); // .filter() cria novo array somente com os itens que foram checados

    if (inputs.length < 2) {
      setRes('Insira dois valores');
      return;
    }

    if (inputs.length > 2) {
      setRes('Preencha apenas dois valores');
      return;
    }

    try {
      if (DeltaU === '' && !isNaN(uf) && !isNaN(ui)) {
        setRes(`ΔU = ${(uf - ui).toExponential(2)} J`);
      } else if (Uf === '' && !isNaN(delta) && !isNaN(ui)) {
        setRes(`Uf = ${(delta + ui).toExponential(2)} J`);
      } else if (Ui === '' && !isNaN(uf) && !isNaN(delta)) {
        setRes(`Ui = ${(uf - delta).toExponential(2)} J`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [Uf, Ui, DeltaU]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Variação da Energia Interna'}
        formula={'ΔU = Uf − Ui'}
        desc={`• ΔU = Variação da energia interna (em Joules)
• Uf = Energia interna final (em Joules)
• Ui = Energia interna inicial (em Joules)`}
      />

      {/* Entradas */}
      <View style={stylesCalcs.calculationSection}>
        <Text style={stylesCalcs.sectionTitle}>Realizar Cálculo</Text>

        {/* Entrada Uf */}
        <View style={stylesCalcs.inputContainer}>
          <Text style={stylesCalcs.inputLabel}>
            Energia Final (Uf) em Joules:
          </Text>
          <TextInput
            style={stylesCalcs.input}
            keyboardType="numeric"
            placeholder="Ex: 800"
            value={Uf}
            onChangeText={setUf}
          />
        </View>

        <Text style={stylesCalcs.orText}>OU</Text>

        {/* Entrada Ui */}
        <View style={stylesCalcs.inputContainer}>
          <Text style={stylesCalcs.inputLabel}>
            Energia Inicial (Ui) em Joules:
          </Text>
          <TextInput
            style={stylesCalcs.input}
            keyboardType="numeric"
            placeholder="Ex: 500"
            value={Ui}
            onChangeText={setUi}
          />
        </View>

        <Text style={stylesCalcs.orText}>OU</Text>

        {/* Entrada ΔU */}
        <View style={stylesCalcs.inputContainer}>
          <Text style={stylesCalcs.inputLabel}>Variação (ΔU) em Joules:</Text>
          <TextInput
            style={stylesCalcs.input}
            keyboardType="numeric"
            placeholder="Ex: 300"
            value={DeltaU}
            onChangeText={setDeltaU}
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
        text={`A variação da energia interna (ΔU) representa a diferença entre a energia final (Uf) e a inicial (Ui) de um sistema:

Você pode usar esta fórmula para calcular qualquer uma das três grandezas, desde que conheça duas delas.

Fórmulas derivadas:
• Uf = ΔU + Ui
• Ui = Uf - ΔU`}
      />
    </ScrollView>
  );
}
