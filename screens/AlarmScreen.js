import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AlarmScreen = () => {
  return (
    <View>
      <Text>AlarmScreen</Text>
    </View>
  )
}

export default AlarmScreen

const styles = StyleSheet.create({})    

// import PushNotification from 'react-native-push-notification';

// PushNotification.localNotificationSchedule({
//     id: 1,
//     message: `Reminder Message`,
//     date: new Date(Date.now() + 60 * 1000),
//     repeatType: 'day',
//     // repeatTime: 
//     allowWhileIdle: false,
//     exact: true,
// })
