import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {React, useState} from 'react';
import {RadioButton} from 'react-native-paper';

const EditProfile = () => {
  const [gender, setGender] = useState('');

  const handleRadioPress = value => {
    setGender(value);
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.contTextPr}>
        <Text style={style.textEditPr}>Edit profile</Text>
      </View>
      <View style={style.contEditProf}>
        <View style={style.fotoCont}>
          <View style={style.foto}>
            <View style={style.fotoIcon}>
              <Text>Foto</Text>
            </View>
          </View>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Name</Text>
          <TextInput style={style.textInput} placeholder="Yogi Prayoga" />
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Username</Text>
          <View style={style.flexCont}>
            <Text>@yogiprayoga</Text>
            <TouchableOpacity>
              <Text style={style.textEdit}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Email</Text>
          <View style={style.flexCont}>
            <Text>yogiprayoga@mail.com</Text>
            <TouchableOpacity>
              <Text style={style.textEdit}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Phone Number</Text>
          <View style={style.flexCont}>
            <Text>088888888888</Text>
            <TouchableOpacity>
              <Text style={style.textEdit}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Gender</Text>
          <RadioButton.Group onValueChange={handleRadioPress} value={gender}>
            <View style={style.flexCont}>
              <View style={style.flexContGender}>
                <RadioButton.Android value="male" />
                <Text>Male</Text>
              </View>
              <View style={style.flexContGender}>
                <RadioButton.Android value="female" />
                <Text>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Profession</Text>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Nationality</Text>
        </View>
        <View style={style.nameCont}>
          <Text style={style.values}>Birthday Date</Text>
        </View>
        <TouchableOpacity style={style.touchCheckOut}>
          <Text style={style.textCheckout}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(51, 102, 255, 1)',
  },
  textEditPr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contTextPr: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
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
    borderColor: 'blue',
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
});

export default EditProfile;
