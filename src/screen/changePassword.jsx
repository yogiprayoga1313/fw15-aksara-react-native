import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ChangePassword = () => {
  return (
    <View style={style.container}>
      <View style={style.contText}>
        <Text style={style.textEditCp}>Change Password</Text>
      </View>
      <View style={style.contValues}>
        <View>
          <View style={style.nameCont}>
            <Text style={style.values}>Old Password</Text>
            <TextInput
              style={style.textInput}
              placeholder="Input Old Password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <View style={style.nameCont}>
            <Text style={style.values}>New Password</Text>
            <TextInput
              style={style.textInput}
              placeholder="Input New Password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <View style={style.nameCont}>
            <Text style={style.values}>Confirm Password</Text>
            <TextInput
              style={style.textInput}
              placeholder="Input Confirm Password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity style={style.touchCheckOut}>
          <Text style={style.textCheckout}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(51, 102, 255, 1)',
  },
  contText: {
    justifyContent: 'center',
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
  },
  textEditCp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
});
export default ChangePassword;
