import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function App() {
  useEffect(() => {
    // Obtén el token de registro de FCM
    const getFCMToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    // Llama a la función para obtener el token de registro
    getFCMToken();

    const requestNotificationPermission = async () => {
      try {
        const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

        if (status === RESULTS.DENIED) {
          const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

          if (result !== RESULTS.GRANTED) {
            console.log('El permiso de notificaciones no fue otorgado.');
          }
        }
      } catch (error) {
        console.log('Error al solicitar el permiso de notificaciones:', error);
      }
    };

    requestNotificationPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    const topicSubscription = messaging()
      .subscribeToTopic('notifications')
      .then(() => {
        console.log('Subscribed to notifications topic');
      });

    const backgroundMessageSubscription =
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('A background message just showed up!', remoteMessage);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5856D6',
  },
});
