import { combineReducers } from 'redux';
import {
    LOGIN_RESULT,
    LOGOUT,
    CREATE_USER,
    FETCH_USERS,
    FETCH_ROOMS,
    FETCH_CHAT,
    ADD_MESSAGE_TO_CHAT,
    UPDATE_STATUS_MESSAGE,
    LOGIN_FROM_CACHE,
    INIT_PREPROCESS,
    USER_CLEAR_ERROR_MESSAGE,
} from '../actions/types';

const userReducer = (
    state = { isLoggedIn: false, errorMessage: '' },
    action
) => {
    switch (action.type) {
        case LOGIN_FROM_CACHE:
            return {
                isLoggedIn: true,
                errorMessage: '',
                ...action.payload.user,
            };

        case LOGIN_RESULT:
            if (action.payload.code === 1) {
                //set token, stay connected even after the browser refresh
                localStorage.setItem('TOKEN', action.payload.user.token);

                //return user result + mark isLoggedIn = true
                return {
                    isLoggedIn: true,
                    errorMessage: '',
                    ...action.payload.user,
                };
            } else
                return {
                    isLoggedIn: false,
                    errorMessage: action.payload.errorMessage,
                };

        case LOGOUT:
            localStorage.removeItem('TOKEN');
            return { isLoggedIn: false, errorMessage: '' };

        case CREATE_USER:
            if (action.payload.code === 1) {
                //set token, stay connected even after the browser refresh
                localStorage.setItem('TOKEN', action.payload.user.token);

                return {
                    isLoggedIn: true,
                    errorMessage: '',
                    ...action.payload.user,
                };
            } else
                return {
                    isLoggedIn: false,
                    errorMessage: action.payload.errorMessage,
                };

        case USER_CLEAR_ERROR_MESSAGE:
            return { ...state, errorMessage: '' };

        default:
            return state;
    }
};

const preProcessReducer = (state = false, action) => {
    if (action.type !== INIT_PREPROCESS) return state;

    //notify the pre-process completed successfully
    return true;
};

const usersManagmentReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            if (action.payload.code === 1) return action.payload.users;
            else return [];

        default:
            return state;
    }
};

const roomsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ROOMS:
            if (action.payload.code === 1) return action.payload.rooms;
            else return [];

        default:
            return state;
    }
};

const chatReducer = (state = { roomId: null, errorMessage: '' }, action) => {
    switch (action.type) {
        case FETCH_CHAT:
            const payload = action.payload;

            if (payload.code === 1) {
                return {
                    ...state,
                    ...payload.rooms[0],
                    roomId: payload.rooms[0]._id,
                    errorMessage: '',
                };
            } else {
                return { errorMessage: payload.errorMessage, roomId: null };
            }

        case ADD_MESSAGE_TO_CHAT:
            const messageObject = action.payload;
            return { ...state, ...state.chats.push(messageObject) };

        case UPDATE_STATUS_MESSAGE:
            const updateStatusObject = action.payload;

            let newObject = { ...state };
            let currentChat = newObject.chats.find(
                (q) => q.messageId === updateStatusObject.messageId
            );

            //update status message
            if (currentChat !== undefined)
                currentChat.statusMessage = updateStatusObject.statusMessage;

            return newObject;
        default:
            return state;
    }
};

export default combineReducers({
    user: userReducer,
    preProcess: preProcessReducer,
    usersManagment: usersManagmentReducer,
    rooms: roomsReducer,
    chat: chatReducer,
});
