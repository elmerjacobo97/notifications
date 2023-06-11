# Configuración de Firebase

1. Crear proyecto en firebase
2. Seguir las instrucciones
3. Descargar `google-services.json` y colocarlo en el proyecto (android/app/google-services.json)
4. Configurar classpath `'com.google.gms:google-services:4.3.15'` en el archivo (android/build.gradle)
5. Configurar `apply plugin: 'com.google.gms.google-services'` y implementation `platform('com.google.firebase:firebase-bom:32.1.0')` en las dependencias
6. Ejecutar build `cd android` y `./gradlew build`

También instalé `react-native-permissions` y configuré en `AndroidManifest.xml` el permiso ` <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
