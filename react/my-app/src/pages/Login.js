import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/login.module.css";
function Login() {
  let history = useHistory();
  function saveData() {
    var username = document.getElementById("formUsername").value;
    var password = document.getElementById("formPassword").value;
    if (username === "nilufar" && password === "nilufar") {
      history.push("/home");
    } else {
      alert("Username yoki parol noto'g'ri!!!");
    }
  }
  return (
    <div className={styles.bd}>
      <div className={styles.bgLogin}>
        <div className={styles.formLogin}>
          <div className={styles.Logo}></div>
          <h1>Admin</h1>
          <div style={{ textAlign: "left" }}>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label className={styles.labelForm}>Login</Form.Label>
                <Form.Control type="text" placeholder="Login" className={styles.inputForm} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className={styles.labelForm}>Parol</Form.Label>
                <Form.Control type="password" placeholder="Parol" className={styles.inputForm} />
              </Form.Group>
              <Link to="/verify">Emailni tasdiqlash</Link>
              <Button variant="primary" type="submit" onClick={saveData} style={{ backgroundColor: "#1A86D0" }} className={styles.btnInput}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
