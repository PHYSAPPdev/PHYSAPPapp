import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

interface NotificationData {
  date: Date;
  message: string;
}

const NotificationScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [scheduledNotifications, setScheduledNotifications] = useState<NotificationData[]>([]);

  // Configurar as notificações (deve ser chamado uma vez no app)
  const configureNotifications = () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  // Agendar notificação
  const scheduleNotification = () => {
    const notificationDate = new Date(date);
    
    PushNotification.localNotificationSchedule({
      message: message || 'Lembrete!', // Mensagem da notificação
      date: notificationDate, // Data e hora da notificação
      allowWhileIdle: true, // (opcional) Dispara mesmo no modo idle no Android
      
      // Android apenas
      channelId: 'default-channel-id', // Necessário para Android 8+
      largeIcon: 'ic_launcher', // (opcional) Ícone grande
      smallIcon: 'ic_notification', // (opcional) Ícone pequeno
      
      // iOS apenas
      playSound: true, // (opcional) Tocar som
      soundName: 'default', // (opcional) Nome do som
    });

    // Adicionar à lista de notificações agendadas
    setScheduledNotifications([...scheduledNotifications, { date: notificationDate, message }]);
    
    // Limpar campos
    setMessage('');
    setDate(new Date());
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // No iOS, o picker fica sempre visível
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Lembrete</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem"
        value={message}
        onChangeText={setMessage}
      />
      
      <View style={styles.dateContainer}>
        <Button 
          title="Selecionar Data e Hora" 
          onPress={() => setShowPicker(true)} 
        />
        
        <Text style={styles.dateText}>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </Text>
      </View>
      
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}
      
      <Button 
        title="Agendar Notificação" 
        onPress={scheduleNotification} 
        disabled={!message}
      />
      
      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Lembretes Agendados:</Text>
        {scheduledNotifications.map((notification, index) => (
          <View key={index} style={styles.notificationItem}>
            <Text>{notification.message}</Text>
            <Text>{notification.date.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default NotificationScheduler;