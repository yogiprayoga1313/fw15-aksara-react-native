import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import IconPass from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
// import {Image} from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

const EditProfile = () => {
  const navigation = useNavigation();
  const [gender, setGender] = React.useState('0');
  const [profile, setProfile] = React.useState({});
  const [editUserName, setEditUserName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [editBirthDate, setEditBirthDate] = React.useState(false);
  const [selectedPicure, setSelectedPicture] = React.useState(false);
  const token = useSelector(state => state.auth.token);
  const [slectedValue, setSelectedValue] = React.useState('developers');

  React.useEffect(() => {
    async function getDataProfile() {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
      console.log(data);
    }
    getDataProfile();
  }, [token]);

  const handleRadioPress = value => {
    setGender(value);
  };

  React.useEffect(() => {
    console.log(selectedPicure);
  }, [selectedPicure]);

  const editProfileUser = async values => {
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key]) {
        if (key === 'birthDate') {
          form.append(key, moment(values[key]).format('YYYY/MM/DD'));
        } else {
          form.append(key, values[key]);
        }
      }
    });
    if (selectedPicure) {
      form.append('picture', selectedPicure);
    }
    const {data} = await http(token).patch('/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setEditBirthDate(false);
    setEditEmail(false);
    setEditPhoneNumber(false);
    setEditUserName(false);
    setProfile(data.results);
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.contTextPr}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.textEditPr}>Edit profile</Text>
      </View>
      <Formik
        initialValues={{
          fullName: profile?.fullName,
          userName: profile?.userName,
          email: profile?.email,
          phoneNumber: profile?.phoneNumber,
          nationality: profile.nationality,
          profession: profile.profession,
          gender: profile?.gender ? '1' : '0',
          birthDate: profile.birthDate,
        }}
        onSubmit={editProfileUser}
        enableReinitialize>
        {({handleSubmit, handleChange, handleBlur, errors, values}) => (
          <>
            <View style={style.contEditProf}>
              <View style={style.fotoCont}>
                <View style={style.foto}>
                  <View style={style.fotoIcon}>
                    {profile.picture && (
                      <Image
                        style={style.fotoProfile}
                        source={{uri: profile?.picture}}
                        width={90}
                        height={90}
                      />
                    )}
                    {!profile.picture && (
                      <IconPass name="user" size={70} color="blue" />
                    )}
                  </View>
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Name</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="Yogi Prayoga"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  name="fullName"
                />
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Username</Text>
                <View style={style.flexCont}>
                  {!editUserName && (
                    <Text>
                      {profile?.userName === null ? (
                        <Text style={style.noSetText}>No Set</Text>
                      ) : (
                        profile?.userName
                      )}
                    </Text>
                  )}
                  {editUserName && (
                    <TextInput
                      onChangeText={handleChange('userName')}
                      onBlur={handleBlur('userName')}
                      style={style.textInput}
                      name="userName"
                    />
                  )}
                  {!editUserName && (
                    <TouchableOpacity onPress={() => setEditUserName(true)}>
                      <Text style={style.textEdit}>edit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Email</Text>
                <View style={style.flexCont}>
                  {!editEmail && (
                    <Text>
                      {profile?.email === null ? (
                        <Text style={style.noSetText}>No Set</Text>
                      ) : (
                        profile?.email
                      )}
                    </Text>
                  )}
                  {editEmail && (
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      style={style.textInput}
                      name="email"
                    />
                  )}
                  {!editEmail && (
                    <TouchableOpacity onPress={() => setEditEmail(true)}>
                      <Text style={style.textEdit}>edit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Phone Number</Text>
                <View style={style.flexCont}>
                  {!editPhoneNumber && (
                    <Text>
                      {profile?.phoneNumber === null ? (
                        <Text style={style.noSetText}>No Set</Text>
                      ) : (
                        profile?.phoneNumber
                      )}
                    </Text>
                  )}
                  {editPhoneNumber && (
                    <TextInput
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      style={style.textInput}
                      name="phoneNumber"
                    />
                  )}
                  {!editPhoneNumber && (
                    <TouchableOpacity onPress={() => setEditPhoneNumber(true)}>
                      <Text style={style.textEdit}>edit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Gender</Text>
                <RadioButton.Group
                  onValueChange={handleRadioPress}
                  value={gender}>
                  <View style={style.flexCont}>
                    <View style={style.flexContGender}>
                      <RadioButton.Android name="gender" value="0" />
                      <Text>Male</Text>
                    </View>
                    <View style={style.flexContGender}>
                      <RadioButton.Android name="gender" value="1" />
                      <Text>Famale</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Profession</Text>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Nationality</Text>
                {/* <View>
                  <Picker
                    selectedValue={slectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }>
                    <Picker.item label="Freelance" value="Freelance" />
                  </Picker>
                </View> */}
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Birthday Date</Text>
              </View>
              <TouchableOpacity
                style={style.touchCheckOut}
                onPress={handleSubmit}>
                <Text style={style.textCheckout}>Save</Text>
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
  textEditPr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 90,
  },
  contTextPr: {
    alignItems: 'center',
    padding: 30,
    flexDirection: 'row',
  },
  contEditProf: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    gap: 20,
  },
  foto: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: '#76BA99',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 110,
    height: 110,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderRadius: 15,
    opacity: 0.5,
    width: '100%',
  },
  nameCont: {
    gap: 10,
  },
  flexCont: {
    flexDirection: 'row',
    gap: 10,
  },
  flexContGender: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  touchCheckOut: {
    backgroundColor: 'blue',
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
  textEdit: {
    color: 'blue',
  },
  values: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  noSetText: {
    color: 'red',
    opacity: 0.8,
  },
  fotoProfile: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  // containerPicker: {
  //   flex: 1,
  //   paddingTop: 40,
  //   alignItems: 'center',
  // },
});

export default EditProfile;
