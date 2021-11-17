import React, { Component } from "react";
import styles from "../css/admin.module.css";
import { Form, Button, Table } from "react-bootstrap";
import { DatePicker, message, Select } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import rasm from "../img/school19.jpg";
import { url } from "../host/Host";
import axios from "axios";
import GLOBAL from "../host/Global";
import Loader from "./Loader";
import Global from "../host/Global";
import ImageDemo from "./ImageDemo";
import moment from "moment";
export default class Yutuqlar extends Component {
  state = {
    loading: true,
    editId: null,
    fullname: "",
    // teachers: null,
    // student: [],
    // clas: null,
    students: null,
    sinf: null,
    sinfA: "",
    image: null,
    imageData: null,
    date: moment("2005-01-01", "YYYY-MM-DD"),
    dateF: "",
  };
  // setUstoz = (value) => {
  //   this.setState({
  //     sinf: value,
  //   });
  // };
  // deleteTeacher = (id) => {
  //   var newteachers = this.state.teachers;
  //   newteachers.splice(id, 1);
  //   this.setState({
  //     teachers: newteachers,
  //   });
  // };
  // editTeacher = (id) => {
  //   var newteacher1 = {
  //     name: this.state.teachers[id].name,
  //     yutuq: this.state.teachers[id].yutuq,
  //     orin: this.state.teachers[id].orin,
  //     rasm: this.state.teachers[id].rasm,
  //   };
  //   this.setState({
  //     teacher1: newteacher1,
  //     edit: id,
  //   });
  // };
  deleteExcellent = (id) => {
    this.setState({ loading: true});

    axios
      .delete(`${url}/excellent/${id}/`)
      .then((res) => {
        this.getExcellent();
        message.success("Ma'lumot o'chirildi.");
      })
      .catch((err) => {
    this.setState({ loading: false});
        
        message.error("Ma'lumot o'chirilmadi!")});
  };
  editExcellent = (id) => {
    var clas = this.state.students[id].clas;
    var sinf = clas.split(" ");
    var sinfA = clas.split('"');
    this.setState({
      editId: this.state.students[id].id,
      sinf: sinf[0],
      sinfA: sinfA[1],
      fullname: this.state.students[id].full_name,
      date: moment(this.state.students[id].birth_day, "YYYY-MM-DD"),
      imageData: url + this.state.students[id].image,
    });
  };
  getExcellent = () => {
    axios
      .get(`${url}/excellent-by-school/${Global.id}/`)
      .then((res) => {
        this.setState({ loading: false, students: res.data });
      })
      .catch((err) => {
        this.setState({ loading: false});

        message.error("Ma'lumot topilmadi! Iltimos qaytatdan urinib ko'ring!");
      });
  };
  componentDidMount() {
    // axios.get(`${url}/pupil/`).then((res) => {
    //   this.setState({
    //     students: res.data,
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
    //     setTimeout(() => {
    //       this.fer(clas, res.data);
    //     }, 500);
    //     this.setState({ loading: false });
    //   });
    // });
    this.getExcellent();
  }
  dateChange = (date, dateF) => {
    this.setState({ date: date, dateF: dateF });
  };
  imageChange = (e) => {
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
  classChange = (e) => {
    this.setState({ sinf: e.target.value });
  };
  classAChange = (e) => {
    this.setState({ sinfA: e.target.value.toUpperCase() });
  };
  fullnameChange = (e) => {
    this.setState({ fullname: e.target.value });
  };
  addYutuq = () => {
    this.setState({ loading: true});

    var clas = "";
    clas = this.state.sinf + ' - "' + this.state.sinfA + '" sinf';
    var formData = new FormData();
    formData.append("full_name", this.state.fullname ?? null);
    formData.append("clas", clas ?? null);
    formData.append("birth_day", this.state.dateF ?? null);
    formData.append("school", Global.id ?? null);
    if (this.state.editId === null) {
      formData.append("image", this.state.image ?? null);
      axios
        .post(`${url}/excellent/`, formData)
        .then((res) => {
          message.success("Ma'lumot qo'shildi.");
          this.getExcellent();
          this.reset1();
        })
        .catch((err) => {
    this.setState({ loading: false});

          message.error("Ma'lumot qo'shilmadi!");
        });
    } else {
      if (this.state.image !== null) {
        formData.append("image", this.state.image ?? null);
      }
      axios
        .patch(`${url}/excellent/${this.state.editId}/`, formData)
        .then((res) => {
          message.success("Ma'lumot qo'shildi.");
          this.getExcellent();
          this.reset1();
        })
        .catch((err) => {
    this.setState({ loading: false});

          message.error("Ma'lumot qo'shilmadi!");
        });
    }
  };
  // handleChange = (value) => {
  //   this.setState({
  //     student: value,
  //   });
  // };
  // fer = (clasa, st) => {
  //   var clas = [];
  //   clasa.map((item) => {
  //     var f = [];
  //     st.map((item1) => {
  //       if (item.id === item1.clas) {
  //         f.push(item1);
  //       }
  //     });
  //     if (f.length == 0) {
  //       clas.push(null);
  //     } else {
  //       clas.push(f);
  //     }
  //   });
  //   this.setState({ students: clas, sinf: 0 });
  // };
  reset1 = () => {
    this.setState({
      sinf: null,
      sinfA: "",
      date: moment("2005-01-01", "YYYY-MM-DD"),
      dateF: "",
      fullname: "",
      imageData: null,
    });
  };
  render() {
    const { Option } = Select;
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <Container fluid>
              <Row>
                <Col lg={12} id="1">
                  <Row>
                    <Col lg={12}>
                      <div className={styles.formAdmin}>
                        <h4>A'lochi o'quvchini tanlang</h4>
                        <Form onSubmit={this.addYutuq}>
                          {/* <Form.Group controlId="sinf">
                            <Select
                              required={true}
                              showSearch
                              style={{ width: "100%" }}
                              defaultValue={this.state.sinf}
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

                          {/* <Form.Group controlId="name">
                            <Select
                              required={true}
                              showSearch
                              style={{ width: "100%" }}
                              placeholder="O'quvchi tanlang"
                              optionFilterProp="children"
                              onChange={this.handleChange}
                              >
                              {this.state.sinf !== null &&
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
                                        : ""}
                                        </Select>
                                      </Form.Group> */}
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <Form.Group controlId="sinf">
                                    <Form.Label>
                                      O'quvchining sinf raqamini kiriting
                                    </Form.Label>
                                    <Form.Control
                                      type="number"
                                      min="1"
                                      max="11"
                                      onChange={this.classChange}
                                      value={this.state.sinf}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group controlId="sinfA">
                                    <Form.Label>
                                      O'quvchining sinf harfini kiriting
                                    </Form.Label>
                                    <Form.Control
                                      maxLength="1"
                                      onChange={this.classAChange}
                                      value={this.state.sinfA}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Form.Group controlId="name">
                                <Form.Label>
                                  O'quvchining F.I.Sh. ni kiriting
                                </Form.Label>
                                <Form.Control
                                  onChange={this.fullnameChange}
                                  value={this.state.fullname}
                                />
                              </Form.Group>
                              <Form.Group controlId="birthday">
                                <Form.Label>
                                  O'quvchining tug'ilgan sanasini kiriting
                                </Form.Label>
                                <br />
                                <DatePicker
                                  format="YYYY-MM-DD"
                                  onChange={this.dateChange}
                                  value={this.state.date}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="image">
                                <Form.Label>
                                  O'quvchining rasmini kiriting
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  accept="image/*"
                                  onChange={this.imageChange}
                                />
                                <br />
                                <div>
                                  {this.state.imageData !== null
                                    ? ImageDemo(this.state.imageData)
                                    : ""}
                                </div>
                              </Form.Group>
                            </Col>
                          </Row>
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
                            onClick={this.reset1}
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
                    <thead
                      style={{ borderBottom: "none", textAlign: "center" }}
                    >
                      <tr style={{ borderBottom: "none" }}>
                        <th>#</th>
                        <th>F.I.O</th>
                        <th>Sinf</th>
                        <th>Tug'ilgan kuni</th>
                        <th>Rasm</th>
                        <th>O'zgartirish</th>
                        <th>O'chirish</th>
                      </tr>
                    </thead>
                    <tbody style={{ border: "none" }}>
                      {this.state.students !== null &&
                      this.state.students.length !== 0 ? (
                        this.state.students.map((item, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{item.full_name}</td>
                              <td>{item.clas}</td>
                              <td>{item.birth_day}</td>
                              <td>
                                {item.image !== null
                                  ? ImageDemo(url + item.image)
                                  : ""}
                              </td>
                              <td>
                                <Button
                                  style={{
                                    backgroundColor: "#187CC0",
                                    padding: "3px 10px",
                                    fontSize: "17px",
                                    border: "none",
                                  }}
                                  onClick={() => this.editExcellent(key)}
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
                                  onClick={() => this.deleteExcellent(item.id)}
                                >
                                  O'chirish
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7">
                            <h5 style={{ textAlign: "center", color: "red" }}>
                              Ma'lumot topilmadi!
                            </h5>
                          </td>
                        </tr>
                      )}
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
