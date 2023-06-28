import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Booking = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.contCheck}>
        <Text style={style.chechText}>Checkout</Text>
      </View>
      <View>
        <View style={style.containerOne}>
          <View style={style.contPrice}>
            <View style={style.sectCont}>
              <Text>foto</Text>
            </View>
            <View style={style.contOut}>
              <View style={style.contOne}>
                <Text style={style.textTic}>Tickets</Text>
                <View>
                  <Text style={style.textTic2}>BY PRICE</Text>
                </View>
                <View />
              </View>
              <View style={style.contItem}>
                <View style={style.contIcon} />
                <View style={style.contSect}>
                  <View>
                    <Text style={style.textSect}>SECTION REG, ROW 1</Text>
                    <Text style={style.contSeat}>12 Seats available</Text>
                  </View>
                  <Text style={style.contQuty}>Quantity</Text>
                </View>
                <View style={style.contPriceOut}>
                  <View style={style.priceOut}>
                    <Text style={style.textSect}>$15</Text>
                    <Text>per person</Text>
                  </View>
                  <View style={style.count}>
                    <TouchableOpacity style={style.countMin}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={style.textCount}>0</Text>
                    <TouchableOpacity style={style.countMin}>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={style.contItem}>
                <View style={style.contIcon2} />
                <View style={style.contSect}>
                  <View>
                    <Text style={style.textSect}>SECTION REG, ROW 1</Text>
                    <Text style={style.contSeat}>12 Seats available</Text>
                  </View>
                  <Text style={style.contQuty}>Quantity</Text>
                </View>
                <View style={style.contPriceOut}>
                  <View style={style.priceOut}>
                    <Text style={style.textSect}>$15</Text>
                    <Text>per person</Text>
                  </View>
                  <View style={style.count}>
                    <TouchableOpacity style={style.countMin}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={style.textCount}>0</Text>
                    <TouchableOpacity style={style.countMin}>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={style.checkOut}>
            <View>
              <View style={style.results}>
                <Text style={style.reslutsText}>VIP</Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>2</Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>$70</Text>
              </View>
              <View style={style.getOwnCont}>
                <Text style={style.getOwn}>Get now on Urticket</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment')}
              style={style.touchCheckOut}>
              <Text style={style.textCheckout}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#3366FF',
  },
  containerOne: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  },
  contCheck: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
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
    gap: 25,
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
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reslutsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: 'blue',
    width: 169,
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
