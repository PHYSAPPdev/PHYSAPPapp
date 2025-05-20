import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import stylesCalcs from '../../../../../styles/Calc';
import { Formula, Explanation, OnBackButton } from '../../../../../components/Cards';

interface TorricelliProps {
    onBack: () => void;
}

export default function Torricelli({ onBack }: TorricelliProps) {
  const [velFinal, setVelFinal] = useState<string>('');      // V (m/s)
  const [velInicial, setVelInicial] = useState<string>('');  // V₀ (m/s)
  const [aceleracao, setAceleracao] = useState<string>('');  // A (m/s²)
  const [deltaS, setDeltaS] = useState<string>('');          // ΔS (m)
  const [res, setRes] = useState<string>('');                // Resultado
  const [isAcelerado, setIsAcelerado] = useState<boolean>(true); // Tipo de movimento

  useEffect(() => {
    const inputs = [velFinal, velInicial, aceleracao, deltaS].filter((val) => val !== '');

    if (inputs.length < 3) {
      setRes('Insira três valores');
      return;
    }

    const V = parseFloat(velFinal);
    const V0 = parseFloat(velInicial);
    const A = parseFloat(aceleracao);
    const dS = parseFloat(deltaS);
    const sinal = isAcelerado ? 1 : -1; // Define o sinal da aceleração

    try {
      if (velFinal === '' && !isNaN(V0) && !isNaN(A) && !isNaN(dS)) {
        const Vcalc = Math.sqrt(V0 ** 2 + sinal * 2 * A * dS);
        setRes(`V = ${Vcalc.toFixed(2)} m/s`);
        } else if (velInicial === '' && !isNaN(V) && !isNaN(A) && !isNaN(dS)) {
            const valorDentroDaRaiz = V ** 2 - sinal * 2 * A * dS;
            
            if (valorDentroDaRaiz >= 0) {
            const V0calc = Math.sqrt(valorDentroDaRaiz);
            setRes(`V₀ = ${V0calc.toFixed(2)} m/s`);
            } else {
            setRes('Erro: V² - 2·A·ΔS não pode ser negativo');
            }
      } else if (aceleracao === '' && !isNaN(V) && !isNaN(V0) && !isNaN(dS)) {
        const Acalc = (V ** 2 - V0 ** 2) / (sinal * 2 * dS);
        setRes(`A = ${Acalc.toFixed(2)} m/s²`);
      } else if (deltaS === '' && !isNaN(V) && !isNaN(V0) && !isNaN(A)) {
        const dScalc = (V ** 2 - V0 ** 2) / (sinal * 2 * A);
        setRes(`ΔS = ${dScalc.toFixed(2)} m`);
      } else {
        setRes('Valor inválido');
      }
    } catch (err) {
      setRes('Erro no cálculo');
    }
  }, [velFinal, velInicial, aceleracao, deltaS, isAcelerado]);

  return (
    <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
      <OnBackButton onBack={onBack} />

      {/* Fórmula */}
      <Formula
        title={'Equação de Torricelli (MUV)'}
        formula={'V² = V₀² ± 2 · A · ΔS'}
        desc={`• V = Velocidade final (m/s)\n• V₀ = Velocidade inicial (m/s)\n• A = Aceleração (m/s²)\n• ΔS = Variação do espaço (m)`}
      />

      {/* Seletor de movimento */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <Text style={{ marginRight: 10 }}>Tipo de movimento:</Text>
        <TouchableOpacity 
          onPress={() => setIsAcelerado(true)}
          style={{ 
            padding: 8, 
            backgroundColor: isAcelerado ? '#2980b9' : '#ddd', 
            borderRadius: 5,
            marginRight: 10
          }}
        >
          <Text style={{ color: isAcelerado ? 'white' : 'black' }}>Acelerado (+)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setIsAcelerado(false)}
          style={{ 
            padding: 8, 
            backgroundColor: !isAcelerado ? '#e74c3c' : '#ddd', 
            borderRadius: 5 
          }}
        >
          <Text style={{ color: !isAcelerado ? 'white' : 'black' }}>Retardado (-)</Text>
        </TouchableOpacity>
      </View>

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
            placeholder="Ex: 20"
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

        {/* Entrada de ΔS */}
        <View style={stylesCalcs.inputContainer as StyleProp<ViewStyle>}>
          <Text style={stylesCalcs.inputLabel as StyleProp<TextStyle>}>
            Variação do Espaço (ΔS) em metros:
          </Text>
          <TextInput
            style={stylesCalcs.input as StyleProp<TextStyle>}
            keyboardType="numeric"
            placeholder="Ex: 50"
            value={deltaS}
            onChangeText={setDeltaS}
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
        text={`A Equação de Torricelli relaciona velocidade, aceleração e deslocamento sem dependência do tempo.

• Use "+" para movimento acelerado (ex.: carro aumentando velocidade).
• Use "-" para movimento retardado (ex.: freio sendo acionado).`}
      />
    </ScrollView>
  );
}