import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import IconPass from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';

const Booking = ({route, navigation}) => {
  const {id} = route.params;
  const token = useSelector(state => state.auth.token);
  const [sections, setSections] = React.useState([]);
  const [filledSection, setFilledSection] = React.useState({
    id: 0,
    quantity: 0,
  });

  React.useEffect(() => {
    const getSections = async () => {
      try {
        const {data} = await http(token).get('/section');
        setSections(data.results);
      } catch (error) {
        console.log('Error', error);
      }
    };
    getSections();
  }, [token]);

  const increment = id => {
    if (filledSection.quantity >= 5) {
      setFilledSection({id, quantity: 5});
    } else {
      setFilledSection({id, quantity: filledSection.quantity + 1});
    }
  };
  const decrement = id => {
    if (filledSection.quantity <= 0) {
      setFilledSection({id, quantity: 0});
    } else {
      setFilledSection({id, quantity: filledSection.quantity - 1});
    }
  };

  const doReservation = async () => {
    try {
      const form = new URLSearchParams({
        eventId: id,
        sectionId: filledSection.id,
        quantity: filledSection.quantity,
      }).toString();
      const {data} = await http(token).post('/reservations', form);
      console.log(data);
      navigation.navigate('Payment', {
        state: {
          id,
          eventName: data.results.events.title,
          reservationId: data.results.id,
          sectionName: data.results.sectionName,
          quantity: data.results.quantity,
          totalPayment: data.results.totalPrice,
        },
        replace: true,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const selectedSection =
    filledSection && sections.filter(item => item.id === filledSection.id)[0];
  return (
    <View style={style.container}>
      <View style={style.contCheck}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.chechText}>Checkout</Text>
      </View>
      <ScrollView style={style.scrolView}>
        <View style={style.containerOne}>
          <View style={style.contPrice}>
            <View style={style.sectCont}>
              <Text style={style.cardText}>No Card</Text>
            </View>
            <View style={style.contOut}>
              <View style={style.contOne}>
                <Text style={style.textTic}>Tickets</Text>
                <View>
                  <Text style={style.textTic2}>BY PRICE</Text>
                </View>
                <View />
              </View>
              {sections.map(item => (
                <View key={`section-select-${item.id}`} style={style.contItem}>
                  <View style={style.contIcon} />
                  <View style={style.contSect}>
                    <View>
                      <Text style={style.textSect}>SECTION {item.name}</Text>
                      <Text style={style.contSeat}>12 Seats available</Text>
                    </View>
                    <Text style={style.contQuty}>Quantity</Text>
                  </View>
                  <View style={style.contPriceOut}>
                    <View style={style.priceOut}>
                      <Text style={style.textSect}>{item.price}</Text>
                      <Text>per person</Text>
                    </View>
                    <View style={style.count}>
                      <TouchableOpacity
                        style={style.countMin}
                        onPress={() => decrement(item.id)}>
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text style={style.textCount}>
                        {item.id === filledSection.id
                          ? filledSection.quantity
                          : 0}
                      </Text>
                      <TouchableOpacity
                        onPress={() => increment(item.id)}
                        style={style.countMin}>
                        <Text>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={style.checkOut}>
            <View>
              <View style={style.results}>
                <Text style={style.reslutsText}>
                  {selectedSection?.name || '-'}
                </Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>{filledSection?.quantity}</Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>
                  IDR {selectedSection?.price * filledSection?.quantity || '0'}
                </Text>
              </View>
              <View style={style.getOwnCont}>
                <Text style={style.getOwn}>Get now on Urticket</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={doReservation}
              style={style.touchCheckOut}>
              <Text style={style.textCheckout}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#76BA99',
  },
  scrolView: {
    marginBottom: 50,
    // height: '100%',
  },
  containerOne: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    justifyContent: 'center',
  },
  contPrice: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  chechText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 90,
  },
  contCheck: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 30,
  },
  sectCont: {
    width: '100%',
    height: 210,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 30,
  },
  cardText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 26,
  },
  contOut: {
    paddingVertical: 20,
    gap: 15,
  },
  contOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  textTic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  textTic2: {
    color: 'red',
    fontWeight: 'semibold',
  },
  contItem: {
    flexDirection: 'row',
    gap: 14,
  },
  contIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#F1EAFF',
    borderRadius: 10,
  },
  contIcon2: {
    width: 45,
    height: 45,
    backgroundColor: '#FFEAEF',
    borderRadius: 10,
  },
  textSect: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  contSect: {
    gap: 10,
  },
  contSeat: {
    opacity: 0.7,
  },
  contQuty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  contPriceOut: {
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 10,
  },
  priceOut: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  count: {
    flexDirection: 'row',
    gap: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countMin: {
    width: 33,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkOut: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    gap: 30,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 7,
    marginBottom: 50,
  },
  results: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reslutsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: '#76BA99',
    width: 130,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  getOwn: {
    fontSize: 12,
  },
  getOwnCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Booking;
