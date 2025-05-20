import { useEffect, useState } from 'react';
import { Text, View, Platform, TextInput, Button } from 'react-native';
import { Card } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HomePageButton } from '@/components/HomePageButton';
import NotificationScheduler from '../data/NotificationScheduler';
import CalendarStorage from '../data/CalendarStorage';

import styles from '../../styles/Styles';

type Pronouns = 'ela/dela' | 'ele/dele' | 'elu/delu' | null;

const PronounSelector = ({ selected, onSelect }: {
  selected: Pronouns;
  onSelect: (pronoun: Pronouns) => void;
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ marginBottom: 8 }}>Selecione seus pronomes:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          title="Ela/Dela"
          onPress={() => onSelect('ela/dela')}
          color={selected === 'ela/dela' ? '#6200ee' : undefined}
        />
        <Button
          title="Ele/Dele"
          onPress={() => onSelect('ele/dele')}
          color={selected === 'ele/dele' ? '#6200ee' : undefined}
        />
        <Button
          title="Elu/Delu"
          onPress={() => onSelect('elu/delu')}
          color={selected === 'elu/delu' ? '#6200ee' : undefined}
        />
      </View>
    </View>
  );
};

const getWelcomeMessage = (name: string, pronoun: Pronouns) => {
  switch (pronoun) {
    case 'ela/dela':
      return `Olá, ${name}! Seja bem-vinda ao PhysApp!`;
    case 'ele/dele':
      return `Olá, ${name}! Seja bem-vindo ao PhysApp!`;
    case 'elu/delu':
      return `Olá, ${name}! Seja bem-vinde ao PhysApp!`;
    default:
      return `Olá, ${name}! Seja bem-vindo(a/e) ao PhysApp!`;
  }
};

const WebContent = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPronoun, setUserPronoun] = useState<Pronouns>(null);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    // Carrega dados salvos
    const savedName = localStorage.getItem('userName');
    const savedPronoun = localStorage.getItem('userPronoun') as Pronouns;

    if (savedName) setUserName(savedName);
    if (savedPronoun) setUserPronoun(savedPronoun);
  }, []);

  const saveUserData = () => {
    if (inputName.trim()) {
      localStorage.setItem('userName', inputName);
      if (userPronoun) {
        localStorage.setItem('userPronoun', userPronoun);
      }
      setUserName(inputName);
    }
  };

  if (userName) {
    return (
      <View style={styles.view}>
        <Card style={styles.card}>
          <Text>{getWelcomeMessage(userName, userPronoun)}</Text>
        </Card>

        <Card style={styles.card}>
          <Text>O PhysApp é uma aplicação (web) criada com o intuito de realizar cálculos de física, apresentando diversas fórmulas — de Cinemática, Termodinâmica e Eletromagnetismo — para o usuário, com o mesmo tendo apenas de inserir os valores conhecidos. Ademais, o PhysApp serve como uma aplicação de aprendizado, tendo suporte de ChatBot para auxiliar o usuário a ter uma explicação mais aprofundada (citando fontes) a respeito do conteúdo desejado.</Text>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <Card style={styles.card}>
        <Text>Por favor, digite seu nome:</Text>
        <TextInput
          placeholder="Seu nome"
          value={inputName}
          onChangeText={setInputName}
          style={{ marginVertical: 8 }}
        />

        <PronounSelector
          selected={userPronoun}
          onSelect={setUserPronoun}
        />

        <Button
          title="Salvar"
          onPress={saveUserData}
          disabled={!inputName.trim()}
        />
      </Card>
    </View>
  );
}

const MobileContent = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPronoun, setUserPronoun] = useState<Pronouns>(null);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    // Carrega dados salvos
    const loadData = async () => {
      const savedName = await AsyncStorage.getItem('userName');
      const savedPronoun = await AsyncStorage.getItem('userPronoun') as Pronouns;

      if (savedName) setUserName(savedName);
      if (savedPronoun) setUserPronoun(savedPronoun);
    };
    loadData();
  }, []);

  const saveUserData = async () => {
    if (inputName.trim()) {
      await AsyncStorage.setItem('userName', inputName);
      if (userPronoun) {
        await AsyncStorage.setItem('userPronoun', userPronoun);
      }
      setUserName(inputName);
    }
  };

  if (userName) {
    return (
      <View style={styles.view}>
        <Card style={styles.card}>
          <Text style={styles.text}>{getWelcomeMessage(userName, userPronoun)}</Text>
        </Card>

    {/*
        <HomePageButton
          text="Recém-abertos"
          contentComponent={<History />}
          customStyles={{
            card: { backgroundColor: '#e3f2fd' },  // Azul claro suave
            text: { color: '#0d47a1' },            // Azul escuro
            cardContent: { borderTopColor: '#bbdefb' } // Borda azul mais clara
          }}
          iconName="history"
          iconColor="#1565c0"                       // Azul intermediário
        />
  */}

        <HomePageButton
          text="Lembretes"
          contentComponent={<NotificationScheduler />}
          customStyles={{
            card: { backgroundColor: '#e8f5e9' },  // Verde claro suave
            text: { color: '#2e7d32' },            // Verde escuro
            cardContent: { borderTopColor: '#c8e6c9' } // Borda verde mais clara
          }}
          iconName="bell"
          iconColor="#388e3c"                       // Verde intermediário
        />

        <HomePageButton
          text="Datas"
          contentComponent={<CalendarStorage />}
          customStyles={{
            card: { backgroundColor: '#f3e5f5' },  // Roxo claro suave
            text: { color: '#6a1b9a' },            // Roxo escuro
            cardContent: { borderTopColor: '#e1bee7' } // Borda roxa mais clara
          }}
          iconName="calendar"
          iconColor="#8e24aa"                       // Roxo intermediário
        />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <Card style={styles.card}>
        <Text>Por favor, digite seu nome:</Text>
        <TextInput
          placeholder="Seu nome"
          value={inputName}
          onChangeText={setInputName}
          style={{ marginVertical: 8 }}
        />

        <PronounSelector
          selected={userPronoun}
          onSelect={setUserPronoun}
        />

        <Button
          title="Salvar"
          onPress={saveUserData}
          disabled={!inputName.trim()}
        />
      </Card>
    </View>
  );
}

export default function HomePage() {
  if (Platform.OS == 'web') {
    return <WebContent />;
  } else {
    return <MobileContent />;
  }
}