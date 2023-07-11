import {Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import TouchId from './auth/TouchId';
import Home from './Home';
import Profile from './Profile';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import ManageEvent from './ManageEvent';
import {useDispatch, useSelector} from 'react-redux';
import ResetPassword from './auth/ResetPassword';
import {createDrawerNavigator, drawerContent} from '@react-navigation/drawer';
import Setting from './Setting';
import {logout as logoutAction} from '../redux/reducers/auth';
import ProfileDrawer from '../components/ProfileDrawer';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  const dispatch = useDispatch();
  const DoLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: 300},
      }}>
      {/* drawerContent={props => <ProfileDrawer {...props} />}> */}
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="My Booking" component={MyBooking} />
      <Drawer.Screen name="My Wishlist" component={MyWishlist} />
      <Drawer.Screen name="Manage Events" component={ManageEvent} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen
        name="Logout"
        component={DoLogout}
        options={{
          drawerLabel: () => (
            <Text style={{color: 'red', fontWeight: 'bold'}}>Logout</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

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
        <>
          <MyDrawer />
        </>
      )}
    </NavigationContainer>
  );
};

export default Main;
