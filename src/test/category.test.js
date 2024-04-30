import app from "../app";
import { describe, it, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import categoryModel from "../src/categorys/category.schema";
import * as request from "supertest";

describe("/categorys endpoint", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should create a categoty", async () => {
    const categoryMock = {
      name: "new category",
      color: "##ffa500",
      user: "user_id",
    };

    const response = await request
      .default(app)
      .post("/categorys")
      .send(categoryMock);
    const found = await categoryModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(categoryMock.name).toBe(found?.name);
    expect(categoryMock.color).toBe(found?.color);
    expect(categoryMock.user).toBe(found?.user);
  });

  it("Should get category by id", async () => {
    const categoryMock = {
      name: "category",
      color: "#ffa500",
      user: "user_id",
    };

    const create = await categoryModel.create(categoryMock);
    const response = await request.default(app).get(`/categorys/${create._id}`);
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(create._id.toString());
  });

  it("Should get all categories", async () => {
    const userId = "user_id";
    const response = await request
      .default(app)
      .get(`/categorys/user/${userId}`);

    expect(response.status).toEqual(200);
  });

  it("Should update category", async () => {
    const categoryMock = {
      name: "category",
      color: "#ffa500",
      user: "user_id",
    };

    const created = await categoryModel.create(categoryMock);
    const updatedData = {
      name: "update category",
      color: "#56c71d",
    };

    const response = await request
      .default(app)
      .put(`/categorys/${created._id}`)
      .send(updatedData);
    const updated = await categoryModel.findById(createdCategory._id);

    expect(response.status).toEqual(200);
    expect(updated?.name).toEqual(updatedData.name);
    expect(updatedcategory?.color).toEqual(updatedData.color);
  });

  it("Should delete category", async () => {
    const categoryMock = {
      name: "category",
      color: "#ffa500",
      user: "user_id",
    };

    const createdCategory = await categoryModel.create(categoryMock);
    const response = await request
      .default(app)
      .delete(`/categorys/${createdCategory._id}`);

    const deletedcategory = await categoryModel.findById(createdCategory._id);
    expect(response.status).toEqual(200);
    expect(deletedcategory).toBeNull();
  });
});
