import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import "canvas";

import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";

import questions from "./__fixtures__/questions.json";

const renderQuestion = () =>
  render(
    <MultipleChoiceQuestion
      question={questions["multiChoice"]["questions"][0]}
      handleChange={jest.fn()}
    />
  );

describe("# MultipleChoiceQuestion", () => {
  it("renders MultipleChoiceQuestion  correctly", async () => {
    const { getByTestId } = renderQuestion();
    expect(getByTestId("choice0")).toBeInTheDocument();
  });
});
