import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import IconPass from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CameraIcon from 'react-native-vector-icons/Entypo';
import SelectDropdown from 'react-native-select-dropdown';
import FeatherIcon from 'react-native-vector-icons/Feather';

const EditProfile = () => {
  const navigation = useNavigation();
  const [gender, setGender] = React.useState('0');
  const [profile, setProfile] = React.useState({});
  const [editUserName, setEditUserName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedPicure, setSelectedPicture] = React.useState();
  const token = useSelector(state => state.auth.token);
  const [newProfession, setNewProfession] = React.useState('');
  const [newNationality, setNewNationality] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  const selectProfession = ['Programmer', 'Designer', 'Analyst'];
  const selectNationality = ['Indonesia', 'Malaysia', 'Singapura'];

  const getImage = async source => {
    let results;
    if (!source) {
      results = await launchImageLibrary();
    } else {
      results = await launchCamera({
        quality: 0.5,
      });
    }
    const data = results.assets[0];
    console.log(data);
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri:
          Platform.OS === 'android'
            ? data.uri
            : data.uri.replace('file://', ''),
      });
    }
  };

  const uploadFile = React.useCallback(
    async file => {
      const form = new FormData();
      form.append('picture', file);
      const {data} = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    [token],
  );

  React.useEffect(() => {
    if (selectedPicure) {
      uploadFile(selectedPicure);
    }
  }, [selectedPicure, uploadFile]);

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

  const editProfileUser = async values => {
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    // if (selectedPicure) {
    //   form.append('picture', selectedPicure);
    // }

    if (newProfession) {
      form.append('profession', newProfession);
    }

    if (newNationality) {
      form.append('nationality', newNationality);
    }

    if (date) {
      form.append('birthDate', moment(date).format('YYYY-MM-DD'));
    }

    const {data} = await http(token).patch('/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setProfile(data.results);
    setEditEmail(false);
    setEditPhoneNumber(false);
    setEditUserName(false);
    // setProfessionValue(data.results.profession);
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
          nationality: profile?.nationality,
          profession: profile?.profession,
          gender: profile?.gender ? '1' : '0',
          birthDate: profile?.birthDate,
        }}
        onSubmit={editProfileUser}
        enableReinitialize>
        {({handleSubmit, handleChange, handleBlur, errors, values}) => (
          <>
            <View style={style.contEditProf}>
              <View style={style.fotoCont}>
                <View style={style.foto}>
                  <View style={style.fotoIcon}>
                    {selectedPicure ? (
                      <Image
                        style={style.fotoProfile}
                        src={selectedPicure.uri}
                        width={90}
                        height={90}
                      />
                    ) : profile.picture ? (
                      <Image
                        style={style.fotoProfile}
                        source={{uri: profile.picture}}
                        width={90}
                        height={90}
                      />
                    ) : (
                      <IconPass name="user" size={70} color="blue" />
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => getImage()}
                    style={style.cameraIcon}>
                    <CameraIcon name="camera" size={40} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Name</Text>
                <TextInput
                  style={style.textInput}
                  placeholder={values.fullName}
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
                <View>
                  <SelectDropdown
                    data={selectProfession}
                    defaultButtonText={profile?.profession}
                    dropdownStyle={style.drStyle}
                    buttonStyle={style.selectDropdowns}
                    buttonTextStyle={style.btStyle}
                    rowStyle={style.rwStyle}
                    rowTextStyle={style.rtStyle}
                    renderDropdownIcon={isOpened => {
                      return (
                        <FeatherIcon
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          size={25}
                          color="#000"
                        />
                      );
                    }}
                    onSelect={selectedItem => {
                      setNewProfession(selectedItem);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Nationality</Text>
                <View>
                  <SelectDropdown
                    data={selectNationality}
                    defaultButtonText={profile?.nationality}
                    dropdownStyle={style.drStyle}
                    buttonStyle={style.selectDropdowns}
                    buttonTextStyle={style.btStyle}
                    rowStyle={style.rwStyle}
                    rowTextStyle={style.rtStyle}
                    renderDropdownIcon={isOpened => {
                      return (
                        <FeatherIcon
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          size={25}
                          color="#000"
                        />
                      );
                    }}
                    onSelect={selectedItem => {
                      setNewNationality(selectedItem);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>
              </View>
              <View style={style.nameCont}>
                <Text style={style.values}>Birthday Date</Text>
                <View style={style.textBetween}>
                  <View style={style.BirthDateWrapper}>
                    <View style={style.DateWrapper}>
                      <Text>
                        {profile?.birthDate
                          ? moment(profile?.birthDate).format('DD/MM/YYYY')
                          : '-'}
                      </Text>
                    </View>
                  </View>
                  <DatePicker
                    modal
                    open={open}
                    mode="date"
                    date={date}
                    onConfirm={newDate => {
                      setOpen(false);
                      setDate(newDate);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <View>
                    <Text
                      style={style.EditBtnStyle}
                      onPress={() => setOpen(true)}>
                      edit
                    </Text>
                  </View>
                </View>
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
  EditBtnStyle: {
    color: 'blue',
  },
  DateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  BirthDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  textBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  drStyle: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btStyle: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  rwStyle: {
    backgroundColor: '#FFF',
    borderBottomColor: '#FFF',
  },
  rtStyle: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
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
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
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
