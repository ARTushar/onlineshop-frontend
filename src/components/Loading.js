import React from 'react';
import {Container, Row} from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <CircularProgress color="secondary" />
        </Row>
      </Container>
    </div>
  )
};

export default Loading;
