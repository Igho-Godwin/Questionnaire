import React from "react";

import TextBasedQuestion from "./TextBasedQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import ProgressBar from "./ProgressBar";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const requiredSymbolStyle = { color: "red" };

const Question = ({
  questions,
  page,
  nextPage,
  prevPage,
  handleChange,
  nextButtonDisabled,
  wobble,
  setWobble,
  resetQuestionnaire,
}) => {
  const { width, height } = useWindowSize();

  const isDoneWithSurvey = (question) => typeof question === "undefined";

  const IsMultipleChoiceQuestion = (question) =>
    !isDoneWithSurvey(question) && question.question_type === "multiple-choice";

  const IsTextBasedQuestion = (question) =>
    !isDoneWithSurvey(question) && !IsMultipleChoiceQuestion(question);

  return (
    <div
      className="qtn-div"
      onAnimationEnd={() => setWobble(0)}
      wobble={wobble}
    >
      <Box id="wizard_container">
        <Box id="top-wizard">
          <ProgressBar
            page={page}
            progressIteratorVal={Math.floor(100 / questions.length)}
            numberOfQuestions={questions.length - 1}
          />
        </Box>

        <form method="post">
          <Box id="middle-wizard">
            <Box className="step">
              {!isDoneWithSurvey(questions[page]) && (
                <h3 className="main_question">
                  <FontAwesomeIcon icon={faArrowRight} />
                  &nbsp; {questions[page].headline}{" "}
                  {questions[page].required && (
                    <Box style={requiredSymbolStyle} component="span">
                      *
                    </Box>
                  )}
                </h3>
              )}
              <Box>
                {isDoneWithSurvey(questions[page]) && (
                  <Box component="h1">
                    {" "}
                    <Confetti width={width} height={height} />
                    Survey Complete Thank You
                  </Box>
                )}

                {IsMultipleChoiceQuestion(questions[page]) && (
                  <MultipleChoiceQuestion
                    question={questions[page]}
                    handleChange={handleChange}
                  />
                )}
                {IsTextBasedQuestion(questions[page]) && (
                  <TextBasedQuestion
                    question={questions[page]}
                    handleChange={handleChange}
                  />
                )}
                {nextButtonDisabled && (
                  <Alert severity="warning">Please fill this in</Alert>
                )}
              </Box>
            </Box>
          </Box>
        </form>
        <Box id="bottom-wizard">
          {page != 0 &&
            (!isDoneWithSurvey(questions[page]) ||
              nextButtonDisabled === true) && (
              <button
                onClick={prevPage}
                type="button"
                name="backward"
                className="backward"
              >
                Prev
              </button>
            )}

          {(!isDoneWithSurvey(questions[page]) ||
            nextButtonDisabled === true) && (
            <button
              onClick={nextPage}
              type="button"
              name="forward"
              className="forward"
            >
              {questions.length - 1 === page ? "Finish" : "Next"}
            </button>
          )}
          {!(
            !isDoneWithSurvey(questions[page]) || nextButtonDisabled === true
          ) && (
            <button
              onClick={resetQuestionnaire}
              type="button"
              name="forward"
              className="forward"
            >
              Reset
            </button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Question;
