import React, { useState } from 'react';
import { ScrollView, Text, StyleProp, ViewStyle } from 'react-native';
import stylesCalcs from '../../../styles/Calc';

import PrimeiraLei from './subjects/termodinamica/PrimeiraLei';
import EnergiaInterna from './subjects/termodinamica/EnergiaInterna';
import Entropia from './subjects/termodinamica/Entropia';
import TopicButtons from '../../../components/TopicButtons';

type TermodinamicaTopic = 'primeira' | 'interna' | 'entropia' | null;

interface Topic {
  id: TermodinamicaTopic;
  label: string;
  icon: string;
}

const topics: Topic[] = [
  {
    id: 'primeira',
    label: 'Primeira Lei da Termodinâmica',
    icon: 'burn',
  },
  {
    id: 'interna',
    label: 'Energia Interna',
    icon: 'lightbulb',
  },
  {
    id: 'entropia',
    label: 'Entropia',
    icon: 'temperature-high',
  },
];

export default function Termodinamica() {
  const [currentTopic, setCurrentTopic] = useState<TermodinamicaTopic>(null);

  const renderTopic = () => {
    switch (currentTopic) {
      case 'primeira':
        return <PrimeiraLei onBack={() => setCurrentTopic(null)} />;
      case 'interna':
        return <EnergiaInterna onBack={() => setCurrentTopic(null)} />;
      case 'entropia':
        return <Entropia onBack={() => setCurrentTopic(null)} />;
      default:
        return (
          <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
            <Text style={stylesCalcs.title}>Termodinâmica</Text>
            <TopicButtons<TermodinamicaTopic>
              visible={true}
              onSelect={setCurrentTopic}
              topics={topics}
            />
          </ScrollView>
        );
    }
  };

  return <>{renderTopic()}</>;
}