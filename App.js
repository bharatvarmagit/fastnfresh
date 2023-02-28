// import { useEffect } from 'react'
// import 'firebase/firestore'
// import MyStack from './src/routes/stack'
// import store from "./src/redux/store";
// import { Provider } from "react-redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/es/integration/react";
import { Text, View } from 'react-native';

export default function App(){
  // const persistedStore = persistStore(store);
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'c'}}>
      <Text>my app</Text>
    </View>
    // <Provider store={store}>
    //   <PersistGate persistor={persistedStore} >
    //     <MyStack/>
    //   </PersistGate>
    // </Provider>
  )
}
