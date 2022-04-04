import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import "canvas";

import TextBasedQuestion from "../components/TextBasedQuestion";

import questions from "./__fixtures__/questions.json";

const renderInput = () =>
  render(
    <TextBasedQuestion
      question={questions["input"]["questions"][0]}
      handleChange={jest.fn()}
    />
  );

const renderTextArea = () =>
  render(
    <TextBasedQuestion
      question={questions["textarea"]["questions"][0]}
      handleChange={jest.fn()}
    />
  );

describe("# TextBasedQuestion", () => {
  it("renders TextBasedQuestion input option correctly", async () => {
    const { getByTestId } = renderInput();
    expect(getByTestId("date_22039590")).toBeInTheDocument();
  });

  it("renders TextBasedQuestion textarea (multi line input option) option correctly", async () => {
    const { getByTestId } = renderTextArea();
    expect(getByTestId("textarea_12110979")).toBeInTheDocument();
  });
});
