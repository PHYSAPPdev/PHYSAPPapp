import React, { useState } from 'react';
import { ScrollView, Text, StyleProp, ViewStyle } from 'react-native';
import stylesCalcs from '../../../styles/Calc';
import CargaEletrica from './subjects/eletromagnetismo/CargaEletrica';
import LeiDeCoulomb from './subjects/eletromagnetismo/LeiDeCoulomb';
import TopicButtons from '../../../components/TopicButtons';

// Define specific topic IDs for this component
type EletromagTopicId = 'carga' | 'coulomb';

const topics = [
  {
    id: 'carga' as const,
    label: 'Carga Elétrica',
    icon: 'bolt',
  },
  {
    id: 'coulomb' as const,
    label: 'Lei de Coulomb',
    icon: 'balance-scale',
  },
];

export default function Eletromagnetismo() {
  const [currentTopic, setCurrentTopic] = useState<EletromagTopicId | null>(null);

  const renderTopic = () => {
    switch (currentTopic) {
      case 'carga':
        return <CargaEletrica onBack={() => setCurrentTopic(null)} />;
      case 'coulomb':
        return <LeiDeCoulomb onBack={() => setCurrentTopic(null)} />;
      default:
        return (
          <ScrollView contentContainerStyle={stylesCalcs.container as StyleProp<ViewStyle>}>
            <Text style={stylesCalcs.title}>Eletromagnetismo</Text>
            <TopicButtons<EletromagTopicId>
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