import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconPass from 'react-native-vector-icons/Feather';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';
import NoData from '../components/NoData';

const MyBooking = ({navigation}) => {
  const [reservationByMe, setReservationByMe] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/history?sortBy=DESC&limit=3');
        setReservationByMe(data.results);
        console.log(data);
      };
      fetchData();
    }, [token]),
  );

  const handlePressEvent = () => {
    navigation.navigate('Profile');
  };
  const handlePressDetail = id => {
    navigation.navigate('Events', {id});
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.contText}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.textEditMb}>My Booking</Text>
      </View>
      <View style={style.contValue}>
        <View style={style.month}>
          <View>
            <Text style={style.textMonth}>March</Text>
          </View>
        </View>
        <View style={style.contItemValue}>
          {reservationByMe.length < 1 && (
            <NoData noItem="tickets bought" noItemSub="bought any ticket" />
          )}
          {reservationByMe.map(item => {
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
                    <Text>{item?.location}, Indonesia</Text>
                    <Text>{moment(item.date).format('ddd, DD-MMMM-YYYY')}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePressDetail(item.id)}>
                    <Text style={style.textDetail}>Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#76BA99',
  },
  contText: {
    alignItems: 'center',
    padding: 30,
    flexDirection: 'row',
  },
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
    justifyContent: 'center',
    padding: 30,
    gap: 50,
  },
  month: {
    backgroundColor: 'rgba(234, 241, 255, 1)',
    width: 125,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 80,
  },
  textMonth: {
    fontWeight: 'bold',
    color: 'blue',
  },
  contValueMb: {
    flexDirection: 'row',
    gap: 15,
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
    height: 500,
  },
});
export default MyBooking;
