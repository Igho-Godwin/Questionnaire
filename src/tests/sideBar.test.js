import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import "canvas";

import SideBar from "../components/SideBar";

const renderSideBar = () => render(<SideBar />);

describe("# SideBar", () => {
  it("renders SideBar  correctly", async () => {
    const { getByTestId } = renderSideBar();
    expect(getByTestId("sideBar")).toBeInTheDocument();
  });
});
