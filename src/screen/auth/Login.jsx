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
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {asyncLogin} from '../../redux/actions/auth';
import * as Yup from 'yup';
import Alert from '../../components/Alert';
import {clearMessage} from '../../redux/reducers/auth';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address'),
  password: Yup.string().required('Password cannot be empty'),
});

const Login = ({secureTextEntry}) => {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doLogin = values => {
    dispatch(asyncLogin(values));
  };

  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }
  if (successMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
      navigation.replace('Home');
    }, 3000);
  }

  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Login</Text>
        <View>
          <Text style={style.text2}>Hi, Welcome back to Urticket! </Text>
          <View style={style.contText5}>
            <Text style={style.text2}>Don't have an account?</Text>
            <Link to="/Register">
              <Text style={style.text4}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
      {successMessage && <Alert variant="success">Success Register</Alert>}
      {errorMessage && <Alert variant="error"> {errorMessage}</Alert>}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={doLogin}
        validationSchema={validationSchema}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <View style={style.boxContainer}>
              <TextInput
                style={style.textInput}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={style.textErrorMessage}>{errors.email}</Text>
              )}
              {console.log(errors)}
              <View style={style.textInputPassLogin}>
                {!secureTextEntry && (
                  <TextInput
                    style={style.inputNewLogin}
                    placeholder="Password"
                    secureTextEntry={!visible}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                )}
                {!secureTextEntry && (
                  <TouchableOpacity onPress={() => setVisibility(!visible)}>
                    {!visible && <IconPass size={20} name="eye" />}
                    {visible && <IconPass size={25} name="eye-off" />}
                  </TouchableOpacity>
                )}
              </View>

              {errors.password && touched.password && (
                <Text style={style.textErrorMessage}>{errors.password}</Text>
              )}
            </View>
            <View>
              <View>
                <Link style={style.text3} to="/ForgotPassword">
                  Forgot Password?
                </Link>
              </View>
            </View>
            <TouchableOpacity style={style.button} onPress={handleSubmit}>
              <Text style={style.buttonText}>Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <View style={style.contanerText}>
        <Text>or sign in with</Text>
        <View style={style.iconCont}>
          <TouchableOpacity style={style.iconGoogle}>
            <Icon name="google" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={style.iconFb}>
            <Icon name="facebook" size={30} color="blue" />
          </TouchableOpacity>
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
    // opacity: 0.6,
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
    backgroundColor: '#76BA99',
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
    gap: 20,
  },
  textInputPassLogin: {
    // opacity: 0.6,
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
  textErrorMessage: {
    color: 'red',
  },
  iconCont: {
    flexDirection: 'row',
    gap: 20,
  },
  iconGoogle: {
    borderRadius: 10,
    borderWidth: 2,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#76BA99',
  },
  iconFb: {
    borderRadius: 10,
    borderWidth: 2,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#76BA99',
  },
  text4: {
    color: '#3366FF',
    fontWeight: 'bold',
  },
  contText5: {
    flexDirection: 'row',
    gap: 7,
  },
});

export default Login;
