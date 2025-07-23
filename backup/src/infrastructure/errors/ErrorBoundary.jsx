import React from "react";
import { Container } from "react-bootstrap";
import { trackEvent } from "../tracking/GoogleAnalytics";
import Button from "@material-ui/core/Button";
import Header from "../../components/Header";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    trackEvent("Error", "AppError", "General Error");
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <Header title="Oops!" headerType="curvedHeader" />
          <div className="page-content error">
            <Container>
              <h5 className="mb-4">
                Oops, looks like we can't find the page you were looking for.
              </h5>
              <a href="/">
                <Button
                  classes={{
                    root: "PrimaryBtn SmBtn",
                    label: "BtnLabel",
                  }}
                >
                  Back to homepage
                </Button>
              </a>
            </Container>
          </div>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
