import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, SearchBar, Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import CollapsibleItem from '../components/collapsible_item';

class SearchScreen extends Component {
  static navigationOptions = {
    header: (
      <View
        style={{
          height: 97,
          marginTop: 20,
          paddingTop: 14, // only for IOS to give StatusBar Space
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
            marginTop: 12
          }}
        >
          NEARBY BUS STOPS
        </Text>
      </View>
    )
  };

  //   /* NEARBY BUS STOPS: */
  // font-family: Heebo-Regular;
  // font-size: 11px;
  // color: #FFFFFF;
  // letter-spacing: 1px;

  // flex-start, center, flex-end, space-around, and space-between.
  // flex-start, center, flex-end, and stretch.

  state = { term: '', selected: null };

  onBusStopSearchDelayed = _.debounce((term, page) => {
    console.log(`searching for ${term}`);
    this.props.searchBusStops(term, page);
  }, 800);

  renderCenterComponent() {
    return (
      <View>
        <Text style={{ color: 'red' }}> Hello </Text>
      </View>
    );
  }

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
    let selectedItemData;

    if (item.BusStopCode === (this.props.bus_arrivals || {}).BusStopID) {
      if (this.state.selected === item.BusStopCode) {
        console.log(
          `match! ${item.BusStopCode} ${this.state.selected} ${this.props
            .bus_arrivals.BusStopID}`
        );
        selectedItemData = this.props.bus_arrivals;
      }
    }

    console.log(selectedItemData);

    return (
      <CollapsibleItem
        item={item}
        selectedItem={this.state.selected}
        selectedItemData={selectedItemData}
        onSelect={item => this.selectItem(item)}
      />
    );
  }

  renderHeader() {
    return (
      <View>
        <SearchBar
          lightTheme
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
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <List
          style={{}}
          containerStyle={{
            borderTopWidth: 1,
            borderBottomWidth: 0
          }}
        >
          <FlatList
            keyboardShouldPersistTaps={'always'}
            data={this.props.bus_stops.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.BusStopCode}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader()}
            onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={1}
          />
        </List>
      </View>
    );
  }
}

function mapStateToProps({ bus_stops, bus_arrivals }, ownProps) {
  return { bus_stops, bus_arrivals };
}

export default connect(mapStateToProps, actions)(SearchScreen);
