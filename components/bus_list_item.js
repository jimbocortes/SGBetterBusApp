import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class BusListItem extends PureComponent {
  onPress() {
    console.log(this.props.item.BusStopCode);
    this.props.onPressItem(this.props.item.BusStopCode);
  }

  render() {
    const { item } = this.props;
    const distance = item.Location.distance.toFixed(2);
    const subText = `B${item.BusStopCode} ${item.RoadName}`;
    return (
      <View {...this.props}>
        <TouchableOpacity onPress={this.onPress.bind(this)}>
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
                  {subText}
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
        </TouchableOpacity>
      </View>
    );
  }
}

export default BusListItem;
