import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem, Card, Button } from 'react-native-elements';
import { Grid, Row, Col } from 'react-native-elements';
import moment from 'moment';

class CollapsibleItem extends Component {
  state = {
    collapsed: !(this.props.selectedItem === this.props.item.BusStopCode)
  };

  componentWillReceiveProps(nextProps) {
    const collapse = !(nextProps.selectedItem === nextProps.item.BusStopCode);
    this.setState({ collapsed: collapse });
    // this.setState({ bus_arrivals: nextProps.selectedItemData });
    // console.log('componentWillReceiveProps');
    // console.log(nextProps.selectedItemData);
  }

  renderBusArrival() {
    // console.log('bus_arrivals');
    // console.log(this.state.bus_arrivals);
    if (this.props.selectedItemData) {
      return (
        <View>
          {this.props.selectedItemData.Services.map((u, i) => {
            const timeNow = moment().utcOffset(8);
            const serviceNo = u.ServiceNo;

            let nextBus = Math.floor(
              moment
                .duration(moment(u.NextBus.EstimatedArrival).diff(timeNow))
                .asMinutes()
            );

            if (!isNaN(nextBus)) {
              nextBus = nextBus > 1 ? nextBus : 'Arr';
            } else {
              nextBus = '-';
            }

            let subsequentBus = Math.floor(
              moment
                .duration(
                  moment(u.SubsequentBus.EstimatedArrival).diff(timeNow)
                )
                .asMinutes()
            );

            if (!isNaN(subsequentBus)) {
              subsequentBus = subsequentBus > 1 ? subsequentBus : 'Arr';
            } else {
              subsequentBus = '-';
            }

            let subsequentBus3 = Math.floor(
              moment
                .duration(
                  moment(u.SubsequentBus3.EstimatedArrival).diff(timeNow)
                )
                .asMinutes()
            );

            if (!isNaN(subsequentBus3)) {
              subsequentBus3 = subsequentBus3 > 1 ? subsequentBus3 : 'Arr';
            } else {
              subsequentBus3 = '-';
            }

            console.log('--');
            console.log(moment(u.NextBus.EstimatedArrival));
            console.log('--');

            return (
              <View
                key={i}
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: 'powderblue'
                  }}
                >
                  {`Bus ${serviceNo}`}
                </Text>
                <Text
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: 'powderblue'
                  }}
                >
                  {nextBus}
                </Text>
                <Text
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: 'powderblue'
                  }}
                >
                  {subsequentBus}
                </Text>
                <Text
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: 'powderblue'
                  }}
                >
                  {subsequentBus3}
                </Text>
              </View>
            );
          })}
        </View>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <Card
        key={this.props.item.BusStopCode}
        title={`${this.props.item.Description} (${this.props.item
          .BusStopCode})`}
      >
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          onPress={() => this.props.onSelect(this.props.item)}
          title="Check Schedule"
        />
        {this.renderBusArrival()}
      </Card>

      // <ListItem
      //   key=
      //   title={this.props.item.Description}
      //   onPress={() => this.props.onSelect(this.props.item)}
      // />
    );
  }
}

export default CollapsibleItem;
