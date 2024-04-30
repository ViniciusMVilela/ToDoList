import app from "../app";
import { describe, it, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import UserModel from "../src/users/user.schema";
import * as request from "supertest";

describe("/users endpoint", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should create user", async () => {
    const userMock = {
      name: "teste",
      email: "t@gmail.com",
      weight: 50,
      password: "password",
    };

    const response = await request.default(app).post("/users").send(userMock);
    const findeduser = await UserModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(userMock.name).toBe(findeduser?.name);
    expect(userMock.email).toBe(findeduser?.email);
    expect(userMock.weight).toBe(findeduser?.weight);
  });

  it("Should get user by id", async () => {
    const user = await UserModel.findOne();
    const response = await request.default(app).get(`/users/${user._id}`);

    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(String(user._id));
  });

  it("Should get all users", async () => {
    const response = await request.default(app).get("/users");
    const users = await UserModel.find();

    expect(response.status).toEqual(200);
  });

  it("Should update user", async () => {
    const user = await UserModel.findOne();
    const updateName = "name";

    const response = await request
      .default(app)
      .put(`/users/${user._id}`)
      .send({ name: updateName });
    const updateduser = await UserModel.findById(user._id);

    expect(response.status).toEqual(200);
    expect(updateduser?.name).toEqual(updateName);
  });

  it("Should delete user", async () => {
    const user = await UserModel.findOne();
    const response = await request.default(app).delete(`/users/${user._id}`);

    const deleteduser = await UserModel.findById(user._id);

    expect(response.status).toEqual(200);
    expect(deleteduser).toBeNull();
  });
});
