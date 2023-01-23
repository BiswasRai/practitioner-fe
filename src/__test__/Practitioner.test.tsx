import { MemoryRouter, Route, Routes } from "react-router-dom";
import PractitionerList from "../components/PractitionerList";
import { renderWithProviders } from "../utils/test-util";

import { ROUTES } from "../constants/routes";
import { screen } from "@testing-library/react";
import { rest } from "msw";
import endpoints from "../constants/endpoints";
import { setupServer } from "msw/lib/node";

let practitioners = {
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
    {
      id: 25,
      fullName: "Biswas Rai",
      email: "biswasrai@asd.com",
      contact: "123123",
      dateOfBirth: "2022-12-13T00:00:00.000Z",
      workingDays: 21,
      startTime: "00:00:00",
      endTime: "02:00:00",
      permanentAddress: "kathmandu",
      temporaryAddress: "asd",
      isSpecialist: false,
      photo:
        "http://res.cloudinary.com/dlurq6wtj/image/upload/v1670921122/1670921121033.jpg",
      createdAt: "2022-12-13T08:16:31.000Z",
      updatedAt: "2022-12-13T08:45:24.000Z",
    },
  ],
};

export const handlers = [
  rest.get(`${endpoints.PRACTITIONER}`, (req, res, ctx) => {
    return res(
      ctx.json({
        practitioners,
      }),
      ctx.delay(50)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("PractitionerList", () => {
  test("should render practitioner list table", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${ROUTES.DASHBOARD}`]}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<PractitionerList />} />
        </Routes>
      </MemoryRouter>
    );

    const title = screen.getByText("Practitioner List");

    expect(title).toBeInTheDocument();
    expect(screen.getByText("Practitioner ID")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Permanent Address")).toBeInTheDocument();
    expect(screen.getByText("Temporary Address")).toBeInTheDocument();
    expect(screen.getByText("Contact No.")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Add Practitioner")).toBeInTheDocument();
  });

  test("should handle no data in empty data", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${ROUTES.DASHBOARD}`]}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<PractitionerList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  test("should show data", async () => {
    server.use(
      rest.get(`${endpoints.PRACTITIONER}`, (req, res, ctx) => {
        return res(
          ctx.json({
            practitioners,
          }),
          ctx.delay(50)
        );
      })
    );
  });
});
