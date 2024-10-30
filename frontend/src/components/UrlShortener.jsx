import React, { useState } from "react";
import { useUrlShortenerMutation } from "../slices/userApiSlice";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [urlShortener, { isLoading }] = useUrlShortenerMutation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    toast.success("URL copied to clipboard!");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      toast.error(
        "Please enter a valid URL starting with 'http://' or 'https://'."
      );
      return;
    }

    try {
      const result = await urlShortener({ url }).unwrap();
      setShortenedUrl(result.shortUrl);
      toast.success("URL Shortened Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Short Your URL</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="url" className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Paste your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ backgroundColor: "#ffffff2e" }}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="danger"
          style={{ borderRadius: "100px", backgroundColor: "#ff0000a6" }}
          disabled={isLoading}
        >
          {isLoading ? "Shortening..." : "Short URL"}
        </Button>
        {isLoading && <Spinner animation="grow" variant="danger" />}
      </Form>
      {shortenedUrl && (
        <div className="d-flex align-items-center mt-3">
          <Form.Control
            type="text"
            value={shortenedUrl}
            readOnly
            style={{ backgroundColor: "#ffffff2e", marginRight: "8px" }}
          />
          <Button variant="danger" onClick={copyToClipboard}>
            <FaRegCopy />
          </Button>
        </div>
      )}
    </FormContainer>
  );
}

export default UrlShortener;
