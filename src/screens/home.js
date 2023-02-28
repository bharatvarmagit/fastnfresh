import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';
import { lightBlue } from '../../assets/colors';
import {BottomSheet,ListItem,Button} from 'react-native-elements'
import {AntDesign} from '@expo/vector-icons'
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';


const Home = ({navigation}) => {

    const [location,setLocation] = useState({value:'NA'});
    const [showQr,setShowQr]= useState(false)
    const [isVisible,setIsVisible]=useState(false)
    const {colleges,principal} = useSelector(state=>state.user)
    console.log("principal ",principal)
    const list = colleges.map(c=>{return{label:c.name,value:c.id,color:lightBlue,...c}})
    const selectCollege = value =>{
        console.log("value = ",value)
        const obj = list.find(c=>c.value==value)
        setLocation(obj?obj:{value:'NA'})
        // setLocation()
    }

    const onScan=()=>{
        if(location.value=='NA')
            Toast.show({
                text1:'Select College',
                position:'bottom',
                type:'error'
            })
        else
        setShowQr(true)
    }
    const onHistory=()=>{
        if(location.value=='NA')
            Toast.show({
                text1:'Select College',
                position:'bottom',
                type:'error'
        })
        else
        navigation.navigate('History',{college:location})
    }
  return (
    <View style={{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#efefef'

    }}>
        {/* <View style={styles.agePickerContainer}> */}
       <Pressable style={styles.button} onPress={()=>{
                    setIsVisible(true)
                }}
                >
                <Text style={styles.text}>Select College</Text>
            </Pressable>
            {location.name&&
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:12}}>
             <Text style={{fontSize:20,color:lightBlue}}>{location.name}</Text>
                <AntDesign name="checkcircle" size={24} color={lightBlue} style={{left:5}} />
             </View>
            }

            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                >
                {colleges.map((l, i) => (
                    <ListItem key={l.id} containerStyle={{paddingBottom:50}}onPress={()=>{
                        setLocation(l)
                        setIsVisible(false)
                    }}>
                    <ListItem.Content style={{alignItems:'center'}}>
                        <ListItem.Title style={{color:lightBlue,fontSize:20,fontWeight:'600'}}>{l.name}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                ))}
                </BottomSheet>

        {showQr?
        <View style={{}}>
            <Image source={require('../../assets/qr_hid.jpeg')}
            resizeMode='contain'
             style={{width:200,height:100,marginTop:50}}
            />
            <Image source={require('../../assets/qr_pair.jpeg')}
            resizeMode='contain'
             style={{width:200,height:100,marginTop:50,marginBottom:50}}
            />
            <Pressable style={styles.button} onPress={()=>{
                    setShowQr(false)
                    navigation.navigate('ScanItems',{college:location})
                }}
                >
                <Text style={styles.text}>Start Scanning</Text>
            </Pressable>
            <Pressable style={{...styles.button,backgroundColor:'tomato'}} onPress={()=>setShowQr(false)}>
                <Text style={styles.text}>Cancel</Text>
            </Pressable>

        </View>

        :
        <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
        <Pressable style={{marginTop:50}} onPress={onScan}>
            <LottieView
                autoPlay
                style={{
                width: 75,
                height: 75,
                backgroundColor: 'transparent',
                ...styles.lottie
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/animation/qrScan.json')}
            />
            <Text style={{alignSelf:'center',top:10,fontSize:20,fontWeight:'700',color:lightBlue}}>SCAN</Text>
        </Pressable>
        {principal.permissions.includes('OUT')&&
        <Pressable style={{marginTop:50}} onPress={onHistory}>
            <LottieView
                autoPlay
                style={{
                width: 100,
                height: 100,
                backgroundColor: 'transparent',
                ...styles.lottie
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/animation/history.json')}
            />
            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'700',color:lightBlue}}>DATA</Text>
        </Pressable>
        }
        </View>
        }
    </View>
  )
}

export default Home

const styles= StyleSheet.create({
    lottie:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    agePickerContainer:{
        marginHorizontal:'15%',
        marginTop:'8%',
        width:'100%',
        fontSize:15,
        alignSelf:'center'
    },
    button:{
        alignItems: 'center',
        marginTop:20,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#588adb'
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})
