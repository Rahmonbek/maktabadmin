import React, { Component } from "react";
import styles from "../css/admin.module.css";
import { Form, Button, Table } from "react-bootstrap";
import { message, Select, Image } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import ImageDemo from "./ImageDemo";
import { url } from "../host/Host";
import axios from "axios";
import GLOBAL from "../host/Global";
import Loader from "./Loader";
import Global from "../host/Global";
import user from "../img/user.png";
export default class Yutuqlar extends Component {
  state = {
    loading: true,
    edit: null,
    teachers: null,
    student: [],
    clas: null,
    students: null,
    sinf: null,
    image: null,
    imageData: null,
    yutuqlar: null,
    stu: null,
    yutuq: {},
    competition: "",
    result: "",
    text: "",
    school: Global.id,
    pupils: "",
  };
  // echoPupil = (id) => {
  //   var f = "";
  //   if (this.state.stu !== null) {
  //     this.state.stu.map((item) => {
  //       if (item.id === id) {
  //         f = item.full_name;
  //       }
  //     });
  //   }
  //   return f;
  // };
  // setUstoz = (value) => {
  //   this.setState({
  //     sinf: value,
  //   });
  // };
  deleteTeacher = (id) => {
    axios
      .delete(`${url}/achiviment/${id}`)
      .then((res) => {
        message.success("Ma'lumot o'chirildi");
        this.getYutuq();
      })
      .catch((err) => {
        message.error("Ma'lumot o'chirilmadi");
      });
  };
  reset = () => {
    this.setState({
      student: [],
      image: null,
      sinf: null,
      edit: null,
      yutuq: {},
      imageData: null,
      pupils: "",
      text: "",
      competition: "",
      result: "",
    });
    // document.getElementById("formBasiccompetition").value = "";
    // document.getElementById("formBasictext").value = "";
    // document.getElementById("formBasicresult").value = "";
  };
  editTeacher = (id) => {
    this.setState({
      student: this.state.yutuqlar[id].pupils,
      edit: this.state.yutuqlar[id].id,
      pupils: this.state.yutuqlar[id].pupils,
      text: this.state.yutuqlar[id].text,
      competition: this.state.yutuqlar[id].competition,
      result: this.state.yutuqlar[id].result,
      imageData: this.state.yutuqlar[id].image,
    });
    // document.getElementById("formBasiccompetition").value =
    //   this.state.yutuqlar[id].competition;
    // document.getElementById("formBasictext").value =
    //   this.state.yutuqlar[id].text;
    // document.getElementById("formBasicresult").value =
    //   this.state.yutuqlar[id].result;
  };

