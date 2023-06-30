import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {asyncForgotPassword} from '../../redux/actions/auth';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('email cannot be empty'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const doForgot = values => {
    dispatch(asyncForgotPassword(values));
    navigation.navigate('ResetPassword');
  };
  return (
    <View style={style.containerFp}>
      <View style={style.container}>
        <View style={style.boxContainer}>
          <Text style={style.text1}>Forgot Password</Text>
          <Text style={style.text2}>You’ll get mail soon on your email</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={doForgot}
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
              <View>
                <TextInput
                  style={style.textInput}
                  keyboardType="email-address"
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={style.textErrorMessage}>{errors.email}</Text>
                )}
              </View>
              <TouchableOpacity style={style.button} onPress={handleSubmit}>
                <Text style={style.buttonText}>Send</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerFp: {
    backgroundColor: 'white',
    height: 670,
  },
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
    // backgroundColor: 'white',
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
  textErrorMessage: {
    color: 'red',
  },
});

export default ForgotPassword;
