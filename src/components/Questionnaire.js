import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import SideBar from "./SideBar";
import Question from "./Question";

const questionnaireParentStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const sideBarStyle = { backgroundColor: "#2955a8" };

const Questionnaire = ({
  questionnaire,
  setQuestionnaire,
  defaultQuestionnaire,
}) => {
  const [page, setPage] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  const [wobble, setWobble] = useState(0); // for animation

  const nextPage = () => {
    const isDisabled =
      page < questionnaire["questions"].length && isValidated();

    if (isDisabled) {
      return false;
    }

    const jumpValue = checkForJump();

    const currPage = Number.isInteger(jumpValue) ? jumpValue : page + 1;

    setWobble(1);
    setPage(currPage);
  };

  const checkForJump = () => {
    const questionnaireCopy = { ...questionnaire };
    const currentQuestion = { ...questionnaireCopy["questions"][page] };

    if (currentQuestion.jumps.length === 0) {
      return false;
    }

    if (currentQuestion.question_type === "multiple-choice") {
      currentQuestion.choices = currentQuestion.choices.filter((choice) => {
        return choice.selected === true;
      });

      if (currentQuestion.choices.length === 0) {
        return false;
      }

      currentQuestion.jumps = currentQuestion.jumps.filter((jump) => {
        return (
          jump.conditions.filter((condition) => {
            return (
              condition.value.toUpperCase() ===
              currentQuestion.choices[0].value.toUpperCase()
            );
          }).length > 0
        );
      });

      if (currentQuestion.jumps.length === 0) {
        return false;
      }
    } else {
      if (typeof currentQuestion.value === "undefined") {
        return false;
      }

      currentQuestion.jumps = currentQuestion.jumps.filter((jump) => {
        return (
          jump.conditions.filter((condition) => {
            return (
              condition.value.toUpperCase() ===
              currentQuestion.value.toUpperCase()
            );
          }).length > 0
        );
      });

      if (currentQuestion.jumps.length === 0) {
        return false;
      }
    }

    const questionId = currentQuestion.jumps[0].destination.id;

    const questionsCopy = [...questionnaire["questions"]];
    let questionIndex;

    questionsCopy.forEach((question, index) => {
      if (question.identifier === questionId) {
        questionIndex = index;
        return;
      }
    });

    return questionIndex;
  };

  const prevPage = () => {
    nextButtonDisabled && setNextButtonDisabled(false);
    page - 1 >= 0 && setPage(page - 1);
    setWobble(1);
  };

  const handleChange = ({ choiceIndex, e }) => {
    const questionnaireCopy = { ...questionnaire };
    const questions = [...questionnaire["questions"]];
    const currentQuestion = { ...questions[page] };
    if (currentQuestion.question_type === "multiple-choice") {
      if (currentQuestion.multiple === "false") {
        currentQuestion.choices = currentQuestion.choices.map(
          (choice, index) => {
            if (index != choiceIndex) {
              choice.selected = false;
            }
            return choice;
          }
        );
      }

      currentQuestion.choices[choiceIndex]["selected"] =
        !currentQuestion.choices[choiceIndex]["selected"];

      questionnaireCopy["questions"] = questions;
    } else {
      currentQuestion["value"] = e.target.value;
      questionnaireCopy["questions"][page] = currentQuestion;
    }

    setQuestionnaire(questionnaireCopy);
  };

  const isValidated = () => {
    const currentQuestion = { ...questionnaire["questions"][page] };
    const { required, question_type, choices, value } = currentQuestion;
    const isDisabled =
      required === true && question_type === "multiple-choice"
        ? choices.filter((choice) => choice.selected === true).length <= 0
        : required === true
        ? typeof value === "undefined"
          ? true
          : value.trim().length <= 0
        : false;

    setNextButtonDisabled(isDisabled);
    return isDisabled;
  };

  const resetQuestionnaire = () => {
    setQuestionnaire(defaultQuestionnaire);
    setPage(0);
  };

  return (
    <Box style={questionnaireParentStyle}>
      <Box id="form_container">
        <Grid container spacing={0}>
          <Grid item xs={4} style={sideBarStyle}>
            <SideBar />
          </Grid>
          <Grid item xs={8}>
            <Box>
              {typeof questionnaire.id !== "undefined" && (
                <Question
                  questions={questionnaire["questions"]}
                  page={page}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  handleChange={handleChange}
                  nextButtonDisabled={nextButtonDisabled}
                  wobble={wobble}
                  setWobble={setWobble}
                  resetQuestionnaire={resetQuestionnaire}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Questionnaire;
