import "@testing-library/jest-dom";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";

import "jest-axe/extend-expect";
import { axe } from "jest-axe";

import "canvas";

import Questionnaire from "../components/Questionnaire";

import questionnaire_test_data1 from "./__fixtures__/questionnaire_test1.json";
import questionnaire_test_data2 from "./__fixtures__/questionnaire_test2.json";
import questionnaire_test_data3 from "./__fixtures__/questionnaire_test3.json";

const renderQuestionnaire = () =>
  render(
    <Questionnaire
      questionnaire={questionnaire_test_data1["questionnaire"]}
      setQuestionnaire={jest.fn()}
      defaultQuestionnaire={questionnaire_test_data1["questionnaire"]}
    />
  );
const renderQuestionnaireWithOutRequiredOption = () =>
  render(
    <Questionnaire
      questionnaire={questionnaire_test_data2["questionnaire"]}
      setQuestionnaire={jest.fn()}
      defaultQuestionnaire={questionnaire_test_data2["questionnaire"]}
    />
  );
const renderQuestionnaireWithJustOneQuestion = () =>
  render(
    <Questionnaire
      questionnaire={questionnaire_test_data3["questionnaire"]}
      setQuestionnaire={jest.fn()}
      defaultQuestionnaire={questionnaire_test_data2["questionnaire"]}
    />
  );

const getByTextContent = (text) => {
  return screen.getByText((content, element) => {
    const hasText = (element) => element.textContent === text;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element?.children || []).every(
      (child) => !hasText(child)
    );
    return elementHasText && childrenDontHaveText;
  });
};

describe("# Questionnaire", () => {
  it("renders Questionnaire Successfully", async () => {
    const { getByTestId } = renderQuestionnaire();
    await waitFor(() => {
      expect(getByTestId("Question")).toBeInTheDocument();
    });
    expect(getByTestId("sideBar")).toBeInTheDocument();
  });

  it("Passes automatic accessibility tests", async () => {
    const { container } = renderQuestionnaire();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Pagination works for this component (I can see the next question and view the previous one)", async () => {
    const { getByTestId } = renderQuestionnaireWithOutRequiredOption();

    fireEvent.click(getByTestId("nextBtn"));

    expect(
      getByTextContent(
        "Bist Du Beamter oder im öffentlichen Dienst angestellt?"
      )
    ).toBeInTheDocument();
    fireEvent.click(getByTestId("prevBtn"));
    expect(getByTextContent("Wen möchtest Du versichern?")).toBeInTheDocument();
  });

  it("I can see the finish button instead of then next button when survey is complete", async () => {
    const { getByTestId } = renderQuestionnaireWithJustOneQuestion();
    const nextButtonValue = getByTestId("nextBtn").textContent;
    expect(nextButtonValue).toEqual("Finish");
  });

  it("Clicking Finish button renders the right content", async () => {
    const { getByTestId, container } = renderQuestionnaireWithJustOneQuestion();

    fireEvent.click(getByTestId("nextBtn"));
    expect(
      container.querySelectorAll(`[data-testid="SurveyComplete"]`).length
    ).toBeTruthy();
  });

  it("Progress Bar is working properly ", async () => {
    const { getByTestId } = renderQuestionnaireWithOutRequiredOption();

    expect(getByTextContent("Wen möchtest Du versichern?")).toBeInTheDocument();
    const intialProgress = getByTestId("progress").textContent;
    expect(+intialProgress).toBeGreaterThan(0);
    fireEvent.click(getByTestId("nextBtn"));

    const nextProgress = getByTestId("progress").textContent;
    expect(+nextProgress).toBeGreaterThan(+intialProgress);

    fireEvent.click(getByTestId("prevBtn"));
    const lastProgress = getByTestId("progress").textContent;
    expect(+lastProgress).toEqual(+intialProgress);
  });

  it("There is a check for questions that are required (if required it throws warning) ", async () => {
    const { getByTestId, container } = renderQuestionnaire();
    fireEvent.click(getByTestId("nextBtn"));
    expect(
      container.querySelectorAll(`[data-testid="Alert-warning"]`).length
    ).toBeTruthy();
    expect(getByTextContent("Wen möchtest Du versichern?")).toBeInTheDocument();
  });

  it("I can jump questions", async () => {
    const { getByTestId } = renderQuestionnaireWithOutRequiredOption();
    expect(getByTextContent("Wen möchtest Du versichern?")).toBeInTheDocument();
    fireEvent.click(getByTestId("choice0"));
    fireEvent.click(getByTestId("nextBtn"));
    expect(
      getByTextContent(
        "Was wäre Dein Wunschtermin für den Beginn der Privathaftpflichtversicherung?"
      )
    ).toBeInTheDocument();
    const questionInput = getByTestId("date_22039590");
    fireEvent.change(questionInput, { target: { value: "Ja" } });
    fireEvent.click(getByTestId("nextBtn"));
    expect(
      getByTextContent(
        "Hast Du noch weitere Informationen oder Anmerkungen für uns?"
      )
    ).toBeInTheDocument();
  });
});
