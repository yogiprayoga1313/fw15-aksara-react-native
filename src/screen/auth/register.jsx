import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Link} from '@react-navigation/native';

const Register = ({secureTextEntry}) => {
  const [visible, setVisibility] = React.useState(false);
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Sign Up</Text>
        <View style={style.text}>
          <Text style={style.text2}>Already have an account?</Text>
          <Link to="/Login">
            <Text style={style.text3}>Log In</Text>
          </Link>
        </View>
      </View>
      <View style={style.boxContainer}>
        <TextInput style={style.textInput} placeholder="Full Name" />
        <TextInput style={style.textInput} placeholder="Email" />
        <View style={style.textInputPass}>
          {!secureTextEntry && (
            <TextInput
              style={style.inputNew}
              placeholder="Password"
              secureTextEntry={!visible}
            />
          )}
          {!secureTextEntry && (
            <TouchableOpacity onPress={() => setVisibility(!visible)}>
              {!visible && <Icon size={20} name="eye-off" />}
              {visible && <Icon size={25} name="eye" />}
            </TouchableOpacity>
          )}
        </View>
        <View style={style.textInputPass}>
          {!secureTextEntry && (
            <TextInput
              style={style.inputNew}
              placeholder="Confirm Password"
              secureTextEntry={!visible}
            />
          )}
          {!secureTextEntry && (
            <TouchableOpacity onPress={() => setVisibility(!visible)}>
              {!visible && <Icon size={20} name="eye-off" />}
              {visible && <Icon size={25} name="eye" />}
            </TouchableOpacity>
          )}
        </View>
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
    backgroundColor: 'white',
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
    fontWeight: 'bold',
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
  textInputPass: {
    opacity: 0.6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
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
  inputNew: {
    flex: 1,
    fontSize: 17,
  },
});

export default Register;
