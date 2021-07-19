import _ from 'lodash';
import { login, createRoom, createUser, getUsers, deleteUser, getRooms } from '../../api'
import { preProcessVerifyToken } from '../../preProcessHelper'
import { LOGIN_RESULT,LOGOUT,CREATE_USER,FETCH_USERS,FETCH_ROOMS,FETCH_CHAT,ADD_MESSAGE_TO_CHAT,UPDATE_STATUS_MESSAGE,LOGIN_FROM_CACHE,INIT_PREPROCESS,USER_CLEAR_ERROR_MESSAGE  } from "./types";

export const doLogin = (userName, password) => async (dispatch) => {
    const loginResult = await login(userName, password);
    return dispatch({ type: LOGIN_RESULT, payload: loginResult })
};

export const doLogout = () => ({type: LOGOUT});
export const clearUserErrorMessage = () => ({ type: USER_CLEAR_ERROR_MESSAGE});
 


export const doCreateUser = (user) => async (dispatch) => {
    const userResult = await createUser(user);
    return dispatch({ type: CREATE_USER, payload: userResult })
};


export const doDeleteUser = (token,userId) => async (dispatch) => {
    await deleteUser(token,userId);
    //re render users
    return fetchUsers(token)(dispatch);
    //return dispatch({ type: 'DELETE_USER', payload: result })
};


export const doCreateRoom = (token,roomName) => async (dispatch) => {
    await createRoom(token,roomName);
     //re render roooms
     return fetchRooms()(dispatch);
 };


export const fetchUsers = (token,query={}) => async (dispatch) => {
    const result = await getUsers(token,query);
    return dispatch({ type: FETCH_USERS, payload: result })
};
 
export const fetchRooms = (query={}) => async (dispatch) => {
    const result = await getRooms(query);
    return dispatch({ type: FETCH_ROOMS, payload: result })
};


//chat section


export const fetchChat = (roomId) => async (dispatch) => {
    const query = { _id: roomId};
    let result = await getRooms(query);

   if (_.isEmpty(result.rooms)) {
       result.code=0;
       result.errorMessage=`Room ID = ${roomId}, not founded`; 
   }
   return dispatch({ type: FETCH_CHAT, payload: result });

};


export const addMessageToChat = (messageObject) => (dispatch) => {
   
    if (messageObject.sentTime===undefined) messageObject.sentTime= new Date().toDateString();

    return dispatch({ type: ADD_MESSAGE_TO_CHAT, payload: messageObject });

};


export const updateStatusMessage = (updateMessageObject) => 
  { return { type: UPDATE_STATUS_MESSAGE, payload: updateMessageObject } };




//pre process
export const initPreProcess = () => async (dispatch) => {
    //Create Logic Of PreProcess

    //Check for token and ifso make a Login
    const userResult = await preProcessVerifyToken();
    if (!_.isEmpty(userResult)) dispatch({ type: LOGIN_FROM_CACHE, payload: userResult});

    //notify that InitProcess Done
    return dispatch({ type: INIT_PREPROCESS });
};
