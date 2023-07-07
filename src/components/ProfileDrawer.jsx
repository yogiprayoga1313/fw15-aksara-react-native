import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  DrawerContent,
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import http from '../helpers/http';

const ProfileDrawer = props => {
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    if (token) {
      const getProfile = async () => {
        const {data} = await http(token).get('/profile');
        setProfile(data.results);
      };
      getProfile();
    }
  }, [token]);
  return (
    <DrawerContentScrollView {...props}>
      <View style={style.containerProfile}>
        <View style={style.foto}>
          <View style={style.fotoIcon}>
            <Image src={profile?.picture || null} style={style.IMGProfiles} />
          </View>
        </View>
        <View>
          <Text style={style.textFullname}>
            {profile?.fullName?.length < 14 && profile?.fullName}
            {profile?.fullName?.length >= 14 &&
              profile?.fullName?.slice(0, 14) + ' ...'}
          </Text>
          <Text style={style.textProfession}>
            {profile.profession ? profile.profession : 'profession: -'}
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const style = StyleSheet.create({
  containerProfile: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#4c3f91',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 55,
    height: 55,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: 60,
    height: 60,
  },
  textFullname: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'black',
    width: 240,
  },
  textProfession: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'grey',
  },
});

export default ProfileDrawer;
