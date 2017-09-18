import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';

class PinsScreen extends Component {
  static navigationOptions = {
    header: (
      <View style={{ height: 70 }}>
        <Header
          centerComponent={{ text: 'SGBetterBus', style: { color: '#fff' } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
        />
      </View>
    )
  };

  render() {
    return (
      <View>
        <Text> PinsScreen </Text>
        <Text> PinsScreens</Text>
        <Text> PinsScreen </Text>
        <Text> PinsScreen </Text>
      </View>
    );
  }
}

export default PinsScreen;
