import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from '../features/user'

const persistConfig={
  key:'root',
  version:1,
  storage:AsyncStorage,
  whitelist:['user']
}

const reducer = combineReducers({
  // here we will be adding reducers
  user
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store=configureStore({
  reducer:persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

// const clearAsyncStorage = async () => {
// 	await AsyncStorage.clear();
// }
// // clearAsyncStorage()

export default store;
