// Cinemática

import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import stylesCalcs  from '../../../styles/Calc';

import VelocidadeMedia from './subjects/cinematica/VelMedia';
import Aceleracao from './subjects/cinematica/Aceleracao';
import FuncHrPos from './subjects/cinematica/FuncHrPos';
import FuncHrVel from './subjects/cinematica/FuncHrVel';
import Torricelli from './subjects/cinematica/Torricelli';
import TopicButtons from '../../../components/TopicButtons';

type CinematicaTopic = 'velmedia' | 'aceleracao' | 'funchrpos' | 'funchrvel' | 'torricelli' | null;

interface Topic {
    id: CinematicaTopic;
    label: string;
    icon: string;
}

const topics: Topic[] = [
  {
    id: 'velmedia',
    label: 'Velocidade Média',
    icon: 'flag-checkered',
  },
  {
    id: 'aceleracao',
    label: 'Aceleração',
    icon: 'car',
  },
  {
    id: 'funchrpos',
    label: 'Função Horária da Posição',
    icon: 'map-marker-alt',
  },
  {
    id: 'funchrvel',
    label: 'Função Horária da Velocidade',
    icon: 'running',
  },
  {
    id: 'torricelli',
    label: 'Equação de Torricelli',
    icon: 'project-diagram',
  },
];

export default function Cinematica() {
  const [currentTopic, setCurrentTopic] = useState<CinematicaTopic>(null);

  // Renderiza o componente correto com base no tópico selecionado
  const renderTopic = () => {
    switch (currentTopic) {
      case 'velmedia':
        return <VelocidadeMedia onBack={() => setCurrentTopic(null)} />;
      case 'aceleracao':
        return <Aceleracao onBack={() => setCurrentTopic(null)} />;
      case 'funchrpos':
        return <FuncHrPos onBack={() => setCurrentTopic(null)} />;
      case 'funchrvel':
        return <FuncHrVel onBack={() => setCurrentTopic(null)} />;
      case 'torricelli':
        return <Torricelli onBack={() => setCurrentTopic(null)} />;
      default:
        return (
          <ScrollView contentContainerStyle={stylesCalcs.container}>
            <Text style={stylesCalcs.title}>Cinemática</Text>
            <TopicButtons
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
