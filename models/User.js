import { fetchAPI } from '../models/api.js';
import { userSchema } from './schemas/userSchema.js';

export async function getUser(username)
{
    try{
        const requestUserString = "users?username="  + username;
        const user = await fetchAPI(req, requestUserString, "GET");
        return userSchema.parse(user);
    }
    catch (error)
    {
        console.error("error in getUser()", error);
        throw error("failed to getUser()");
    }


}