import React, { lazy, Suspense } from "react";

import { useLocalStorage } from "react-use";

import "./css/style.css";
import "./css/animate.css";

import Container from "@mui/material/Container";

import questionnaire_data from "./data/questionnaire.json";

const Questionnaire = lazy(() => import("./components/Questionnaire"));

const renderLoader = () => <p>Loading</p>;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading failed! Please reload.</p>;
    }

    return this.props.children;
  }
}

export default function App() {
  const [questionnaire, setQuestionnaire] = useLocalStorage(
    "questionnaire",
    questionnaire_data["questionnaire"]
  );
  return (
    <ErrorBoundary>
      <Suspense fallback={renderLoader()}>
        <Container maxWidth="lg">
          <Questionnaire
            questionnaire={questionnaire}
            setQuestionnaire={setQuestionnaire}
            defaultQuestionnaire={questionnaire_data["questionnaire"]}
          />
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
}
