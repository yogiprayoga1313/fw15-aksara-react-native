import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import IconPass from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import NoData from '../components/NoData';

const MyWishlist = ({navigation}) => {
  const [myWishlist, setMyWishlist] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const [wishlistButton, setWishlistButton] = React.useState(false);

  const getWishlists = React.useCallback(async () => {
    const {data} = await http(token).get('/wishlist');

    console.log(data);
    setMyWishlist(data.results);
  }, [token]);

  React.useEffect(() => {
    getWishlists();
  }, [getWishlists]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/wishlist?sortBy=DESC&limit=3');
        setMyWishlist(data.results);
      };
      fetchData();
    }, [token]),
  );

  return (
    <ScrollView style={style.container}>
      <View style={style.contText}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeMain')}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.textEditMb}>My Wishlist</Text>
      </View>
      <View style={style.contValue}>
        <View style={style.contItemValue}>
          {myWishlist.length < 1 && (
            <NoData noItem="tickets bought" noItemSub="bought any ticket" />
          )}
          {myWishlist.map(item => {
            return (
              <View key={item.id} style={style.contValueMb}>
                <View style={style.mbTextCont}>
                  <View style={style.textContDay}>
                    <Text style={style.textDay}>
                      {moment(item.date).format('DD')}
                    </Text>
                    <Text>{moment(item.date).format('ddd')}</Text>
                  </View>
                </View>
                <View style={style.contItemMb}>
                  <View>
                    <Text style={style.textTitle}>{item?.title}</Text>
                  </View>
                  <View style={style.contTime}>
                    <Text>{item?.cityName}, Indonesia</Text>
                    <Text>{moment(item.date).format('ddd, DD-MMMM-YYYY')}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          {/* <View style={style.contValueMb}>
            <View style={style.mbTextCont}>
              <View style={style.textContDay}>
                <Text style={style.textDay}>15</Text>
                <Text>Wed</Text>
              </View>
            </View>
            <View style={style.contItemMb}>
              <View>
                <Text style={style.textTitle}>Sight & Sound Exhibition</Text>
              </View>
              <View style={style.contTime}>
                <Text>Jakarta, Indonesia</Text>
                <Text>Wed, 15 Nov, 4.00 PM</Text>
              </View>
            </View>
          </View>
          <View style={style.contValueMb}>
            <View style={style.mbTextCont}>
              <View style={style.textContDay}>
                <Text style={style.textDay}>15</Text>
                <Text>Wed</Text>
              </View>
            </View>
            <View style={style.contItemMb}>
              <View>
                <Text style={style.textTitle}>Sight & Sound Exhibition</Text>
              </View>
              <View style={style.contTime}>
                <Text>Jakarta, Indonesia</Text>
                <Text>Wed, 15 Nov, 4.00 PM</Text>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#76BA99',
  },
  contText: {flexDirection: 'row', alignItems: 'center', padding: 30},
  textEditMb: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 80,
  },
  contValue: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // justifyContent: 'center',
    padding: 30,
    // gap: 50,
    height: 700,
  },
  month: {
    backgroundColor: 'rgba(234, 241, 255, 1)',
    width: 125,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMonth: {
    fontWeight: 'bold',
    color: 'blue',
  },
  contValueMb: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 25,
  },
  mbTextCont: {
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
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contItemMb: {
    gap: 15,
    width: 233,
  },
  textTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  contTime: {
    gap: 10,
  },
  textDetail: {
    color: 'blue',
  },
  contItemValue: {
    gap: 40,
  },
});
export default MyWishlist;
