import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPass from 'react-native-vector-icons/Feather';
import {login} from '../../redux/reducers/auth';
import {useDispatch} from 'react-redux';

const Login = ({secureTextEntry}) => {
  const [visible, setVisibility] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const doLogin = () => {
    dispatch(login('abc'));
  };

  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Login</Text>
        <Text style={style.text2}>Hi, Welcome back to Urticket! </Text>
      </View>
      <View style={style.boxContainer}>
        <TextInput style={style.textInput} placeholder="Email" />
        <View style={style.textInputPassLogin}>
          {!secureTextEntry && (
            <TextInput
              style={style.inputNewLogin}
              placeholder="Password"
              secureTextEntry={!visible}
            />
          )}
          {!secureTextEntry && (
            <TouchableOpacity onPress={() => setVisibility(!visible)}>
              {!visible && <IconPass size={20} name="eye-off" />}
              {visible && <IconPass size={25} name="eye" />}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <Link style={style.text3} to="/ForgotPassword">
          <Text>Forgot Password?</Text>
        </Link>
      </View>
      <TouchableOpacity style={style.button} onPress={doLogin}>
        <Text style={style.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={style.contanerText}>
        <Text>or sign in with</Text>
        <View>
          <Icon name="google" size={30} color="green" />
          <Icon name="facebook" size={30} color="blue" />
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
    backgroundColor: 'white',
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
    fontWeight: 'bold',
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
  textInputPassLogin: {
    opacity: 0.6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  inputNewLogin: {
    flex: 1,
    fontSize: 17,
  },
});

export default Login;
