import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/screen/home';
import Profile from './src/screen/profile';
import Register from './src/screen/auth/register';
import Login from './src/screen/auth/login';
import ForgotPassword from './src/screen/auth/forgotPassword';
import TouchId from './src/screen/auth/touchId';
import Events from './src/screen/events';
import Booking from './src/screen/booking';
import Payment from './src/screen/payment';
import EditProfile from './src/screen/editProfile';
import ChangePassword from './src/screen/changePassword';
import MyBooking from './src/screen/myBooking';
import MyWishlist from './src/screen/myWishlist';
import ManageEvent from './src/screen/manageEvent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TouchId" component={TouchId} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
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
    </NavigationContainer>
  );
};

export default App;
