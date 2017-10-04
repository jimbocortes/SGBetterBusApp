import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class BusListItem extends PureComponent {
  onPress() {
    console.log(this.props.item);
    this.props.onPressItem(this.props.item);
  }

  render() {
    const { item } = this.props;
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
              key={item.ServiceNo}
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
                {item.ServiceNo}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BusListItem;
