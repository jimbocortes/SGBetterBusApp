import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

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
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderColor: '#212129'
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
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
            {navigation.state.params.item.Description}
          </Text>
        </View>

        <View style={{ flex: 1 }} />
      </View>
    )
  });

  componentWillMount() {
    const item = this.props.navigation.state.params.item;
    this.props.fetchBusArrival(item.BusStopCode);
  }

  render() {
    const { params } = this.props.navigation.state;
    console.log(params.item);

    return <View style={{ flex: 1, backgroundColor: '#0E0F1A' }} />;
  }
}

function mapStateToProps({ bus_arrivals }) {
  console.log('<mapStateToProps');
  console.log(bus_arrivals);
  console.log('mapStateToProps>');
  return { bus_arrivals };
}

export default connect(mapStateToProps, actions)(BusArrivalScreen);
