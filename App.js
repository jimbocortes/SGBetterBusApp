import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import PinsScreen from './screens/PinsScreen';
import NearbyScreen from './screens/NearbyScreen';
import SearchScreen from './screens/SearchScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        main: {
          screen: TabNavigator({
            search: {
              screen: StackNavigator({
                search: {
                  screen: SearchScreen
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
          })
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
