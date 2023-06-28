import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

const ManageEvent = () => {
  return (
    <ScrollView style={style.container}>
      <View style={style.contText}>
        <Text style={style.textEditMb}>Manage Event</Text>
      </View>
      <View style={style.contValue}>
        <TouchableOpacity style={style.month}>
          <View>
            <Text style={style.textMonth}>Create</Text>
          </View>
        </TouchableOpacity>
        <View style={style.contItemValue}>
          <View>
            <View style={style.contNoData}>
              <Text style={style.textNt}>No Tickets Bought</Text>
              <Text style={style.textDesc}>
                It appears you haven’t bought any tickets yet. Maybe try
                searching these?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  contItemValue: {
    gap: 40,
    marginTop: 80,
  },
  container: {
    backgroundColor: 'rgba(51, 102, 255, 1)',
  },
  contText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textEditMb: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contValue: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    gap: 50,
    height: 580,
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
