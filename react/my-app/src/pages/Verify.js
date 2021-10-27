import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../css/Verify.module.css";
import { url } from "../host/Host";
import { message } from "antd";
import GLOBAL from "../host/Global";
import { Redirect } from "react-router-dom";
export default class Verify extends Component {
  state = {
    login: false,
    email: "",
    id: null,
    username: "",
    verify: false,
    info: false,
    viloyat: [],
    tuman: null,
    dashbord: false,
  };
  login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    this.setState({
      username: document.getElementById("username").value,
    });
    axios
      .post(`${url}/login/`, formDataObj)
      .then((res) => {
        this.setState({
          id: res.data.id,
          login: true,
        });
        window.localStorage.setItem("tokenVerify", res.data.token);
      })
      .catch((err) => {
        message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
      });
  };
  verify = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    axios
      .post(`${url}/verify_email/`, formDataObj, {
        headers: { Authorization: `token ${window.localStorage.getItem("tokenVerify")}` },
      })
      .then((res) => {
        this.setState({ verify: true });
      })
      .catch((err) => {
        message.error("Bu email tizimda mavjud tekshirib qaytatdan kiriting");
      });
  };
  loginVeb = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    axios
      .post(`${url}/login/`, formDataObj)
      .then((res) => {
        this.setState({ id: res.data.id, info: true });
        window.localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        message.error("Login yoki parolni xato kiritdingiz. Iltimos tekshirib qaytatdan kiriting.");
      });
  };
  onChange = (value) => {
    console.log(value);
    this.setState({
      tuman: value,
    });
  };
  componentDidMount() {
    axios
      .get(`${url}/region/`)
      .then((res) => {
        var a = res.data.sort(function (a, b) {
          var textA = a.address;
          var textB = b.address;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({ viloyat: a });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  Maktab = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("admin", Number(this.state.id));
    var formDataObj = Object.fromEntries(formData.entries());
    formDataObj.school_number = Number(formDataObj.school_number);
    formDataObj.region = Number(formDataObj.region);
    formDataObj.admin = Number(formDataObj.admin);
  
    
    console.log(e.target.value, formDataObj, this.state.id, this.state.tuman);
    axios
      .post(`${url}/school/`, formDataObj)
      .then((res) => {
        GLOBAL.id = res.data.id;
        GLOBAL.user = this.state.id;
        window.localStorage.setItem("token", res.data.token);
        this.setState({ dashbord: true });
      })
      .catch((err) => {
        message.error("Ma'lumot kiritlmadi");
      });
  };

  render() {
    return this.state.dashbord === false ? (
      <div className={style.formDiv}>
        {this.state.info ? (
          <div className={style.loginBox} style={{ width: "600px" }}>
            <h2>Maktabni malumotlari</h2>
            <Form className={style.From} onSubmit={this.Maktab}>
              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} className={style.Forminput} type="number" name="school_number" required={true} />
                <Form.Label className={style.formLabel}>Raqami</Form.Label>
              </Form.Group>

              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} defaultValue="" className={style.Forminput} type="text" name="school_name" />
                <Form.Label className={style.formLabel}>Nomi</Form.Label>

                <Form.Text className="text-muted">Maktab nomini to'liq yozing. Agar maktabni maxsus nomi bo'lmasa bu joyni bo'sh qoldiring.</Form.Text>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <select
                  name="region"
                  onChange={(e) => {
                    this.onChange(e.target.value);
                  }}
                  className={style.Forminput}
                >
                  {this.state.viloyat.length !== 0
                    ? this.state.viloyat.map((item) => {
                        return (
                          <option value={item.id}>
                            {item.address} {item.region_name} tumani
                          </option>
                        );
                      })
                    : ""}
                </select>
                <Form.Text className="text-muted">Maktab qaysi tuman tarkibiga kirishini tanlang</Form.Text>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <select
                  name="type"
                  onChange={(e) => {
                    this.onChange(e.target.value);
                  }}
                  className={style.Forminput}
                
                >
                  <option value="Ayrim fanlar chuqur o'rganiladigan ixtisoslashtirilgan davlat umumiy o'rta ta'lim maktabi">Ayrim fanlar chuqur o'rganiladigan ixtisoslashtirilgan davlat umumiy o'rta ta'lim maktabi</option>
                  <option value="Iqtisoslashtirilgan davlat umuta'lim maktabi">Iqtisoslashtirilgan davlat umuta'lim maktabi</option>
                  <option value="Davlat umumta'lim maktabi">Davlat umumta'lim maktabi</option>
                  <option value="Xususiy maktab">Xususiy maktab</option>
                  <option value="Prezident maktabi">Prezident maktabi</option>
                </select>
                <Form.Text className="text-muted">Maktab qaysi tuman tarkibiga kirishini tanlang</Form.Text>
              </Form.Group>

              <Button className={style.sub} type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Kirish
              </Button>
            </Form>
          </div>
        ) : this.state.verify ? (
          <div className={style.loginBox}>
            <h2>Tizimga kirish</h2>
            <Form className={style.From} onSubmit={this.loginVeb}>
              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} className={style.Forminput} value={this.state.username} type="text" name="username" required={true} />
                <Form.Label className={style.formLabel}>Login</Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} className={style.Forminput} type="password" name="password" required={true} />
                <Form.Label className={style.formLabel}>Parol</Form.Label>
              </Form.Group>
              <p style={{ color: "white" }}>Emailingizga yuborilgan parolni kiriting</p>
              <Button className={style.sub} type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Kirish
              </Button>
            </Form>
          </div>
        ) : !this.state.login ? (
          <div className={style.loginBox}>
            <h2>Tizimga kirish</h2>
            <Form className={style.From} onSubmit={this.login}>
              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} className={style.Forminput} type="text" name="username" id="username" required={true} />
                <Form.Label className={style.formLabel}>Login</Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} className={style.Forminput} type="password" name="password" required={true} />
                <Form.Label className={style.formLabel}>Parol</Form.Label>
              </Form.Group>
              <p style={{ color: "white" }}>Tizim admini tomonidan berilgan login va parolni kiriting</p>
              <Button className={style.sub} type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Kirish
              </Button>
            </Form>
          </div>
        ) : (
          <div className={style.loginBox}>
            <h2>Email tasdiqlash</h2>
            <Form className={style.From} onSubmit={this.verify}>
              <Form.Group className={style.userBox}>
                <Form.Control style={{ outline: "none" }} className={style.Forminput} type="email" name="email" required={true} />
                <Form.Label className={style.formLabel}>Email</Form.Label>
              </Form.Group>

              <p style={{ color: "white" }}>Emailingizni kiriting</p>
              <Button className={style.sub} type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Kirish
              </Button>
            </Form>
          </div>
        )}
      </div>
    ) : (
      <Redirect to="/home/dashboard/uz" />
    );
  }
}
