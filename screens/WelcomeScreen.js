import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
import Collapsible from 'react-native-collapsible';

const SLIDE_DATA = [
  { text: 'Welcome to SGBetterBus', color: '#03A9f4' },
  { text: 'Use to know bus timing', color: '#009688' },
  { text: 'Pin buses', color: '#03A9f4' }
];

class WelcomeScreen extends Component {
  state = { returning_user: null };

  async componentWillMount() {
    let returning_user = await AsyncStorage.getItem('returningUser');
    if (returning_user) {
      this.setState({ returning_user: 'yes' });
      this.props.navigation.navigate('main');
    } else {
      this.setState({ returning_user: 'no' });
    }
  }

  onSlideComplete = () => {
    AsyncStorage.setItem('returningUser', 'yes');
    this.props.navigation.navigate('main');
  };

  render() {
    if (_.isNull(this.state.returning_user)) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete.bind(this)} />
    );
  }
}

export default WelcomeScreen;
