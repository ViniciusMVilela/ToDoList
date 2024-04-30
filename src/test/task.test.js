import app from "../app";
import { describe, it, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import taskModel from "../src/tasks/task.schema";
import * as request from "supertest";

describe("/tasks endpoint", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should create task", async () => {
    const taskMock = {
      title: "task",
      description: "description task",
      type: "type",
      user: "user_id",
    };

    const response = await request.default(app).post("/tasks").send(taskMock);
    const findedtask = await taskModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(taskMock.title).toBe(findedtask?.title);
    expect(taskMock.description).toBe(findedtask?.description);
    expect(taskMock.type).toBe(findedtask?.type);
    expect(taskMock.user).toBe(findedtask?.user);
  });

  it("Should get task by id", async () => {
    const task = new taskModel({
      title: "task",
      description: "description task",
      type: "type",
      user: "user_id",
    });
    await task.save();

    const response = await request.default(app).get(`/tasks/${task._id}`);

    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual(task.title);
    expect(response.body.description).toEqual(task.description);
    expect(response.body.type).toEqual(task.type);
    expect(response.body.user).toEqual(task.user);
  });

  it("Should get all tasks", async () => {
    const userId = "user_id";
    const response = await request.default(app).get(`/tasks/user/${userId}`);

    expect(response.status).toEqual(200);
  });

  it("Should update a task", async () => {
    const task = new taskModel({
      title: "task",
      description: "description task",
      type: "type",
      user: "user_id",
    });
    await task.save();

    const updatedtaskMock = {
      title: "task update",
      description: "update description",
      type: "update type",
    };

    const response = await request
      .default(app)
      .put(`/tasks/${task._id}`)
      .send(updatedtaskMock);
    const updatedtask = await taskModel.findById(task._id);

    expect(response.status).toEqual(200);
    expect(updatedtask?.title).toEqual(updatedtaskMock.title);
    expect(updatedtask?.description).toEqual(updatedtaskMock.description);
    expect(updatedtask?.type).toEqual(updatedtaskMock.type);
  });

  it("Should delete task", async () => {
    const task = new taskModel({
      title: "task",
      description: "description taks",
      type: "type",
      user: "user_id",
    });
    await task.save();

    const response = await request.default(app).delete(`/tasks/${task._id}`);
    const deletedtask = await taskModel.findById(task._id);

    expect(response.status).toEqual(200);
    expect(deletedtask).toBeNull();
  });
});
