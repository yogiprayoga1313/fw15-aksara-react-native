import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';
import IconPass from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Events from './Events';
import Payment from './Payment';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import ManageEvent from './ManageEvent';
import Booking from './Booking';
import CreateEvent from './CreateEvent';
import EditEventUser from './EditArticle';
import {Formik} from 'formik';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  const [events, setEvents] = React.useState([]);
  const deviceToken = useSelector(state => state.deviceToken.data);
  const token = useSelector(state => state.auth.token);
  const [sort, setSort] = React.useState('DESC');
  const [sortBy, setSortBy] = React.useState('title');
  const [searchText, setSearchText] = React.useState('');

  const searchEvents = async () => {
    try {
      // Buat query parameter pencarian berdasarkan nilai input teks
      const searchQuery = searchText ? `search=${searchText}` : '';

      // Kirim permintaan pencarian ke server
      const {data} = await http(token).get(
        `/events?${searchQuery}&limit=5&sortBy=${sortBy}&page=1&sort=${sort}`,
      );
      console.log(data);
      setEvents(data.results);
    } catch (err) {
      console.log('Error', err);
    }
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const saveToken = useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    const {data} = await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    saveToken();
  }, [saveToken]);

  React.useEffect(() => {
    async function getDataEvents() {
      try {
        const {data} = await http(token).get(
          '/events?limit=5&sortBy=DESC&page=1',
        );
        setEvents(data.results);
      } catch (err) {
        console.log('Error', err);
      }
    }
    getDataEvents();
  }, [token, sortBy, sort]);

  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <ScrollView style={style.wrapper}>
      <View style={style.bars}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="bars" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <Formik
        initialValues={{
          serachName: '',
        }}>
        {({handleBlur, handleChange, handleSubmit}) => (
          <>
            <View>
              <TextInput
                style={style.textInput}
                placeholderTextColor="white"
                placeholder="Search Event..."
                onBlur={handleBlur('searchName')}
                onChangeText={text => setSearchText(text)}
                value={searchText}
              />
              {/* <TouchableOpacity onPress={searchEvents}>
                <IconPass name="search" size={30} />
              </TouchableOpacity> */}
            </View>
            <View style={style.contsiner} horizontal={false}>
              <View>
                <View style={style.filter}>
                  <Text style={style.containerText}>Events For You</Text>
                  <TouchableOpacity style={style.filterStyle}>
                    <IconPass name="filter" size={25} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal={true} style={style.wrapperBox}>
                {events.map(event => {
                  return (
                    <View
                      style={style.containerTextNew}
                      key={`events-${event.id}`}>
                      <Image
                        source={{uri: event?.picture || null}}
                        style={style.styleImage}
                      />
                      <View style={style.warapperTextCont}>
                        <Text style={style.textNew}>
                          {moment(event.date).format('ddd, DD-MMMM-YYYY')}
                        </Text>
                        <Text style={style.textContaninerNew}>
                          {event.title.split(' ').slice(0, 10).join(' ')}
                          {event.title.split(' ').length > 15 ? '...' : ''}
                        </Text>
                        <TouchableOpacity
                          style={style.arrow}
                          onPress={() =>
                            navigation.navigate('Events', {id: event.id})
                          }>
                          <IconPass
                            name="arrow-right"
                            size={30}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <View>
                <Text style={style.containerText}>Discover</Text>
              </View>
              <ScrollView style={style.wrapperBox} horizontal={true}>
                <View style={style.wrapperBoxNew}>
                  <TouchableOpacity style={style.wrapperBoxDiscover}>
                    <View style={style.iconDiscover}>
                      <IconPass name="map-pin" size={20} color="purple" />
                    </View>
                    <Text style={style.textDiscover}>YOUR AREA</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.wrapperBoxNew}>
                  <View style={style.wrapperBoxDiscover}>
                    <View style={style.iconDiscoverMusic}>
                      <IconPass
                        name="music"
                        size={20}
                        color="rgba(255, 61, 113, 1)"
                      />
                    </View>
                    <Text style={style.textDiscoverMusic}>MUSIC</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={style.wrapperBoxNew}>
                  <View style={style.wrapperBoxDiscover}>
                    <View style={style.iconDiscoverSport}>
                      <IconPass
                        name="truck"
                        size={20}
                        color="rgba(255, 137, 0, 1)"
                      />
                    </View>
                    <Text style={style.textDiscoverSport}>SPORT</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
              <View style={style.containerUpcoming}>
                <Text style={style.containerTextUpcoming}>Upcoming</Text>
                <Text>See all</Text>
              </View>
              <View style={style.monthTextCont}>
                <Text style={style.monthText}>SEP</Text>
              </View>
              <View style={style.upcomingBox}>
                <View style={style.upcomingTextCont}>
                  <View style={style.textContDay}>
                    <Text style={style.textDay}>15</Text>
                    <Text>Wed</Text>
                  </View>
                </View>
                <View style={style.contentUpcoming}>
                  <View style={style.containerTextNew}>
                    <View style={style.warapperTextCont}>
                      <Text style={style.textNew}>Wed, 15 Nov, 4:00 PM</Text>
                      <Text style={style.textContaninerNew}>
                        Sights & Sounds Exhibition
                      </Text>
                    </View>
                    <TouchableOpacity style={style.button1}>
                      {/* <Text>Next</Text> */}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={style.buttonUpcoming}>
                    <Text style={style.textButton}>Show All 5 Events</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={style.upcomingBox}>
                <View style={style.upcomingTextCont}>
                  <View style={style.textContDay}>
                    <Text style={style.textDay}>16</Text>
                    <Text>Thu</Text>
                  </View>
                </View>
                <View style={style.contentUpcoming}>
                  <View style={style.containerTextNew}>
                    <View style={style.warapperTextCont}>
                      <Text style={style.textNew}>Wed, 15 Nov, 4:00 PM</Text>
                      <Text style={style.textContaninerNew}>
                        Sights & Sounds Exhibition
                      </Text>
                    </View>
                    <TouchableOpacity style={style.button1}>
                      {/* <Text>Next</Text> */}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={style.buttonUpcoming}>
                    <Text style={style.textButton}>Show All 5 Events</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="ManageEvent" component={ManageEvent} />
      <Stack.Screen name="EditArticleUser" component={EditEventUser} />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  filterStyle: {
    marginLeft: 70,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 9,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-beetwen',
  },
  wrapper: {
    backgroundColor: '#76BA99',
    gap: 30,
  },
  bars: {
    flexDirection: 'row',
    padding: 30,
  },
  contsiner: {
    backgroundColor: 'white',
    border: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 10,
  },
  textColor: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    opacity: 0.8,
    color: 'white',
    borderColor: 'white',
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  containerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 30,
  },
  containerTextNew: {
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    top: 30,
    left: 10,
    width: 230,
    height: 30,
  },
  textNew: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  warapperTextCont: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 250,
    // left: 15,
    width: 260,
    height: 125,
    flexDirection: 'column',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
  },
  wrapperBox: {
    flexDirection: 'row',
    gap: 10,
  },
  wrapperBoxNew: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 30,
    width: 165,
    height: 66,
    borderRadius: 30,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  button1: {
    backgroundColor: 'red',
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 310,
    left: 15,
  },
  textDiscover: {
    fontSize: 16,
    color: '#884DFF',
    fontWeight: 'bold',
  },
  textDiscoverMusic: {
    fontSize: 16,
    color: 'rgba(255, 61, 113, 1)',
    fontWeight: 'bold',
  },
  textDiscoverSport: {
    fontSize: 16,
    color: 'rgba(255, 137, 0, 1)',
    fontWeight: 'bold',
  },
  iconDiscover: {
    width: 45,
    height: 45,
    backgroundColor: '#D0B8FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDiscoverSport: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 218, 175, 1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDiscoverMusic: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 183, 202, 1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBoxDiscover: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextUpcoming: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  containerUpcoming: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingBox: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  upcomingTextCont: {
    width: 60,
    height: 85,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3D72',
  },
  monthTextCont: {
    paddingHorizontal: 40,
  },
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonUpcoming: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
    width: '80%',
    height: 50,
    borderTopColor: '#FF8900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  contentUpcoming: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
  },
  styleImage: {
    width: 260,
    height: 376,
    borderRadius: 30,
  },
  arrow: {
    backgroundColor: '#76BA99',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 70,
    left: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});

export default HomeStack;
