import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Link} from '@react-navigation/native';
import {Formik} from 'formik';
import {asyncRegister} from '../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Alert from '../../components/Alert';
import {clearMessage} from '../../redux/reducers/auth';
import Checkbox from '../../components/Checkbox';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address'),
  password: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Password cannot be empty'),
});

const Register = ({secureTextEntry}) => {
  const [visible, setVisibility] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doRegister = values => {
    dispatch(asyncRegister(values));
  };
  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }
  if (successMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
      navigation.replace('Login');
    }, 3000);
  }
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
      {successMessage && <Alert variant="success">Success Register</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          termAndCondition: false,
        }}
        validationSchema={validationSchema}
        onSubmit={doRegister}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <>
            <View style={style.boxContainer}>
              <TextInput
                style={style.textInput}
                placeholder="Full Name"
                onBlur={handleBlur('fullName')}
                onChangeText={handleChange('fullName')}
                value={values.fullName}
              />
              {errors.fullName && touched.fullName && (
                <Text style={style.textErrorMessage}>{errors.fullName}</Text>
              )}
              <TextInput
                style={style.textInput}
                placeholder="Email"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={style.textErrorMessage}>{errors.email}</Text>
              )}
              <View style={style.textInputPass}>
                {!secureTextEntry && (
                  <TextInput
                    style={style.inputNew}
                    placeholder="Password"
                    secureTextEntry={!visible}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                )}
                {!secureTextEntry && (
                  <TouchableOpacity onPress={() => setVisibility(!visible)}>
                    {!visible && <Icon size={20} name="eye" />}
                    {visible && <Icon size={25} name="eye-off" />}
                  </TouchableOpacity>
                )}
              </View>
              {errors.password && touched.password && (
                <Text style={style.textErrorMessage}>{errors.password}</Text>
              )}
              <View style={style.textInputPass}>
                {!secureTextEntry && (
                  <TextInput
                    style={style.inputNew}
                    placeholder="Confirm Password"
                    secureTextEntry={!visible}
                    onBlur={handleBlur('confirmPassword')}
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                  />
                )}
                {!secureTextEntry && (
                  <TouchableOpacity onPress={() => setVisibility(!visible)}>
                    {!visible && <Icon size={20} name="eye" />}
                    {visible && <Icon size={25} name="eye-off" />}
                  </TouchableOpacity>
                )}
              </View>
              {errors.password && touched.password && (
                <Text style={style.textErrorMessage}>{errors.password}</Text>
              )}
            </View>
            <View style={style.chechbox}>
              <Checkbox
                disabled={false}
                value={values.termAndCondition}
                onValueChange={value =>
                  setFieldValue('termAndCondition', value)
                }
              />
              <Text style={style.text2}>Accept terms and condition</Text>
            </View>
            <TouchableOpacity style={style.button} onPress={handleSubmit}>
              <Text style={style.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
    // opacity: 0.6,
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
  textInputPass: {
    // opacity: 0.6,
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
  inputNew: {
    flex: 1,
    fontSize: 17,
  },
  textErrorMessage: {
    color: 'red',
  },
  chechbox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default Register;
