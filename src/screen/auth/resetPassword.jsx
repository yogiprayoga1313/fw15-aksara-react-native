import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import {asyncResetPassword} from '../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Alert from '../../components/alert';
import {clearMessage} from '../../redux/reducers/auth';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address'),
  password: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Password cannot be empty'),
});

const ResetPassword = ({secureTextEntry}) => {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doReset = values => {
    dispatch(asyncResetPassword(values));
    navigation.navigate('Login');
  };

  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }

  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <Text style={style.text1}>Reset Password</Text>
        <View style={style.text}>
          <Text style={style.text2}>Input code to reset your password!</Text>
        </View>
      </View>
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          code: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doReset}>
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
                placeholder="Code"
                onBlur={handleBlur('code')}
                onChangeText={handleChange('code')}
                value={values.code}
                keyboardType="number"
              />
              {errors.code && touched.code && (
                <Text style={style.textErrorMessage}>{errors.code}</Text>
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
                    {!visible && <Icon size={20} name="eye-off" />}
                    {visible && <Icon size={25} name="eye" />}
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
                    {!visible && <Icon size={20} name="eye-off" />}
                    {visible && <Icon size={25} name="eye" />}
                  </TouchableOpacity>
                )}
              </View>
              {errors.password && touched.password && (
                <Text style={style.textErrorMessage}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity style={style.button} onPress={handleSubmit}>
              <Text style={style.buttonText}>Send</Text>
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
});
export default ResetPassword;
