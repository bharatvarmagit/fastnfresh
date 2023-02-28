import { View, Text, FlatList, Dimensions, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { changeDelivered, getHistory } from '../redux/features/user'
import dateFormat from 'dateformat'
import { lightBlue } from '../../assets/colors'
import { useSelector } from 'react-redux'
import {CheckBox} from 'react-native-elements'

const {width}=Dimensions.get('window')
const History = ({navigation,route}) => {
  const {college}= route.params
  const {principal} = useSelector(state=>state.user)

  const [data,setData]=useState([])

  useEffect(()=>{
    getData()
    navigation.setOptions({title:college.name})
  },[])

  const getData=async()=>{
    const response = await getHistory(college)
    console.log("history\n",response)
    setData(response)
  }

  return (
    <View style={{flex:1,justifyContent:data.length?'flex-start':'center',alignItems:'center'}}>
      {
        data.length?
        <FlatList
        data={data.sort((a,b)=>b.timestamp.getTime()-a.timestamp.getTime())}
        ListHeaderComponent={
          <View style={{ width:width,alignSelf:'center', padding:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'white',marginTop:1}}>
            <Text style={styles.heading}>User ID</Text>
            <Text style={styles.heading}># Items</Text>
            <Text style={styles.heading}>Timestamp</Text>
            <Text style={styles.heading}>Delivered</Text>
          </View>
        }
        keyExtractor={item=>item.id}
        renderItem={({item})=>
          <Pressable style={{ width:width,alignSelf:'center', padding:12,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'white',marginTop:1}}
            onPress={()=>{
              if(principal.admin)
                navigation.navigate('ScanItems',{data:item.data,college,id:item.id,warehouseData:item.warehouseData})
            }}
          >
            <Text style={styles.entry}>{item.userId}</Text>
            <Text style={styles.entry}>{Object.values(item.data).reduce((prev,cur)=>prev+cur)} items </Text>
            <View style={{alignItems:'center'}}>
              <Text style={styles.entry}>{dateFormat(item.timestamp, "dd/mm/yyyy")}</Text>
              <Text style={styles.entry}>{dateFormat(item.timestamp, "h:MM TT")}</Text>
            </View>
            <CheckBox
              disabled={item.userId!==principal.id && !principal.admin}
              onPress={async ()=>{
                let dat = [...data]
                dat.forEach(d=>{
                  if(d.id===item.id){
                    if(d.delivered){
                      d.delivered=false
                      changeDelivered(d.id,false).then(console.log("changed"))
                    }
                    else{
                      d.delivered=true
                      changeDelivered(d.id,true).then(console.log("changed"))
                    }
                  }
                })
                setData(dat)
              }}
              checked={item.delivered}
            />
          </Pressable>
        }

        />
        :
        <Text style={{color:'tomato',fontSize:20,fontWeight:'700'}}>No Records Found</Text>
      }
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  heading:{
    fontSize:16,
    fontWeight:'bold',
    color:'black'
  },
  entry:{
    fontSize:16,
    fontWeight:'500',
    color:lightBlue
  }
})
