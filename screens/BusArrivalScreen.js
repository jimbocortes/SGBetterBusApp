import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class BusArrivalScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/nearby.png')}
        style={{ tintColor: tintColor }}
      />
    ),
    header: (
      <View
        style={{
          height: 90,
          paddingTop: 25, // only for IOS to give StatusBar Space
          backgroundColor: '#161823',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.goBack()}
            icon={{ name: 'arrow-back' }}
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
        </View>

        <View
          style={{
            flex: 2,
            alignItems: 'center'
          }}
        >
          <Image source={require('./../assets/images/header_logo.png')} />
        </View>

        <View style={{ flex: 1 }} />
      </View>
    )
  });

  render() {
    return (
      <View>
        <Text> Hello </Text>
      </View>
    );
  }
}

export default BusArrivalScreen;
