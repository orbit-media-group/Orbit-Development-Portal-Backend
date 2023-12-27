import { gql } from "apollo-server-express";
import TodoService from "./todo.service.js";

const todoService = new TodoService();

// Define your GraphQL schema
const todoTypeDefs = gql`
  type Query {
    todos: [Todo]
  }
  type Todo {
    title: String
    body: String
  }
`;

// Define your resolvers
const todoResolvers = {
  Query: {
    todos: () => todoService.getAllTodos(),
  },
};

export { todoTypeDefs, todoResolvers };
