import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface CargaEletricaProps {
  onBack: () => void;
}

export default function CargaEletrica({ onBack }: CargaEletricaProps) {
  const [Q, setQ] = useState<string>('');
  const [N, setN] = useState<string>('');
  const E = 1.6 * Math.pow(10, -19); // Carga elementar
  const [res, setRes] = useState<string>('');

  useEffect(() => {
    const inputs = [Q, N].filter((val) => val !== '');

    if (inputs.length === 0) {
      setRes('Insira um valor');
      return;
    }

    if (inputs.length > 1) {
      setRes('Preencha apenas um valor');
      return;
    }

    const q = parseFloat(Q);
    const n = parseFloat(N);

    try {
      if (Q === '' && !isNaN(n)) {
        setRes(`Q = ${(n * E).toExponential(2)} C`);
      } else if (N === '' && !isNaN(q)) {
        setRes(`N = ${Math.round(q / E)}`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [Q, N, E]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      {/* Botão de Voltar */}
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Carga Elétrica'}
        formula={'Q = N × e'}
        desc={`• Q = Carga elétrica (em Coulombs, C)
• N = Número de elétrons em excesso ou falta
• e = Carga elementar (1.6 × 10⁻¹⁹ C)`}
      />

      {/* Seção de Cálculo */}
      <View style={stylesCalcs.calculationSection as StyleProp<ViewStyle>}>
        <Text style={stylesCalcs.sectionTitle as StyleProp<TextStyle>}>Realizar Cálculo</Text>

        {/* Entrada de Q */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Carga Elétrica (Q) em Coulombs:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 3.2e-19"
            value={Q}
            onChangeText={setQ}
          />
        </View>

        <Text style={stylesCalcs.orText as StyleProp<TextStyle>}>OU</Text>

        {/* Entrada de N */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>Número de elétrons (N):</Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 2"
            value={N}
            onChangeText={setN}
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
        text={`A carga elétrica elementar (e) é a menor quantidade de carga encontrada na natureza, correspondente à carga de um elétron (negativa) ou próton (positiva).

Um corpo eletrizado tem sua carga quantizada, ou seja, sempre múltipla inteira dessa carga elementar. Esta calculadora permite converter entre o número de partículas (elétrons ou prótons) e a carga total equivalente.

Fórmulas derivadas:
• N = Q / e
• e = Q / N
(Usada para confirmar o valor teórico de e em experimentos).`}
      />
    </ScrollView>
  );
}