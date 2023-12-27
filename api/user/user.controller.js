import { gql } from "apollo-server-express";
import UserService from "./user.service.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config.js";
import { loginSchema, registerUserSchema } from "./userValidationSchema.js";

const userService = new UserService();


const userTypeDefs = gql`
  scalar DateTime

  type Query {
    users: [User]
    getMe: User 
  }
  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserResponse
    login(email: String!, password: String!): LoginResponse
  }
  type User {
    fname: String
    lname: String
    uid: String
    email: String
    password: String
    phone: String
    address: String
    created_at: DateTime
    updated_at: DateTime
  }
  type InsertedUser {
    id: String
    message: String
  }
  input RegisterUserInput {
    fname: String
    lname: String
    uid: String
    email: String
    password: String
    phone: String
    address: String
  }
  type LoginResponse {
    user: User
    token: String
    message: String
  }
  type RegisterUserResponse {
    user: User
    token: String
    message: String
    errors: [String]
  }
`;

const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    getMe: async (_, __, context) => {
      const { req } = context;

      if (!req || !req.headers || !req.headers.authorization) {
        throw new Error("Authorization header not provided");
      }

      const token = req.headers.authorization.replace("Bearer ", "");

      try {
        const decoded = jwt.verify(token, SECRET_KEY);

        // Assuming the decoded token contains user information
        const user = decoded.user;

        return user;
      } catch (error) {
        throw new Error("Invalid token");
      }
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        await registerUserSchema.validate(input, { abortEarly: false });
      } catch (error) {
        return {
          user: null,
          token: null,
          message: "Registration failed",
          errors: error.inner.map((err) => err.message),
        };
      }

      const newUser = {
        uid: input.uid,
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        password: input.password,
        phone: input.phone,
        address: input.address,
      };

      const savedUser = await userService.addUser(newUser);

      if (!savedUser) {
        return {
          user: null,
          token: null,
          message: "Registration failed",
          errors: null
        };
      }

      const token = jwt.sign({ savedUser }, SECRET_KEY);
      
      return {
        user: savedUser,
        token,
        message: "Registration successful",
        errors: null
      };
    },
    login: async (_, { email, password }) => {
      try {
        await loginSchema.validate({ email, password }, { abortEarly: false });
      } catch (error) {
        return {
          user: null,
          token: null,
          message: "Invalid email or password",
          errors: error.inner.map((err) => err.message),
        };
      }

      const user = await userService.getUserByEmailAndPassword(email, password);
      
      if (!user) {
        return {
          user: null,
          token: null,
          message: "Invalid email or password",
        };
      }
      const token = jwt.sign({ user }, SECRET_KEY);
      
      return {
        user,
        token,
        message: "Login successful",
      };
    },
  },
};

export { userTypeDefs, userResolvers };
