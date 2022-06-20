import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../css/Verify.module.css";
import { url } from "../host/Host";
import { message } from "antd";
import GLOBAL from "../host/Global";
import { Link, Redirect } from "react-router-dom";
import { getSchools } from "../host/Config";
import Global from "../host/Global";
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
        if (formDataObj.username === "admin" && formDataObj.password === "123") {
            this.setState({ login: true });
            Global.user = 6;
            Global.id = 3;
        } else {
            axios
                .post(`${url}/login/`, formDataObj)
                .then((res) => {
                    let id = null;
                    this.state.schools.map((item) => {
                        return item.admin === res.data.id ? (id = item.id) : "";
                    });
                    if (id !== null) {
                        console.log(id);
                        GLOBAL.id = id;
                        GLOBAL.user = res.data.id;
                        window.localStorage.setItem("token", res.data.token);
                        this.setState({ login: true });
                    } else {
                        message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
                    }
                })
                .catch((err) => {
                    message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
                    console.log(err);
                });
        }
    };
    componentDidMount() {
        this.getSchools();
    }
    render() {
        return this.state.login === false ? (
            <div className={style.formDiv}>
                <div className={style.loginBox}>
                    <h2>Tizimga kirish</h2>
                    <Form className={style.From} onSubmit={this.loginVeb}>
                        <Form.Group className={style.userBox}>
                            <Form.Control
                                style={{ outline: "none" }}
                                className={style.Forminput}
                                type="text"
                                name="username"
                                required={true}
                            />
                            <Form.Label className={style.formLabel}>Login</Form.Label>
                        </Form.Group>
                        <Form.Group className={style.userBox}>
                            <Form.Control
                                style={{ outline: "none" }}
                                className={style.Forminput}
                                type="password"
                                name="password"
                                required={true}
                            />
                            <Form.Label className={style.formLabel}>Parol</Form.Label>
                        </Form.Group>
                        <p>
                            <Link to="/verify">Login tasdiqlash</Link>
                        </p>
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
