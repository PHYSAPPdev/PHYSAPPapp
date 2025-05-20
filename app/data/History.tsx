import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoryItem {
  id: number;
  label: string;
  action: () => void;
}

interface CalcItem {
  history?: HistoryItem[];
}

interface JsonData {
  calcs: CalcItem[];
}

const STORAGE_KEY = '@MyApp:jsonData';

const History = () => {
  const [jsonData, setJsonData] = useState<JsonData>({
    calcs: [
      {
        history: [
          {
            id: 1,
            label: "Item inicial",
            action: () => console.log("Ação inicial executada")
          }
        ]
      }
    ]
  });

  // Carregar dados ao iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setJsonData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
  }, []);

  // Salvar dados sempre que mudar
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData));
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };

    saveData();
  }, [jsonData]);

  const addHistoryItem = (calcIndex: number) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now(),
      label: `Ação ${new Date().toLocaleTimeString()}`,
      action: () => console.log(`Ação ${Date.now()} executada`)
    };

    setJsonData(prev => {
      const updated = { ...prev };
      updated.calcs[calcIndex] = {
        ...updated.calcs[calcIndex],
        history: [
          ...(updated.calcs[calcIndex].history || []),
          newHistoryItem
        ]
      };
      return updated;
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dados Locais:</Text>
      
      {jsonData.calcs.map((calc, calcIndex) => (
        <View key={calcIndex} style={{ marginTop: 20 }}>
          <Button
            title={`Adicionar Histórico (${calcIndex})`}
            onPress={() => addHistoryItem(calcIndex)}
          />

          {calc.history?.map((item) => (
            <View key={item.id} style={{ marginTop: 5 }}>
              <Text>{item.label}</Text>
              <Button
                title="Executar Ação"
                onPress={item.action}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default History;