import {createNativeStackNavigator } from '@react-navigation/native-stack'
import{NavigationContainer} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScanItems from '../screens/scanItems';
import { useEffect, useState } from 'react';
import Auth from '../screens/auth';
import Home from '../screens/home'
import History from '../screens/history'
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { getColleges } from '../redux/features/user';
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

function MyStack() {

  const {principal,colleges} = useSelector(state=>state.user)
  const dispatch=useDispatch()


  useEffect(()=>{
    dispatch(getColleges())
  },[])

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={principal.id?'Home':'Auth'}>
        <Stack.Screen name="ScanItems" component={ScanItems}  options={{headerTitle:'SCAN ITEMS',headerLeftLabelVisible:false}}/>
        <Stack.Screen name="Auth" component={Auth} options={{headerTitle:'Login'}}/>
        {/* <Stack.Screen name='Admin' component={Admin} */}
        <Stack.Screen name="Home" component={Home} options={{headerLeft:null}}/>
        <Stack.Screen name="History" component={History} options={{headerLeftLabelVisible:false}}/>
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>

  );
}
export default MyStack
