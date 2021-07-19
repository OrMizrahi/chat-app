import {getUserByToken} from './api'
export const preProcessVerifyToken = async () => {
    const TOKEN_KEY = 'TOKEN';
    let result = {};

    //check if login token exist
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return result;
 
        //lets verify token
        const userResult = await getUserByToken(token);

        //token invalid, lets remove the token
        if (!(userResult && userResult.code === 1 && userResult.user))  localStorage.removeItem(TOKEN_KEY);
        //token valid
        else  result = userResult;
          
        //return user object
        return result;
};