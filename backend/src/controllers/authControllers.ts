import express from "express";
import mongoose from "mongoose";
import Users from "../models/Users.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const maxAge =  60 * 5 // = 5 minutes

const handleErrors = (err: any) => {
  let errors: any = {};
  // duplicate errors
  if (err.code && err.code === 11000) {
    Object.keys(err.errorResponse.keyPattern).forEach(key => 
      errors[key] = `this ${key} is already registered`
    )
  }
  // validation errors
  if (
    err instanceof mongoose.Error.ValidationError &&
    err.message.includes("Users validation failed")
  ) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }
  return errors;
};

const createToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({id}, process.env.JWT_SECRET_KEY!, {
    expiresIn: maxAge
  })
}
 
export default {
  signup_post: async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
      const newUser = await Users.create({
        email: email,
        password: password,
      });
      await newUser.save();
      const token = createToken(newUser._id)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: newUser._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).send({ errors: errors });
    }
  },
  login_post: async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
  },
};
