import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Forgot Password</Text>
        <Text style={style.text2}>You’ll get mail soon on your email</Text>
      </View>
      <View>
        <TextInput style={style.textInput} placeholder="Email" />
      </View>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={style.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 30,
    marginTop: 30,
    justifyContent: 'center',
    padding: 20,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
  },
  text2: {
    color: 'black',
    font: 'bold',
    fontSize: 15,
  },
  textInput: {
    opacity: 0.6,
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
  boxContainer: {
    gap: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3366FF',
    width: '100%',
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contanerText: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default ForgotPassword;
