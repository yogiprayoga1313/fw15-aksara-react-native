import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const TouchId = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={style.containerOut}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={style.textOut}>Regular Login</Text>
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <View style={style.containerView}>
          <Text style={style.text}>Touch ID</Text>
          <Text style={style.textView}>
            Authenticate using app’s Touch ID instead of tentering your password
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textView: {
    width: 221,
    textAlign: 'center',
    fontSize: 16,
  },
  textOut: {
    color: '#3366FF',
    fontWeight: 'semibold',
    textAlign: 'right',
  },
  containerOut: {
    padding: 20,
  },
});

export default TouchId;
