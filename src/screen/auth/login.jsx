import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Login</Text>
        <Text style={style.text2}>Hi, Welcome back to Urticket! </Text>
      </View>
      <View style={style.boxContainer}>
        <TextInput style={style.textInput} placeholder="Email" />
        <TextInput
          style={style.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={style.text3}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={style.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={style.contanerText}>
        <Text>or sign in with</Text>
        <View>
          <Icon name="google" size={30} color="blue" />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 30,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
  },
  text3: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3366FF',
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

export default Login;
