import {createSlice} from '@reduxjs/toolkit'
import db from '../../config/firebase'
import 'firebase/firestore'
import 'firebase/app'
import  Toast from 'react-native-toast-message';

import { collection, query,addDoc, setDoc,doc , getDoc, where, getDocs,serverTimestamp} from "firebase/firestore";


const initialState={
    principal:{
        id:null,
        permissions:[],
    },
    fetchingUser:false,
    fetchingColleges:false,
    colleges:[]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setFetchingUser:(state,action)=>{
            state.fetchingUser=action.payload
        },
        setFetchingColleges:(state,action)=>{
            state.fetchingColleges=action.payload
        },
        setPrincipal:(state,action)=>{
            state.principal=action.payload
        },
        setColleges:(state,action)=>{
            state.colleges=action.payload
        }
    }
})

export default userSlice.reducer;

const {setColleges, setPrincipal,setFetchingColleges,setFetchingUser} = userSlice.actions;

export const addData= async(userId,data,college,navigation)=>{
    try {
        const timestamp=serverTimestamp()
        const q = await addDoc(collection(db,'data'),{
            data,
            collegeId:college.id,
            timestamp,
            userId,
        })
        if(q.id){
            Toast.show({
                position:'bottom',
                text1:"Uploaded to "+college.name,
                type:'success'
            })
        }
        navigation.goBack()
    } catch (error) {
        console.log("error",error)
    }
}

export const addWarehouseData = async (id,warehouseData)=>{
    const dataRef = doc(db,'data',id);
    await setDoc(dataRef,{warehouseData},{merge:true})
    Toast.show({
        position:'bottom',
        text1:"warehouse data saved",
        type:'success'
    })
}

export const changeDelivered =async (id, delivered) =>{
    const dataRef = doc(db, 'data', id);
    await setDoc(dataRef, { delivered: delivered }, { merge: true })
}

export const getHistory=async college =>{
    const result=[]
    const q = query(collection(db,'data'),where("collegeId",'==',college.id));
    const snapshot = await getDocs(q)
    if(snapshot.empty)console.log("history empty")
    snapshot.forEach(doc=>{
        let data = doc.data()
        data.timestamp=data.timestamp.toDate()
        data.id=doc.id
        result.push(data)
    })
    return result
}

export const login=(id,password,navigation)=>async (dispatch,getState)=>{
    let isValid=false
    dispatch(setFetchingUser(true))
    const q = query(collection(db,'users'),where("id",'==',id),where('password','==',password));
    const snap = await getDocs(q);
    if(snap.empty){
        Toast.show({
            position:'bottom',
            type:'error',
            text1:'Invalid Credentials'
        })
    }
    else{
        console.log("user present")
        snap.forEach(doc=>{
            dispatch(setPrincipal(doc.data()))
        })
        isValid=true
    }
    dispatch(setFetchingUser(false))
    if(navigation && isValid){
        navigation.navigate('Home')
    }

}

export const getColleges=()=>async dispatch=>{
    dispatch(setFetchingColleges(true))
    let colleges=[]
    const snapshot = await getDocs(collection(db,'colleges'))
    snapshot.forEach(doc=>{
        colleges.push(doc.data())
    })
    dispatch(setColleges(colleges))
    dispatch(setFetchingColleges(false))
}
