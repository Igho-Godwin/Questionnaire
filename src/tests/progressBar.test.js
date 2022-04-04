import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import "canvas";

import ProgressBar from "../components/ProgressBar";

const renderProgressBar = () =>
  render(
    <ProgressBar page={0} progressIteratorVal={5} numberOfQuestions={20} />
  );

describe("# ProgressBar", () => {
  it("renders ProgressBar  correctly", async () => {
    const { getByTestId } = renderProgressBar();
    const intialProgress = getByTestId("progress").textContent;
    expect(+intialProgress).toBeGreaterThan(0);
    expect(getByTestId("progressBar")).toBeInTheDocument();
  });
});
