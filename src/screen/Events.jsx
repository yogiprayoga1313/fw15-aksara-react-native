import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import IconPass from 'react-native-vector-icons/Feather';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import FAwesome from 'react-native-vector-icons/FontAwesome';

const Events = ({route, navigation}) => {
  const {id} = route.params;
  const [event, setEvent] = React.useState({});
  const token = useSelector(state => state.auth.token);
  const [eventDetail, setEventDetail] = React.useState({});
  const [wishlistButton, setWishlistButton] = React.useState(false);

  React.useEffect(() => {
    const getDataEvent = async () => {
      try {
        const {data} = await http().get(`/events/${id}`);
        setEvent(data.results);
      } catch (err) {
        console.log('Error', err);
      }
    };
    if (id) {
      getDataEvent(id);
    }
  }, [id]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const eventId = {eventId: id};
  //     const qString = new URLSearchParams(eventId).toString();
  //     const fetchData = async () => {
  //       const {data} = await http(token).get(`/wishlist${qString}`);
  //       const btnStatus = data.results;
  //       if (btnStatus) {
  //         setWishlistButton(true);
  //       } else {
  //         setWishlistButton(false);
  //       }
  //     };
  //     fetchData();
  //   }, [token, id]),
  // );

  const addRemoveWishlist = async () => {
    try {
      if (wishlistButton) {
        await http(token).delete(`/wishlist/${id}`);
        setWishlistButton(false);
        console.log('Wishlist dihapus');
      } else {
        const eventId = {eventId: id};
        const qString = new URLSearchParams(eventId).toString();
        const {data} = await http(token).post('/wishlist', qString);
        console.log(data);
        setWishlistButton(true);
        console.log('Wishlist ditambahkan');
      }
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.log(message);
      }
    }
  };

  // const addRemoveWishlist = async () => {
  //   try {
  //     const eventId = {eventId: id};
  //     const qString = new URLSearchParams(eventId).toString();
  //     const {data} = await http(token).post('/wishlist', qString);
  //     console.log(data);
  //     if (wishlistButton) {
  //       setWishlistButton(false);
  //     } else {
  //       setWishlistButton(true);
  //     }
  //   } catch (err) {
  //     const message = err?.response?.data?.message;
  //     if (message) {
  //       console.log(message);
  //     }
  //   }
  // };
  return (
    <ScrollView style={style.container}>
      {event?.picture ? (
        <ImageBackground
          source={{uri: event.picture}}
          style={style.containerImgPic}>
          <View style={style.arrowBack}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeMain')}>
              <IconPass name="arrow-left" size={35} color="white" />
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={addRemoveWishlist}>
                {wishlistButton === true ? (
                  <FAwesome name="heart" size={30} color="red" />
                ) : (
                  <FAwesome name="heart-o" size={30} color="#FFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.containerImg}>
            <Text style={style.textContTitle}>{event?.title}</Text>
            <View>
              <View />
              <Text style={style.textContLoc}>{event?.cityName}</Text>
            </View>
            <View>
              <View />
              <Text style={style.textContLoc}>
                {moment(event?.date).format('ddd, DD MMM YYYY, HH:mm')}
              </Text>
            </View>
            <View>
              <Text style={style.textContLoc}>Attendees</Text>
            </View>
          </View>
          <View style={style.contDetail}>
            <View style={style.contTextDetail}>
              <Text style={style.textEvents}>Event Detail</Text>
              <Text style={style.textDetailEvents}>
                {event?.descriptions && event.descriptions.length > 200
                  ? event.descriptions.substring(0, 200) + '...'
                  : event?.descriptions}
              </Text>
            </View>
            <View style={style.contOut}>
              <View style={style.contOutBtn}>
                <View style={style.boxOut}>
                  <View style={style.boxTic}>
                    <Text style={style.textOut}>Ticket</Text>
                    <Text style={style.textItem}>VIP</Text>
                  </View>
                  <View style={style.boxQty}>
                    <Text style={style.textOut}>Quantity</Text>
                    <Text style={style.textItem}>2</Text>
                  </View>
                  <View style={style.boxPrc}>
                    <Text style={style.textOut}>Price</Text>
                    <Text style={style.textItem}>$70</Text>
                  </View>
                </View>
                <View style={style.touchButton}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Booking', {id: event.id})
                    }>
                    <Text style={style.textTouch}>Buy Tickets</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      ) : null}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
  containerImg: {
    gap: 15,
    justifyContent: 'center',
    width: '100%',
    height: 240,
    paddingHorizontal: 30,
  },
  containerImgPic: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: 730,
    objectFit: 'bg-cover',
  },
  textContTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: 'white',
  },
  textContLoc: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'semibold',
  },
  contDetail: {
    backgroundColor: '#192038',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 300,
  },
  contTextDetail: {
    padding: 25,
    gap: 15,
  },
  textEvents: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  textDetailEvents: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  contOut: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    marginBottom: 70,
    height: 340,
  },
  boxOut: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  boxTic: {
    backgroundColor: '#884DFF',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxQty: {
    backgroundColor: '#FF3D71',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxPrc: {
    backgroundColor: '#FF8900',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchButton: {
    backgroundColor: '#76BA99',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textTouch: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contOutBtn: {
    gap: 30,
  },
  textOut: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textItem: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowBack: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Events;
