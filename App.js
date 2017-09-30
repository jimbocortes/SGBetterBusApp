import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import PinsScreen from './screens/PinsScreen';
import NearbyScreen from './screens/NearbyScreen';
import SearchScreen from './screens/SearchScreen';
import BusArrivalScreen from './screens/BusArrivalScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        main: {
          screen: TabNavigator(
            {
              nearbys: {
                screen: StackNavigator({
                  nearby: {
                    screen: NearbyScreen
                  },
                  busArrivals: {
                    screen: BusArrivalScreen
                  }
                })
              },
              pins: {
                screen: StackNavigator({
                  pin: {
                    screen: PinsScreen
                  }
                })
              }
            },
            {
              tabBarOptions: {
                showLabel: false,
                activeTintColor: '#FFF',
                tabStyle: {
                  borderTopWidth: 1,
                  borderColor: '#2E2F38'
                },
                style: {
                  backgroundColor: '#1A1B25'
                }
              }
            }
          )
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        }
      }
    );

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
