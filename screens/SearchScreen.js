import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, SearchBar, Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import CollapsibleItem from '../components/collapsible_item';

class SearchScreen extends Component {
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

  state = { term: '', selected: null };

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
