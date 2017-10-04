import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, View, Text, FlatList, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import BusListItem from '../components/bus_list_item';
import * as actions from '../actions';

class NearbyScreen extends Component {
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
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#212129'
        }}
      >
        <Image source={require('./../assets/images/header_logo.png')} />
      </View>
    )
  });

  state = {
    location: null,
    errorMessage: null,
    refreshing: false,
    selected: null
  };

  componentWillMount() {
    console.log('<componentWillMount');
    console.log('<componentWillMount>');
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this.props.fetchCurrentLocation();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('<componentWillReceiveProps');
    console.log(nextProps.current_location);
    console.log(this.props.current_location);

    const newLocation = nextProps.current_location;
    const location = this.props.current_location;

    if (newLocation.latitude === null || newLocation.long === null) {
      console.log('no loc yet');
      return;
    }

    if (
      newLocation.latitude !== location.latitude ||
      newLocation.longitude !== location.longitude
    ) {
      console.log('~location has changed');
      console.log('~fetching nearby bus stops');

      this.props.nearbyBusStops(newLocation);
    } else {
      console.log('~location has not changed');
      console.log('~refreshing false');
    }
    console.log('componentWillReceiveProps>');
  }

  onPressItem(busStop) {
    this.setState({ selected: busStop.BusStopCode });
    this.props.navigation.navigate('busArrivals', {
      item: busStop
    });
  }

  renderItem({ item }) {
    const distance = +item.Location.distance.toFixed(2); // round off two decimal places
    return (
      <BusListItem
        id={item.BusStopCode}
        onPressItem={this.onPressItem.bind(this)}
        selected={this.state.selected === item.BusStopCode}
        item={item}
      />
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#0E0F1A'
        }}
      />
    );
  };

  onRefresh() {
    console.log('<onRefresh');
    this.props.fetchCurrentLocation();
    console.log('onRefresh>');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 100,
            backgroundColor: '#0E0F1A',
            borderBottomWidth: 1,
            borderColor: '#212129'
          }}
        >
          <Text style={{ color: 'white' }}>
            {this.props.current_location.longitude}
          </Text>

          <Text style={{ color: 'white' }}>
            {this.props.current_location.latitude}
          </Text>
        </View>
        <FlatList
          style={{ backgroundColor: '#161823' }}
          keyboardShouldPersistTaps={'always'}
          data={this.props.bus_stops.nearby}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.BusStopCode}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
        />
      </View>
    );
  }
}

function mapStateToProps({ bus_stops, bus_arrivals, current_location }) {
  console.log('<mapStateToProps');
  console.log(current_location);
  console.log(bus_stops);
  console.log('mapStateToProps>');
  return { bus_stops, bus_arrivals, current_location };
}

export default connect(mapStateToProps, actions)(NearbyScreen);
