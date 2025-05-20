import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo tipos para as datas marcadas
interface MarkedDate {
  selected: boolean;
  selectedColor: string;
  selectedTextColor: string;
}

interface MarkedDates {
  [date: string]: MarkedDate;
}

// Configuração manual em português
const PT_BR_LOCALE = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda', 'Terça', 'Quarta',
    'Quinta', 'Sexta', 'Sábado'
  ],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']
};

const STORAGE_KEY = '@saved_dates';

const CalendarComponent: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});

  // Carrega datas salvas
  useEffect(() => {
    const loadDates = async () => {
      try {
        const savedDates = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedDates) {
          setSelectedDates(JSON.parse(savedDates));
        }
      } catch (error) {
        console.error('Erro ao carregar datas:', error);
      }
    };
    loadDates();
  }, []);

  // Salva datas quando mudam
  useEffect(() => {
    const saveDates = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDates));
      } catch (error) {
        console.error('Erro ao salvar datas:', error);
      }
    };
    saveDates();
  }, [selectedDates]);

  const handleDayPress = (day: DateData) => {
    setSelectedDates(prev => {
      // Se a data já está selecionada, remove a seleção
      if (prev[day.dateString]) {
        const newDates = { ...prev };
        delete newDates[day.dateString];
        return newDates;
      }
      
      // Se não está selecionada, adiciona
      return {
        ...prev,
        [day.dateString]: {
          selected: true,
          selectedColor: '#7B2CBF',
          selectedTextColor: 'white'
        }
      };
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        firstDay={1}
        theme={{
          todayTextColor: '#7B2CBF',
          selectedDayBackgroundColor: '#7B2CBF',
          arrowColor: '#7B2CBF',
          textDayFontFamily: 'Roboto',
          textMonthFontFamily: 'Roboto',
          textDayHeaderFontFamily: 'Roboto',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF'
  }
});

export default CalendarComponent;