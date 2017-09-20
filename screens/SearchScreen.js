import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, SearchBar, Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import CollapsibleItem from '../components/collapsible_item';

class SearchScreen extends Component {
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
          SEARCH BUS STOPS
        </Text>
      </View>
    )
  });

  state = { term: 'Victoria ', selected: null };

  onBusStopSearchDelayed = _.debounce((term, page) => {
    console.log(`searching for ${term}`);
    this.props.searchBusStops(term, page);
  }, 800);

  componentDidMount() {
    if (this.state.term) {
      this.onBusStopSearchDelayed(this.state.term);
    }
  }

  onBusStopSearch(term) {
    this.setState({ term });
    this.onBusStopSearchDelayed(term);
  }

  onEndReached() {
    if (this.props.bus_stops.currentPage < this.props.bus_stops.totaPages) {
      console.log('pagination has been fired');
      const page = this.props.bus_stops.currentPage + 1;
      this.onBusStopSearchDelayed(this.state.term, page);
    }
  }

  selectItem(item) {
    this.setState({ selected: item.BusStopCode });
    this.props.fetchBusArrival(item.BusStopCode);
  }

  renderItem(item) {
    return (
      <View
        key={item.BusStopCode}
        style={{ height: 75, paddingLeft: 20, justifyContent: 'center' }}
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
          <Text style={{ fontSize: 14, color: '#A3A3A7', paddingLeft: 5 }}>
            {item.RoadName}
          </Text>
        </View>
      </View>
    );
    // let selectedItemData;
    //
    // if (item.BusStopCode === (this.props.bus_arrivals || {}).BusStopID) {
    //   if (this.state.selected === item.BusStopCode) {
    //     console.log(
    //       `match! ${item.BusStopCode} ${this.state.selected} ${this.props
    //         .bus_arrivals.BusStopID}`
    //     );
    //     selectedItemData = this.props.bus_arrivals;
    //   }
    // }
    //
    // console.log(selectedItemData);
    //
    // return (
    //   <CollapsibleItem
    //     item={item}
    //     selectedItem={this.state.selected}
    //     selectedItemData={selectedItemData}
    //     onSelect={item => this.selectItem(item)}
    //   />
    // );
  }

  renderHeader() {
    return (
      <View>
        <SearchBar
          onChangeText={term => this.onBusStopSearch(term)}
          placeholder="Search places, bus-stops, bus no."
        />
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
        />

        <FlatList
          style={{ backgroundColor: '#161823' }}
          keyboardShouldPersistTaps={'always'}
          data={this.props.bus_stops.data}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.BusStopCode}
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader()}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={1}
        />
      </View>
    );
  }
}

function mapStateToProps({ bus_stops, bus_arrivals }, ownProps) {
  return { bus_stops, bus_arrivals };
}

export default connect(mapStateToProps, actions)(SearchScreen);
