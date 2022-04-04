import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import "canvas";

import Question from "../components/Question";

import questions from "./__fixtures__/questions.json";

const renderMultiChoice = () =>
  render(
    <Question
      questions={questions["multiChoice"]["questions"]}
      page={0}
      nextPage={jest.fn()}
      prevPage={jest.fn()}
      handleChange={jest.fn()}
      nextButtonDisabled={false}
      wobble={0}
      setWobble={jest.fn()}
      resetQuestionnaire={jest.fn()}
    />
  );

const renderTextArea = () =>
  render(
    <Question
      questions={questions["textarea"]["questions"]}
      page={0}
      nextPage={jest.fn()}
      prevPage={jest.fn()}
      handleChange={jest.fn()}
      nextButtonDisabled={true}
      wobble={0}
      setWobble={jest.fn()}
      resetQuestionnaire={jest.fn()}
    />
  );

describe("# TextBasedQuestion", () => {
  it("renders multi Choice questions correctly when needed ", async () => {
    const { getByTestId, queryByTestId, container } = renderMultiChoice();
    const intialProgress = getByTestId("progress").textContent;
    expect(+intialProgress).toBeGreaterThan(0);
    expect(getByTestId("nextBtn")).toBeInTheDocument();
    expect(queryByTestId("prevBtn")).toBeNull;
    expect(getByTestId("choice0")).toBeInTheDocument();
    expect(queryByTestId("prevBtn")).toBeNull;
    expect(
      container.querySelectorAll(`[data-testid="Alert-warning"]`).length
    ).toBe(0); //nextButtonDisabled false to warning message
  });

  it("renders text area questions correctly when needed", async () => {
    const { getByTestId, queryByTestId, container } = renderTextArea();
    const intialProgress = getByTestId("progress").textContent;
    expect(+intialProgress).toBeGreaterThan(0);
    expect(
      container.querySelectorAll(`[data-testid="Alert-warning"]`).length
    ).toBeTruthy(); //nextButtonDisabled true warning message exists
    expect(getByTestId("nextBtn")).toBeInTheDocument();
    expect(getByTestId("textarea_12110979")).toBeInTheDocument();
    expect(queryByTestId("prevBtn")).toBeNull;
  });
});
