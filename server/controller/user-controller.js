import express from 'express';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const userSignup = async (req, res) => {
    try {
        const salt= await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json({
            message: 'User registered successfully',
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
        })
    }
}


export const userLogin = async (req, res)=>{
 try {
    const user = await User. findOne({username: req.body.username})    
    if(!user){
        return res.status(400).json({
            message: 'Invalid username',
        })
    }
    else{
        try {
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(validPassword){
            const accessToken = jwt.sign(user. toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '10m'})
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY, {expiresIn: '7d'})
            const newToken = new Token({ token: refreshToken})
            await newToken.save();
            return res.status(200).json({
                name: user.name,
                username: user.username,
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
            
            }else{
                return res.status(400).json({
                    message: 'Invalid password',
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error validating password',
            })
        }
    }
 } catch (error) {
    return res.status(500).json({
        message: 'Error Logging in user',
    })
 }
}