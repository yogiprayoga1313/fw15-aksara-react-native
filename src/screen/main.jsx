import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import TouchId from './auth/TouchId';
import Home from './Home';
import Profile from './Profile';
import Events from './Events';
import Booking from './Booking';
import Payment from './Payment';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import ManageEvent from './ManageEvent';
import {useSelector} from 'react-redux';
import ResetPassword from './auth/ResetPassword';

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
          <AuthStack.Screen
            options={{headerTitle: ''}}
            name="ResetPassword"
            component={ResetPassword}
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
