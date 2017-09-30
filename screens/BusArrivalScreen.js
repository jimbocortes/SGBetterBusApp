import React, { Component } from 'react';

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
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image source={require('./../assets/images/header_logo.png')} />
        <Text
          style={{
            color: '#fff',
            fontSize: 11,
            letterSpacing: 1.5,
            marginTop: 6
          }}
        >
          NEAR BUS STOPS
        </Text>
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
