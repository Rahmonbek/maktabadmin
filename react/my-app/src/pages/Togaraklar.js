import React, { Component } from "react";
import styles from "../css/sport.module.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "antd/lib/modal/Modal";
import admin from "../img/user.png";
import { getCourses } from "../host/Config";

export default class Togaraklar extends Component {
  state = {
    teachers: [
      {
        rasm: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Zohidova Odina",
        lavozim: "Pianinachi",
        matn: "O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
        email: "odina@gmail.com",
        telefon: "+99923623565",
      },
      {
        rasm: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Raximov Asilbek",
        lavozim: "Gitara ustasi",
        matn: "O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
        email: "raximob@gmail.com",
        telefon: "+99956523565",
      },
      {
        rasm: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Asadova Mohinur",
        lavozim: "Skripkachi",
        matn: "O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
        email: "mohinur@gmail.com",
        telefon: "+99956523565",
      },
    ],
    show: false,
  };
  getCourses = () => {
    getCourses()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  openModal = () => {
    this.setState({ show: true });
  };
  handleCancel = () => {
    this.setState({ show: false });
  };
  createSubject = () => {
    console.log("dasdadsa");
  };
  componentDidMount() {
    this.getCourses();
  }
  render() {
    return (
      <div>
        <h1 style={{ fontSize: "30px", display: "inline-block", marginRight: "30px" }}>
          To'garaklar{" "}
          <Button onClick={this.openModal} style={{ marginLeft: "30px", backgroundColor: "#187CC0", border: "none" }}>
            Qo'shish
          </Button>
        </h1>
        <Row>
          {this.state.teachers.map((item, key) => {
            return (
              <Col lg={4} md={6} sm={12} style={{ marginTop: "20px" }}>
                <div className={styles.card}>
                  <div className={(styles.card, styles.cardone)}>
                    <header>
                      <div className={styles.avatar}>
                        <img src={item.image !== null ? item.image : admin} alt="" />
                      </div>
                    </header>

                    <h3 className={styles.headerName}>{item.name}</h3>
                    <div className={styles.desc}>
                      <p>{item.title}</p>
                      <p>{item.mentor}</p>
                      <p style={{ marginTop: "-40px", fontWeight: "800" }}>{item.address}</p>
                      <p style={{ marginTop: "-40px", fontWeight: "800" }}>{item.text}</p>
                    </div>

                    <footer className={styles.footer} style={{ marginTop: "-40px", fontWeight: "800" }}>
                      <FaEdit style={{ color: "green", fontSize: "20px" }} onClick={() => this.editTeacher1(key)} />
                      <MdDelete style={{ color: "red", fontSize: "20px", marginLeft: "20px" }} onClick={() => this.deleteTeacher1(key)} />
                    </footer>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Modal title="Sinf yaratish" visible={this.state.show} onCancel={this.handleCancel} footer={false}>
          <Form>
            {/* <Form.Group className="mb-3" controlId="curator">
                            <Form.Label>Sinf rahbari</Form.Label>
                            <Select style={{ width: "100%" }} defaultValue={this.state.curator} onChange={this.selected} optionLabelProp="label">
                                {this.state.curators !== null
                                    ? this.state.curators.map((item) => {
                                          console.log(item.id);
                                          return (
                                              <Option value={item.id} label={item.full_name}>
                                                  {item.full_name}
                                              </Option>
                                          );
                                      })
                                    : ""}
                            </Select>
                        </Form.Group> */}

            <Form.Group className="mb-3" controlId="classNumber">
              <Form.Label>Sinf id</Form.Label>
              <Form.Control type="number" min="1" max="11" placeholder="1" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="classChar">
              <Form.Label>Sinf</Form.Label>
              <Form.Control type="text" placeholder="A" pattern="[A-Z]{1}" />
            </Form.Group>

            <br />

            <Button type="danger" htmlType="button" style={{ marginRight: "10px" }} onClick={this.handleCancel}>
              Bekor qilish
            </Button>
            <Button type="primary" htmlType="button" onClick={this.createSubject}>
              Saqlash
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
