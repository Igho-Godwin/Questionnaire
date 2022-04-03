import * as React from "react";

import Questionnaire from "./components/Questionnaire";
import Container from "@mui/material/Container";

import "./css/style.css";
import "./css/animate.css";

export default function App() {
  return (
    <Container maxWidth="lg">
      <Questionnaire />
    </Container>
  );
}
