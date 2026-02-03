
import express from "express";
import morgan from "morgan";

const middlewares = (app: any): void => {




  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));

};

export default middlewares;
