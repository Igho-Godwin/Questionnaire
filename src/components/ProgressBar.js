import * as React from "react";

import usePrevious from "../hooks/usePrevious";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const progressStyle = { width: "100%", mr: 1 };
const widthStyle = { width: "100%" };
const hideElement = { display: "none" };

const LinearProgressWithLabel = ({ value }) => (
  <Box>
    <Box sx={progressStyle}>
      <LinearProgress
        title="progressBar"
        role="progressbar"
        variant="determinate"
        value={value}
      />
    </Box>
  </Box>
);

const ProgressBar = React.memo(
  ({ page, progressIteratorVal, numberOfQuestions }) => {
    const [progress, setProgress] = React.useState(0);
    const prevPage = usePrevious(page);

    React.useEffect(() => {
      setProgress((prevProgress) =>
        page === 0
          ? progressIteratorVal
          : page >= numberOfQuestions
          ? 100
          : prevPage > page
          ? prevProgress - progressIteratorVal
          : page > 0 && prevPage === page + 1
          ? prevProgress + progressIteratorVal
          : prevProgress + progressIteratorVal * (page - prevPage)
      );
    }, [page, progressIteratorVal]);

    return (
      <Box sx={widthStyle} data-testid="progressBar">
        <Box
          component="span"
          title="testbar"
          data-testid="progress"
          style={hideElement}
        >
          {progress}
        </Box>
        <LinearProgressWithLabel value={progress} />
      </Box>
    );
  }
);

export default ProgressBar;
