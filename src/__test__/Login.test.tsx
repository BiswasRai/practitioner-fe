import { render, fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../utils/test-util";
import Login from "../components/Login";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import userEvent from "@testing-library/user-event";

import { act } from "react-dom/test-utils";
import PractitionerList from "../components/PractitionerList";

describe("Login", () => {
  test("form input changes", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${ROUTES.DASHBOARD}`, `${ROUTES.LOGIN}`]}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<PractitionerList />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const submit = screen.getByText("Log in");

    userEvent.type(email, "test@gmail.com");
    userEvent.type(password, "password");

    await act(async () => {
      userEvent.click(submit);
    });

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("input validation", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`${ROUTES.DASHBOARD}`, `${ROUTES.LOGIN}`]}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<PractitionerList />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    userEvent.type(email, "");
    userEvent.type(password, "");

    await act(async () => {
      userEvent.click(screen.getByText("Log in"));
    });

    expect(screen.getByText("Please input your Email!")).toBeInTheDocument();
    expect(screen.getByText("Please input your Password!")).toBeInTheDocument();
  });
});
