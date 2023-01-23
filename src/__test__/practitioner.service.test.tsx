import axios, { AxiosRequestHeaders } from "axios";
import MockAdapter from "axios-mock-adapter";
import endpoints from "../constants/endpoints";

import { fetchAll } from "./../services/practitioner.service";

describe("practitioner services", () => {
  let mock: any;
  // jest.mock("axios", () => {
  //   return {
  //     create: () => {
  //       return {
  //         interceptors: {
  //           request: { eject: jest.fn(), use: jest.fn() },
  //           response: { eject: jest.fn(), use: jest.fn() },
  //         },
  //       };
  //     },
  //   };
  // });

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should make a GET request to the API", async () => {
    mock.onGet(`/v1/practitioner/`).reply({
      status: 200,
      data: [
        {
          id: 23,
          fullName: "https://www.youtube.com",
          email: "xapypypi@mailinator.com",
          contact: "123234234",
          dateOfBirth: "2096-05-06T00:00:00.000Z",
          workingDays: 1,
          startTime: "09:00:00",
          endTime: "18:00:00",
          permanentAddress: "Laborum Est dolore",
          temporaryAddress: "Esse praesentium no",
          isSpecialist: true,
          photo:
            "http://res.cloudinary.com/dlurq6wtj/image/upload/v1671511135/1671511133163.jpg",
          createdAt: "2022-12-09T07:19:04.000Z",
          updatedAt: "2023-01-05T05:21:03.000Z",
        },
      ],
      message: "Successfully fetched the Practitioner.",
    });

    const practitioner = await fetchAll();

    expect(practitioner.data).toEqual([
      {
        id: 23,
        fullName: "https://www.youtube.com",
        email: "xapypypi@mailinator.com",
        contact: "123234234",
        dateOfBirth: "2096-05-06T00:00:00.000Z",
        workingDays: 1,
        startTime: "09:00:00",
        endTime: "18:00:00",
        permanentAddress: "Laborum Est dolore",
        temporaryAddress: "Esse praesentium no",
        isSpecialist: true,
        photo:
          "http://res.cloudinary.com/dlurq6wtj/image/upload/v1671511135/1671511133163.jpg",
        createdAt: "2022-12-09T07:19:04.000Z",
        updatedAt: "2023-01-05T05:21:03.000Z",
      },
    ]);

    console.log(mock.history.get[0]);
    // expect(mock.history.get[0].url).toBe("/api/v1/practitioner");
  });
});
