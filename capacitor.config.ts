import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ethiopian.grade912textbooks',
  appName: 'Ethiopian Textbooks Grade 9-12',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_launcher',
      iconColor: '#0B1120',
      sound: 'notification_chime.wav',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
