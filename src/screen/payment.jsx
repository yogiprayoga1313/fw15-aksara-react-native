import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IconCard from 'react-native-vector-icons/FontAwesome';
import House from 'react-native-vector-icons/MaterialIcons';
import IconPass from 'react-native-vector-icons/Feather';
import {Button, RadioButton} from 'react-native-paper';

const Payment = () => {
  const [gender, setGender] = React.useState('0');

  const handleRadioPress = value => {
    setGender(value);
  };
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.contCheck}>
        <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
          <IconPass name="arrow-left" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.chechText}>Payment</Text>
      </View>
      <View style={style.containerOne}>
        <View style={style.contPrice}>
          <View style={style.contOut}>
            <View>
              <Text style={style.textPayment}>Payment method</Text>
            </View>
            <View style={style.contCard}>
              <RadioButton.Android name="gender" value="0" />
              <View />
              <View style={style.iconCard}>
                <IconCard
                  name="credit-card-alt"
                  size={20}
                  color="rgba(136, 77, 255, 1)"
                />
              </View>
              <View>
                <Text style={style.textIcon}>Card</Text>
              </View>
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
              <TouchableOpacity style={style.plusCont}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={style.cardPayment}>
            <View style={style.contCard}>
              <RadioButton.Android name="gender" value="0" />
              <View />
              <View style={style.iconCard2}>
                <IconCard name="bank" size={20} color="rgba(252, 16, 85, 1)" />
              </View>
              <View>
                <Text style={style.textIcon}>Bank Transfer</Text>
              </View>
            </View>
            <View style={style.contCard}>
              <RadioButton.Android name="gender" value="0" />
              <View />
              <View style={style.iconCard3}>
                <House name="house" size={20} color="rgba(255, 137, 0, 1)" />
              </View>
              <View>
                <Text style={style.textIcon}>Retail</Text>
              </View>
            </View>
            <View style={style.contCard}>
              <RadioButton.Android name="gender" value="0" />
              <View />
              <View style={style.iconCard4}>
                <IconCard
                  name="dollar"
                  size={20}
                  color="rgba(51, 102, 255, 1)"
                />
              </View>
              <View>
                <Text style={style.textIcon}>E-Money</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={style.checkOut}>
          <View>
            <View style={style.results}>
              <Text style={style.reslutsText}>Total Payment</Text>
            </View>
            <View style={style.getOwnCont}>
              <Text style={style.getOwn}>$70</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Payment')}
            style={style.touchCheckOut}>
            <Text style={style.textCheckout}>Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  CardCountain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contCheck: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 30,
  },
  plusCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 20,
  },
  cardPayment: {
    gap: 10,
    marginBottom: 20,
  },
  cardOutput: {
    width: 288,
    height: 172,
    backgroundColor: '#FFA000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  textPayment: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  contCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  iconCard: {
    backgroundColor: 'rgba(136, 77, 255, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCard2: {
    backgroundColor: 'rgba(252, 16, 85, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCard3: {
    backgroundColor: 'rgba(255, 137, 0, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCard4: {
    backgroundColor: 'rgba(51, 102, 255, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIcon: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  container: {
    backgroundColor: '#76BA99',
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
    paddingTop: 40,
    paddingHorizontal: 30,
    gap: 20,
  },
  chechText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 90,
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
    paddingVertical: 10,
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
    gap: 35,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  results: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reslutsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: '#76BA99',
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
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  getOwnCont: {
    justifyContent: 'flex-start',
  },
});
export default Payment;
