import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../css/Verify.module.css";
import { url } from "../host/Host";
import { message } from "antd";
import GLOBAL from "../host/Global";
import { Link, Redirect } from "react-router-dom";
import { getSchools } from "../host/Config";
export default class Login extends Component {
  state = {
    login: false,
    id: null,
    schools: [],
  };
  getSchools = () => {
    getSchools().then((res) => this.setState({ schools: res.data }));
  };
  loginVeb = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    axios
      .post(`${url}/login/`, formDataObj)
      .then((res) => {
        this.state.schools.map((item) => {
          return item.admin === res.data.id ? (GLOBAL.id = item.id) : "";
        });
        if (GLOBAL.id !== null) {
          GLOBAL.user = res.data.id;
          window.localStorage.setItem("token", res.data.token);
          this.setState({ login: true });
        } else {
          message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
        }
      })
      .catch((err) => {
        message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
      });
  };
  componentDidMount() {
    this.getSchools();
  }
  render() {
    return this.state.login === false ? (
      <div className={style.formDiv}>
        <div className={style.loginBox}>
          {console.log(GLOBAL.id)}
          <h2>Tizimga kirish</h2>
          <Form className={style.From} onSubmit={this.loginVeb}>
            <Form.Group className={style.userBox}>
              <Form.Control style={{ outline: "none" }} className={style.Forminput} type="text" name="username" required={true} />
              <Form.Label className={style.formLabel}>Login</Form.Label>
            </Form.Group>
            <Form.Group className={style.userBox}>
              <Form.Control style={{ outline: "none" }} className={style.Forminput} type="password" name="password" required={true} />
              <Form.Label className={style.formLabel}>Parol</Form.Label>
            </Form.Group>
            {/* <Link to="/verify">Emailni tasdiqlash</Link> */}
            <Button className={style.sub} type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Kirish
            </Button>
          </Form>
        </div>
      </div>
    ) : (
      <Redirect to="/home/dashboard/uz" />
    );
  }
}
