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
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
          <Icon name="sc-telegram" type="evilicon" color="#517fa4" />

          <Button onPress={() => navigation.goBack()} icon={{ name: 'home' }} />
        </View>

        <View
          style={{
            flex: 2,
            borderWidth: 1,
            borderColor: 'red',
            alignItems: 'center'
          }}
        >
          <Image source={require('./../assets/images/header_logo.png')} />
        </View>

        <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
          <Icon />
          <Button
            onPress={() => navigation.goBack()}
            icon={{ name: 'home' }}
            buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
          />
        </View>
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
