import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import IconPass from 'react-native-vector-icons/Feather';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';

const ManageEvent = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [dataEvents, setDataEvents] = React.useState([]);

  React.useEffect(() => {
    async function getDataEventsByUser() {
      const {data} = await http(token).get(
        '/events/manage?sortBy=DESC&limit=3',
      );
      setDataEvents(data.results);
      console.log(data);
    }
    getDataEventsByUser();
  }, [token, setDataEvents]);

  const handlePressDetail = id => {
    navigation.navigate('Events', {id});
  };

  const handleDelete = async id => {
    try {
      const {data} = await http(token).delete(`/events/manage/${id}`);
      console.log(data);
      setDataEvents(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.contText}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeMain')}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.textEditMb}>Manage Event</Text>
      </View>
      <View style={style.contValue}>
        <TouchableOpacity
          style={style.month}
          onPress={() => navigation.navigate('CreateEvent')}>
          <View>
            <Text style={style.textMonth}>Create</Text>
          </View>
        </TouchableOpacity>
        <View style={style.contItemValue}>
          <View>
            {dataEvents.length === 0 ? (
              <View style={style.contNoData}>
                <Text style={style.textNt}>No Events Bought</Text>
                <Text style={style.textDesc}>
                  It appears you haven’t bought any tickets yet. Maybe try
                  searching these?
                </Text>
              </View>
            ) : (
              dataEvents.map(item => {
                return (
                  <>
                    <View
                      key={`manageEvents-${item.id}`}
                      style={style.contValueMb}>
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
                          <Text>
                            {moment(item.date).format('ddd, DD-MMMM-YYYY')}
                          </Text>
                        </View>
                        <View style={style.touch}>
                          <TouchableOpacity
                            onPress={() => handlePressDetail(item.id)}>
                            <Text style={style.textDetail}>Detail</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('EditArticleUser', {
                                id: item.id,
                              })
                            }>
                            <Text style={style.textDetail}>Update</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleDelete(item.id)}>
                            <Text style={style.textDetail}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                );
              })
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  touch: {
    // flexDirection: 'row',
    gap: 5,
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
  },
  container: {
    backgroundColor: '#76BA99',
  },
  contText: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
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
    padding: 30,
    gap: 50,
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
  contNoData: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  textNt: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  textDesc: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ManageEvent;
