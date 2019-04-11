import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Permissions, Notifications } from 'expo';
const aa = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  console.log("statu + ts " + JSON.stringify(aa));
  try {
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    return token;
  } catch (err) {
    alert("Error", err)
    console.log("Error", err);
  }
  
  export default class HelloWorldApp extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Hello, world!</Text>
        </View>
      );
    }
  }