import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Notice = () => {
  const [title, setTitle] = useState("");
  const [contentFile, setContentFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentFileChange = (e) => {
    const file = e.target.files[0];
    setContentFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement saving data to the database using backend (e.g., API call).
    // For now, we'll just log the data.
    console.log("Title:", title);
    console.log("Content File:", contentFile);
  };

  return (
    <div  style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}>
      <h1>Upload Notice</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={handleContentFileChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ background: "#394867",
        marginTop:"10px" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Notice;
