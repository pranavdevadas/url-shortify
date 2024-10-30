import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const validateName = (name) => {
    return name.length >= 3;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z][\w.-]*@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email) && email.length >= 4;
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all details.");
      return;
    }

    // Validate fields
    if (!validateName(name)) {
      toast.error("Invalid name. Name must be at least 3 characters.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error(
        "Invalid email. Must include '@' and not start with a number. Minimum 4 characters."
      );
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Invalid password. Password must be at least 5 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ backgroundColor: "#ffffff2e" }}
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: "#ffffff2e" }}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: "#ffffff2e" }}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ backgroundColor: "#ffffff2e" }}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="danger"
          style={{ borderRadius: "100px", backgroundColor: "#ff0000a6" }}
        >
          {isLoading ? <Spinner animation="grow" variant="danger" /> : "Register"}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link className="text-danger" to="/login">
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
