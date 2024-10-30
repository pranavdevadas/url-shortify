import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container >
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5 shadow" style={{backgroundColor: '#ffffff1e'}} >
        <div style={{ color: 'white' }}> {/* Set text color to white */}
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
