import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const parentDivStyle = {
  overflow: "scroll",
  maxHeight: "300px",
  marginBottom: "10px",
};

const inputStyle = { width: "100%", height: "50px", padding: "8px" };

const textAreaStyle = { width: "100%" };

const TextBasedQuestion = ({ question, handleChange }) => (
  <Box style={parentDivStyle}>
    <Grid container rowSpacing={{ xs: 0 }} spacing={{ lg: 4 }}>
      <Grid item lg={12} xs={12}>
        {question.multiline === "true" ? (
          <textarea
            id={question.identifier}
            name={question.identifier}
            placeholder="Answer"
            rows={4}
            style={textAreaStyle}
            value={question.value || ""}
            onChange={(e) => handleChange({ e })}
            data-testid={question.identifier}
          />
        ) : (
          <input
            id={question.identifier}
            name={question.identifier}
            placeholder="Answer"
            style={inputStyle}
            value={question.value || ""}
            onChange={(e) => handleChange({ e })}
            data-testid={question.identifier}
          />
        )}
      </Grid>
    </Grid>
  </Box>
);

export default TextBasedQuestion;
