import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import IconPass from 'react-native-vector-icons/Feather';

const Profile = () => {
  const [profile, setProfile] = React.useState({});
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);

  React.useEffect(() => {
    async function getDataProfile() {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    }
    getDataProfile();
  }, [token]);
  return (
    <ScrollView style={style.container}>
      <View style={style.profCont}>
        <Text style={style.profileText}>Profile</Text>
      </View>
      <View style={style.contProfile}>
        <View style={style.contProfileName}>
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
          <View style={style.contProfileName}>
            <Text style={style.name}>{profile?.fullName}</Text>
            {profile.profession && (
              <Text style={style.profesi}>{profile?.profession}</Text>
            )}
            {!profile.profession && (
              <Text style={style.profesiNoset}>No Set</Text>
            )}
          </View>
        </View>
        <View style={style.cardOne}>
          <View style={style.CardOptipn}>
            <Text style={style.cardText}>Card</Text>
            <View>
              <TouchableOpacity style={style.plusCont}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={style.CardCountain}>
              <View style={style.cardOutput}>
                <Text>Card</Text>
              </View>
              <View style={style.cardOutput}>
                <Text>Card</Text>
              </View>
            </View>
          </ScrollView>
          <View style={style.editProf}>
            <View style={style.contTextEdit}>
              <View>
                <IconPass name="edit-3" size={25} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={style.textEdit}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <IconPass name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={style.editPass}>
            <View style={style.contTextEdit}>
              <View>
                <IconPass name="unlock" size={25} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={style.textEdit}>Change Password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <IconPass name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#76BA99',
  },
  profileText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  contProfile: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    gap: 15,
  },
  contProfileName: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
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
  contName: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  profesi: {
    fontSize: 16,
    color: 'black',
    opacity: 0.7,
  },
  profesiNoset: {
    fontSize: 16,
    color: 'red',
    opacity: 0.5,
  },
  cardOne: {
    gap: 15,
  },
  CardOptipn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  plusCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'blue',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginLeft: 30,
  },
  cardOutput: {
    width: 288,
    height: 172,
    backgroundColor: '#FFA000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  CardCountain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editPass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  textEdit: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  contTextEdit: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoProfile: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
});
export default Profile;
