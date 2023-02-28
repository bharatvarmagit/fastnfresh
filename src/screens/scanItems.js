import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import  Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { lightBlue } from '../../assets/colors';
import { addData, addWarehouseData } from '../redux/features/user';
// import { DataTable } from 'react-native-paper';


export default function ScanItems({navigation,route}) {
  const {principal} = useSelector(state=>state.user)
  const [input,setInput] = useState('')
  const {college,data,id,warehouseData} =route.params
  console.log("college ",college)
  const initialEntries = warehouseData?warehouseData:{}
  if(data && !warehouseData)
  Object.keys(data).forEach(key=>{
    initialEntries[key]=0
  })
  const [entries,setEntries] = useState(initialEntries)
  const inputRef = useRef()
  const [done,setDone] = useState()
  const dispatch = useDispatch()

  useEffect(() => {122
    console.log("entries = ",entries)
    // dispatch()
  }, [entries])

  const handleInput = val =>{

    const last = val.charAt(val.length-1)
    if(last==='\r'||last==='\n'){
      if(val.length<2)return
      let newEntries={...entries}
      setInput('')
      Toast.show({
        type: 'success',
        text1: 'Item Scanned',
        position:'bottom',
        autoHide:true,
        visibilityTime:500

      });
      val=val.slice(0,-1)
      if(isNaN(val)){
        Toast.show({
          type: 'error',
          text1: 'only numbers allowed',
          position:'bottom',
          autoHide:true,
          visibilityTime:1000
        });
        return
      }
      if(parseInt(val)<=college.lowerLimit||parseInt(val)>=college.upperLimit){
        Toast.show({
          type: 'error',
          text1: 'QR not in range',
          position:'bottom',
          autoHide:true,
          visibilityTime:1000
        });
        return
      }
      if(val in newEntries){
        newEntries[val]=newEntries[val]+1
      }
      else{
        newEntries[val]=1
      }
      setEntries(newEntries)
      // inputRef.current?.focus()
    }
    else{
      setInput(val)
    }

  }

  const onDone=()=>{
    if(!Object.keys(entries).length)
     Toast.show({
      type:'error',
      position:'bottom',
      text1:'0 Items Scanned'
     })

    Alert.alert(
      'Alert', 'Finshed scanning?',
      [
        {
          text: 'Yes',
          onPress: async() => {
            if(!data)
            addData(principal.id,entries,college,navigation)
            else{
             await addWarehouseData(id,entries)
             navigation.pop(2)
            }
          }

          ,isPreferred:true,style:'default'

        },
        {text: 'Cancel', onPress: () => console.log('OK button clicked'),style:'destructive'},
      ],
      {
        cancelable: false
      }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!warehouseData&&
      <View style={{marginHorizontal:20,justifyContent:'space-between',alignSelf:'center',alignItems:'center',flexDirection:'row'}}>
        <TextInput
          autoCapitalize='none'
          autoFocus
          multiline={true}
          numberOfLines={1}
          style={{width:'70%',borderRadius:10,backgroundColor:'gainsboro',height:45,paddingVertical:10,paddingTop:15,textAlign:'center',textAlignVertical:'center',fontSize:18}}
          ref={inputRef}
          placeholder='SCAN QR CODE'
          value={input}
          placeholderTextColor={'grey'}
          onChangeText={handleInput}
        />
        <Pressable style={styles.button} onPress={onDone}>
          <Text style={styles.text}>Done</Text>
        </Pressable>
      </View>
      }
      {data && Object.keys(data).length?
      <ScrollView style={{flex:1,marginTop:20,width:'100%'}}>
        <View style={{width:'100%',padding:10,justifyContent:'space-between',alignSelf:'center',alignItems:'center',flexDirection:'row',borderBottomWidth:0.2,paddingTop:20,paddingHorizontal:10}}>
          <Text style={{fontSize:15,fontWeight:'bold'}}>QR code</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>Campus</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>warehouse</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>Missing</Text>
          <Text style={{fontSize:15,fontWeight:'bold'}}>Extra</Text>
        </View>
       {Object.entries(data).map(entry=>
        <View key={entry[0]} style={{width:'100%',padding:10,justifyContent:'space-between',alignSelf:'center',alignItems:'center',flexDirection:'row',borderBottomWidth:0.2,paddingTop:20,paddingHorizontal:10}}>
          <Text style={{fontSize:15}}>{entry[0]}</Text>
          <Text style={{fontSize:15}}>{entry[1]} </Text>
          <Text style={{fontSize:15}}>{entries[entry[0]]} </Text>
          <Text style={{fontSize:15}}>{entry[1]-entries[entry[0]]>0?entry[1]-entries[entry[0]]:0}</Text>
          <Text style={{fontSize:15}}>{entries[entry[0]]-entry[1]>0?entries[entry[0]]-entry[1]:0}</Text>
        </View>
      )
      }
      </ScrollView>:
      <ScrollView style={{flex:1,marginTop:20,width:'100%'}}>
        <View style={{padding:10,width:'90%',justifyContent:'space-between',alignSelf:'center',alignItems:'center',flexDirection:'row',borderBottomWidth:0.2,paddingTop:20,paddingHorizontal:10}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>QR CODE</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>COUNT</Text>

        </View>
      {Object.entries(entries).map(entry=>
        <View key={entry[0]} style={{padding:10,width:'90%',justifyContent:'space-between',alignSelf:'center',alignItems:'center',flexDirection:'row',borderBottomWidth:0.2,paddingTop:20,paddingHorizontal:10}}>
          <Text style={{fontSize:20}}>{entry[0]}</Text>
          <Text style={{fontSize:20}}>{entry[1]}</Text>
        </View>
      )
      }
      { Object.keys(entries).length?
        <View style={{padding:10,width:'90%',justifyContent:'space-between',alignSelf:'center',alignItems:'center',flexDirection:'row',marginTop:40,borderWidth:2,borderColor:lightBlue,padding:10}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:lightBlue}}>{Object.keys(entries).length}</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{Object.values(entries).length?Object.values(entries).reduce((prev,cur)=>prev+cur):0}</Text>
        </View>:
            <Text style={{alignSelf:'center',fontSize:20,color:'maroon',marginTop:20}}>No items scanned</Text>
        }
      </ScrollView>
      }



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
   button: {
    // width:'20%',
    alignItems: 'center',

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
