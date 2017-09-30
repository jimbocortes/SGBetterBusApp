import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, View, Text, FlatList, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { List, ListItem, SearchBar, Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import CollapsibleItem from '../components/collapsible_item';

class NearbyScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-pin" type="ionicon" color={tintColor} />
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

  state = {
    location: null,
    errorMessage: null,
    refreshing: false
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
      this.setState({ refreshing: true });
      console.log('~fetching nearby bus stops');
      this.props.nearbyBusStops(newLocation);
    } else {
      console.log('~location has not changed');
      this.setState({ refreshing: false });
    }
    console.log('componentWillReceiveProps>');
  }

  renderItem(item) {
    const distance = +item.Location.distance.toFixed(2); // round off two decimal places

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View
          key={item.BusStopCode}
          style={{
            height: 75,
            paddingLeft: 20,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 26,
              color: '#FFF',
              letterSpacing: 0,
              marginBottom: 3
            }}
          >
            {item.Description}
          </Text>
          <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
            <Icon name="ios-pin" type="ionicon" color="#FF2366" size={17} />
            <Text
              style={{
                fontSize: 14,
                color: '#A3A3A7',
                paddingLeft: 5
              }}
            >
              {item.RoadName}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 75,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#FFF',
              marginRight: 15
            }}
          >
            {`${distance} km`}{' '}
          </Text>
        </View>
      </View>
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
            borderTopWidth: 1,
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
          renderItem={({ item }) => this.renderItem(item)}
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
