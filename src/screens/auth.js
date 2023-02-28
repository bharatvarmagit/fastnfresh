import { View, Text, Image, TextInput, Dimensions, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, userSlice } from '../redux/features/user'

const {width}= Dimensions.get('window')
const Auth = ({navigation}) => {

    const [id,setId]=useState('')
    const [password,setPassword]=useState('')
    const {principal,fetchingUser}=useSelector(state=>state.user)
    const dispatch = useDispatch()

    const onLogin=async()=>{
      if(id && password)
        dispatch(login(id,password,navigation))
    }

  return (
    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
      <Image
        source={require('../../assets/splash.png')}
        style={{width:width/1.5,height:width/1.5,marginTop:20,borderRadius:20}}
      />
      <TextInput
        autoFocus
        numberOfLines={1}
        style={{width:'70%',marginTop:20,borderRadius:10,backgroundColor:'gainsboro',height:45,paddingVertical:10,paddingTop:15,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black'}}
        placeholder='Id'
        value={id}
        autoCapitalize='none'
        autoCorrect={false}
        placeholderTextColor={'grey'}
        onChangeText={setId}
      />
      <TextInput
        style={{width:'70%',borderRadius:10,marginTop:20,backgroundColor:'gainsboro',height:45,paddingVertical:10,paddingTop:15,textAlign:'center',textAlignVertical:'center',fontSize:18,color:'black'}}
        placeholder='Password'
        value={password}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        textContentType={'password'}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={onLogin}>
      <Text style={styles.text}>Done</Text>
      {fetchingUser&&
      <ActivityIndicator size={'small'} color='white'/>
      }
    </Pressable>

    </View>
  )
}

export default Auth

const styles = StyleSheet.create({
   button: {
    // width:'20%',
    flexDirection:'row',
    alignItems: 'center',
    marginTop:20,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#588adb',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

