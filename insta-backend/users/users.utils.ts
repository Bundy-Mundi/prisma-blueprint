require("dotenv").config();
import { User } from "@prisma/client";
import jwt from "jsonwebtoken"
import client from "../client";
import { JWType } from "./users.types";

export const secret = process.env.SECRET || 'secret';

export const getUser = async(token: string) => {
    try {
        if(!token)
            return null;
        const { id } = <JWType>await jwt.verify(token, secret);
        const user = await client.user.findUnique({where:{id}});
        if (user)
            return user;
        else 
            return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const isLoggedIn = (currentUser: User) => {
    if(!currentUser)
        throw new Error("No user logged in. Check the token.");
}

export const checkUndefined = (arr: Array<any>): boolean => {
    for(let item of arr){
        if(typeof item !== undefined)
            return false;
    }
    return true;
}

export const checkNull = (arr: Array<any>): boolean => {
    for(let item of arr){
        if(typeof item === null)
            return true;
    }
    return false;
}

export const checkType = (arr: Array<any>, type: string): boolean => {
    for(let item of arr){
        if(typeof item !== type)
            return false;
    }
    return true;
}

export const removeWhitespaces = (str: string | undefined) => {
    if(typeof str === 'string')
        return str.trim().replace(/\s/g, '');
    return undefined;
};