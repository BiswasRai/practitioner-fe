import { MemoryRouter, Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../utils/test-util";

import { ROUTES } from "../constants/routes";
import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { rest } from "msw";
import endpoints from "../constants/endpoints";
import { setupServer } from "msw/lib/node";
import PractitionerDetailForm from "../components/PractitionerDetailForm";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

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
jest.useRealTimers();
const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("PractitionerDetailForm", () => {
  const onSubmit = jest.fn();

  test("should render practitioner detail form", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${ROUTES.PRACTITIONER}`]}>
        <Routes>
          <Route
            path={ROUTES.PRACTITIONER}
            element={<PractitionerDetailForm />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Practitioner Detail Page")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact No.")).toBeInTheDocument();
    expect(screen.getByLabelText("Date Of Birth")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Start Time and End Time")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Working Days")).toBeInTheDocument();
    expect(screen.getByLabelText("Permanent Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Temporary Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Specialist")).toBeInTheDocument();
  });

  test("should pass validation and submit the form", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${ROUTES.PRACTITIONER}`]}>
        <Routes>
          <Route
            path={ROUTES.PRACTITIONER}
            element={<PractitionerDetailForm />}
          />
        </Routes>
      </MemoryRouter>
    );

    const fullName = screen.getByLabelText("Full Name");
    const email = screen.getByRole("textbox", { name: /Email/i });

    user.type(fullName, "Practitioner");
    user.type(email, "Practitioner@gmail.com");

    user.click(screen.getByRole("checkbox", { name: /Specialist/i }));

    await act(async () => {
      userEvent.click(screen.getByText("Add Practitioner"));
    });
  });
});
