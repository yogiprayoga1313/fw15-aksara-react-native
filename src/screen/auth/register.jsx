import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Sign Up</Text>
        <View style={style.text}>
          <Text style={style.text2}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={style.text3}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.boxContainer}>
        <TextInput style={style.textInput} placeholder="Full Name" />
        <TextInput style={style.textInput} placeholder="Email" />
        <TextInput
          style={style.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={style.textInput}
          placeholder="Confirm Passowrd"
          secureTextEntry={true}
        />
      </View>
      <View>
        <Text style={style.text2}>Accept terms and condition</Text>
      </View>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={style.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  text: {
    flexDirection: 'row',
    gap: 5,
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
  text3: {
    color: '#3366FF',
    fontWeight: 'bold',
  },
  box: {
    opacity: 0.6,
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
});

export default Register;
