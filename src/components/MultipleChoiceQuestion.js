import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import shortid from "shortid";

import MultiChoiceQuestionTemplate from "./MultiChoiceQuestionTemplate";

const parentDivStyle = { overflow: "scroll", maxHeight: "300px" };

const MultipleChoiceQuestion = ({ question, handleChange }) => (
  <Box style={parentDivStyle}>
    {question.choices.map(
      (choice, index) =>
        (index % 2 == 0 || index === 0) &&
        index != 1 && (
          <Grid
            key={shortid.generate()}
            container
            rowSpacing={{ xs: 0 }}
            spacing={{ lg: 4 }}
          >
            <MultiChoiceQuestionTemplate
              label={question.choices[index].label}
              identifier={question.identifier}
              value={question.choices[index].value}
              index={index}
              checked={question.choices[index].selected}
              handleChange={handleChange}
            />

            {typeof question.choices[index + 1] != "undefined" && (
              <MultiChoiceQuestionTemplate
                label={question.choices[index + 1].label}
                identifier={question.identifier}
                value={question.choices[index + 1].value}
                index={index + 1}
                checked={question.choices[index + 1].selected}
                handleChange={handleChange}
              />
            )}
          </Grid>
        )
    )}
  </Box>
);

export default MultipleChoiceQuestion;
