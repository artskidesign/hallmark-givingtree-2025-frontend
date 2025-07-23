import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const NotFound404 = () => (
  <React.Fragment>
    <div className="page-content error">
      <Container>
        <h5 className="mb-4">Oops, looks like we can't find the page you were looking for.</h5>
        <Link to="/">
          <Button
            classes={{
              root: 'PrimaryBtn SmBtn',
              label: 'BtnLabel',
            }}
          >
            Back to homepage
          </Button>
        </Link>
      </Container>
    </div>
  </React.Fragment>
);

export default NotFound404;