  componentDidMount() {
    // axios.get(`${url}/pupil/`).then((res) => {
    //   this.setState({
    //     students: res.data,
    //     stu: res.data,
    //   });
    //   axios.get(`${url}/class/`).then((res1) => {
    //     var clas = [];

    //     res1.data.map((fer) => {
    //       if (fer.school === GLOBAL.id) {
    //         clas.push(fer);
    //       }
    //     });

    //     this.setState({
    //       clas: clas,
    //     });
    //   });
    // });
    this.getYutuq();
  }
  getYutuq = () => {
    axios.get(`${url}/achiviment/${this.state.school}`).then((res) => {
      this.setState({
        yutuqlar: res.data,
        loading: false,
      });
    });
  };
  addYutuq = (e) => {
    // e.preventDefault();
    const formData = new FormData();

    formData.append(
      "competition",
      // document.getElementById("formBasiccompetition").value ?? ""
      this.state.competition ?? ""
    );
    formData.append(
      "text",
      // document.getElementById("formBasictext").value ?? ""
      this.state.text ?? ""
    );
    formData.append(
      "result",
      // document.getElementById("formBasicresult").value ?? ""
      this.state.result ?? ""
    );
    formData.append("pupils", this.state.pupils ?? null);
    formData.append("school", this.state.school ?? null);

    // var formDataObj = Object.fromEntries(formData.entries());

    // formDataObj.id = Number(formDataObj.id);

    if (this.state.edit !== null) {
      if (this.state.image !== null)
        formData.append("image", this.state.image ?? "");
      axios
        .patch(`${url}/achiviment/${this.state.edit}/`, formData)
        .then((res) => {
          this.getYutuq();
          this.reset();
          message.success("Ma'lumot o'zgartirildi.");
          // if (this.state.student.lenght !== 0) {
          //   axios
          //     .put(`${url}/achiviment/${this.state.edit}/`, {
          //       pupils: this.state.student,
          //     })
          //     .then((res) => {
          //       this.reset();
          //       message.success("Ma'lumot qo'shildi.");
          //       this.getYutuq();
          //     })
          //     .catch((err) => {
          //       message.success("Ma'lumot o'zgartirilmadi!");
          //     });
          // } else {
          //   this.reset();
          //   this.getYutuq();
          //   message.success("Ma'lumot o'gartirildi.");
          // }
        })
        .catch((err) => {
          message.success("Ma'lumot o'zgartirilmadi!");
        });
    } else {
      formData.append("image", this.state.image ?? "");
      axios
        .post(`${url}/achiviment/`, formData)
        .then((res) => {
          //   axios
          //     .put(`${url}/achiviment/${res.data.id}/`, {
          //       pupils: this.state.student,
          //     })
          //     .then((res) => {
          //       this.reset();
          //       message.success("Ma'lumot qo'shildi");
          //       this.getYutuq();
          //     })
          //     .catch((err) => {
          //       message.error("Ma'lumot qo'shilmadi");
          //     });
          message.success("Ma'lumot qo'shildi.");
          this.getYutuq();
        })
        .catch((err) => {
          message.error("Ma'lumot qo'shilmadi!");
        });
    }
  };
  customRequest = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ imageData: reader.result, image: e.target.files[0] });
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  handleChange = (value) => {
    this.setState({
      student: value,
    });
  };
  // fer = (clasa, st) => {
  //   var clas = [];
  //   clasa.map((item) => {
  //     var f = [];
  //     st.map((item1) => {
  //       if (item.id === item1.clas) {
  //         f.push(item1);
  //       }
  //     });
  //     if (f.length === 0) {
  //       clas.push(null);
  //     } else {
  //       clas.push(f);
  //     }
  //   });
  //   this.setState({ students: clas, sinf: 0 });
  // };
  changeCompetition = (e) => {
    this.setState({ competition: e.target.value });
  };
  changeResult = (e) => {
    this.setState({ result: e.target.value });
  };
  changePupils = (e) => {
    this.setState({ pupils: e.target.value });
  };
  changeText = (e) => {
    this.setState({ text: e.target.value });
  };
  render() {
    // const { Option } = Select;
    return (
      <div>
        {" "}
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <Container fluid>
              <Row>
                <Col lg={12} id="1">
                  <h1
                    style={{ fontSize: "30px", marginLeft: "10px" }}
                    className={styles.adminTop}
                  >
                    Yutuqlar
                  </h1>
                  <Row>
                    <Col lg={12}>
                      <div className={styles.formAdmin}>
                        <h4>Yutuq kiritish</h4>
                        <Form>
                          {/* <Form.Group required={true} controlId="sinf">
                            <Select
                              required={true}
                              showSearch
                              style={{ width: "100%" }}
                              value={this.state.sinf}
                              placeholder="Sinf"
                              optionFilterProp="children"
                              onChange={this.setUstoz}
                            >
                              {this.state.clas !== null
                                ? this.state.clas.map((item, key) => {
                                    return (
                                      <Option
                                        value={key}
                                        label={
                                          item.class_number +
                                          ' "' +
                                          item.class_char +
                                          '" - sinf'
                                        }
                                      >
                                        {item.class_number +
                                          ' "' +
                                          item.class_char +
                                          '" - sinf'}
                                      </Option>
                                    );
                                  })
                                : ""}
                            </Select>
                          </Form.Group> */}

                          {/* <Form.Group required={true} controlId="name">
                            <Select
                              mode="multiple"
                              allowClear
                              optionLabelProp="label"
                              style={{ width: "100%" }}
                              placeholder="O'quvchiarni tanlang"
                              value={this.state.student}
                              onChange={this.handleChange}
                            >
                              {this.state.sinf !== null
                                ? this.state.sinf !== null &&
                                  this.state.students !== null &&
                                  this.state.students[this.state.sinf] !== null
                                  ? this.state.students.length !== 0
                                    ? this.state.students[this.state.sinf].map(
                                        (item) => {
                                          return (
                                            <Option
                                              value={item.id}
                                              label={item.full_name}
                                            >
                                              {item.full_name}
                                            </Option>
                                          );
                                        }
                                      )
                                    : ""
                                  : this.state.stu !== null
                                  ? this.state.stu.map((item) => {
                                      return (
                                        <Option
                                          value={item.id}
                                          label={item.full_name}
                                        >
                                          {item.full_name}
                                        </Option>
                                      );
                                    })
                                  : ""
                                : ""}
                            </Select>
                          </Form.Group> */}
                          <Row>
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasiccompetition"
                              >
                                <Form.Label>Tanlov nomini kiriting</Form.Label>
                                <Form.Control
                                  className="formInput"
                                  required={true}
                                  type="text"
                                  name="competition"
                                  value={this.state.competition}
                                  onChange={this.changeCompetition}
                                  placeholder="Tanlov nomini kiriting"
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicresult"
                              >
                                <Form.Label>
                                  Tanlovda olgan o'rnini kiriting
                                </Form.Label>
                                <Form.Control
                                  className="formInput"
                                  required={true}
                                  type="text"
                                  name="result"
                                  value={this.state.result}
                                  onChange={this.changeResult}
                                  placeholder="Tanlovda olgan o'rnini kiriting"
                                />
                              </Form.Group>
                              <Form.Group
                                required={true}
                                controlId="formBasictext"
                                className="mb-3"
                              >
                                <Form.Label>
                                  Tanlovda ishtirok etgan o'quvchilar
                                </Form.Label>
                                <Form.Control
                                  className="formInput"
                                  required={true}
                                  as="textarea"
                                  name="pupils"
                                  row={2}
                                  placeholder="Tanlovda ishtirok etgan o'quvchilar"
                                  value={this.state.pupils}
                                  onChange={this.changePupils}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="rasm" className="mb-3">
                                <Form.Label>Tanlov rasmini kiriting</Form.Label>
                                <Form.Control
                                  className="formInput"
                                  type="file"
                                  required={
                                    this.state.edit === null ? true : false
                                  }
                                  onChange={this.customRequest}
                                  placeholder="Rasm kiriting"
                                />
                              </Form.Group>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  src={
                                    this.state.imageData !== null
                                      ? this.state.imageData
                                      : user
                                  }
                                  height={160}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Form.Group
                            required={true}
                            controlId="formBasictext"
                            className="mb-3"
                          >
                            <Form.Label>Qo'shimcha ma'lumot</Form.Label>
                            <Form.Control
                              className="formInput"
                              required={true}
                              as="textarea"
                              name="text"
                              value={this.state.text}
                              onChange={this.changeText}
                              placeholder="Yutuq haqida qisqacha yozing..."
                              style={{ height: "200px" }}
                            />
                          </Form.Group>
                          <Button
                            variant="primary"
                            className={styles.inputFormBtn}
                            onClick={this.addYutuq}
                          >
                            O'zgarishlarni saqlash
                          </Button>
                          <Button
                            variant="primary"
                            className={styles.inputFormBtn1}
                            onClick={this.reset}
                          >
                            Bekor qilish
                          </Button>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={12}>
                  <Table
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      boxShadow:
                        "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
                      borderRadius: "5px",
                    }}
                  >
                    <thead style={{ borderBottom: "none" }}>
                      <tr style={{ borderBottom: "none" }}>
                        <th>#</th>
                        <th>O'quvchi(lar)</th>
                        <th>Tanlov</th>
                        <th>O'rin</th>
                        <th>Rasm</th>
                        <th>O'zgartirish</th>
                        <th>O'chirish</th>
                      </tr>
                    </thead>
                    <tbody style={{ border: "none" }}>
                      {this.state.yutuqlar !== null
                        ? this.state.yutuqlar.map((item, key) => {
                            return (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{item.pupils}</td>
                                <td>{item.competition}</td>
                                <td>{item.result}</td>
                                <td>
                                  {item.image !== null
                                    ? ImageDemo(item.image)
                                    : ""}
                                  {/* <img
                                    alt="..."
                                    src={item.image}
                                    style={{ width: "100px" }}
                                  /> */}
                                </td>
                                <td>
                                  <Button
                                    style={{
                                      backgroundColor: "#187CC0",
                                      padding: "3px 10px",
                                      fontSize: "17px",
                                      border: "none",
                                    }}
                                    onClick={() => this.editTeacher(key)}
                                  >
                                    O'zgartirish
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    style={{
                                      backgroundColor: "#187CC0",
                                      padding: "3px 10px",
                                      fontSize: "17px",
                                      border: "none",
                                    }}
                                    onClick={() => this.deleteTeacher(item.id)}
                                  >
                                    O'chirish
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    );
  }
}
