import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './auth/register';
import Login from './auth/login';
import ForgotPassword from './auth/forgotPassword';
import TouchId from './auth/touchId';
import Home from './home';
import Profile from './profile';
import Events from './events';
import Booking from './booking';
import Payment from './payment';
import EditProfile from './editProfile';
import ChangePassword from './changePassword';
import MyBooking from './myBooking';
import MyWishlist from './myWishlist';
import ManageEvent from './manageEvent';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator
          screenOptions={{
            headerShadowVisible: false,
          }}>
          <AuthStack.Screen
            options={{headerTitle: ''}}
            name="Register"
            component={Register}
          />
          <AuthStack.Screen
            options={{headerTitle: ''}}
            name="Login"
            component={Login}
          />
          <AuthStack.Screen
            options={{headerTitle: ''}}
            name="TouchId"
            component={TouchId}
          />
          <AuthStack.Screen
            options={{headerTitle: ''}}
            name="ForgotPassword"
            component={ForgotPassword}
          />
        </AuthStack.Navigator>
      )}
      {token && (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Events" component={Events} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="MyBooking" component={MyBooking} />
          <Stack.Screen name="MyWishlist" component={MyWishlist} />
          <Stack.Screen name="ManageEvent" component={ManageEvent} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Main;
