import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import IconPass from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {asyncChangePassword} from '../redux/actions/auth';
import * as Yup from 'yup';
import {clearMessage} from '../redux/reducers/auth';
import Icon from 'react-native-vector-icons/Feather';
import Alert from '../components/Alert';
import http from '../helpers/http';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Password cannot be empty'),
  newPassword: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Password cannot be empty'),
});

const ChangePassword = ({secureTextEntry}) => {
  const navigation = useNavigation();
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const token = useSelector(state => state.auth.token);

  const doChange = async values => {
    try {
      const form = new URLSearchParams();
      form.append('oldPassword', values.oldPassword);
      form.append('newPassword', values.newPassword);
      form.append('confirmPassword', values.confirmPassword);
      const {data} = await http(token).patch(
        '/changePassword',
        form.toString(),
      );
      console.log(data);
      if (data?.message) {
        setSuccessMessage(data?.message);
        setTimeout(() => navigation.navigate('Profile'), 2000);
      }
      // console.log(form.toString());
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg) {
        setErrorMessage(errorMsg);
      }
    }
  };

  if (successMessage) {
    setTimeout(() => setSuccessMessage(''), 1500);
  }
  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 2500);
  }

  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }
  return (
    <ScrollView style={style.container}>
      <View style={style.contText}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.textEditCp}>Change Password</Text>
      </View>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doChange}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <View style={style.contValues}>
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
              <View>
                <View style={style.nameCont}>
                  <Text style={style.values}>Old Password</Text>
                  <View style={style.textInputPass}>
                    {!secureTextEntry && (
                      <TextInput
                        style={style.inputNew}
                        placeholder="Old Password"
                        secureTextEntry={!visible}
                        onBlur={handleBlur('oldPassword')}
                        onChangeText={handleChange('oldPassword')}
                        value={values.oldPassword}
                      />
                    )}
                    {!secureTextEntry && (
                      <TouchableOpacity onPress={() => setVisibility(!visible)}>
                        {!visible && <Icon size={20} name="eye-off" />}
                        {visible && <Icon size={25} name="eye" />}
                      </TouchableOpacity>
                    )}
                  </View>
                  {errors.oldPassword && touched.oldPassword && (
                    <Text style={style.textErrorMessage}>
                      {errors.oldPassword}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <View style={style.nameCont}>
                  <Text style={style.values}>New Password</Text>
                  <View style={style.textInputPass}>
                    {!secureTextEntry && (
                      <TextInput
                        style={style.inputNew}
                        placeholder="New Password"
                        secureTextEntry={!visible}
                        onBlur={handleBlur('newPassword')}
                        onChangeText={handleChange('newPassword')}
                        value={values.newPassword}
                      />
                    )}
                    {!secureTextEntry && (
                      <TouchableOpacity onPress={() => setVisibility(!visible)}>
                        {!visible && <Icon size={20} name="eye-off" />}
                        {visible && <Icon size={25} name="eye" />}
                      </TouchableOpacity>
                    )}
                  </View>
                  {errors.newPassword && touched.newPassword && (
                    <Text style={style.textErrorMessage}>
                      {errors.newPassword}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <View style={style.nameCont}>
                  <Text style={style.values}>Confirm Password</Text>
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

                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={style.textErrorMessage}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={style.touchCheckOut}
                onPress={handleSubmit}>
                <Text style={style.textCheckout}>Update</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#76BA99',
  },
  contText: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
  },
  contValues: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 30,
    gap: 20,
    height: 700,
  },
  textEditCp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 50,
  },
  nameCont: {
    gap: 10,
  },
  values: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textInput: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderRadius: 15,
  },
  touchCheckOut: {
    backgroundColor: '#76BA99',
    width: '100%',
    height: 61,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textCheckout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputNew: {
    flex: 1,
    fontSize: 17,
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
  textErrorMessage: {
    color: 'red',
  },
});
export default ChangePassword;
