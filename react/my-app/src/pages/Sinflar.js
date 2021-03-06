import { Button, Select, Table } from "antd";
// import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import {
  createClass,
  deleteClass,
  editClass,
  getClass,
  getStaff,
} from "../host/Config";
import { url } from "../host/Host";
import GLOBAL from "../host/Global";
import Loader from "./Loader";

export default class Sinflar extends Component {
  state = {
    loading: true,
    classes: [],
    show: false,
    editId: null,
    curators: [],
    curator: null,
  };
  openModal = () => {
    this.setState({ show: true });
  };
  handleCancel = () => {
    this.setState({ show: false, editId: null, curator: null });
    document.getElementById("classNumber").value = "";
    document.getElementById("classChar").value = "";
  };
  getCurator = () => {
    getStaff()
      .then((res) => this.setState({ curators: res.data }))
      .catch((err) => console.log(err));
  };
  echoTeacher = (id) => {
    var f = "";
    if (this.state.curators !== null) {
      this.state.curators.map((item) => {
        if (item.id === id) {
          f = item.full_name;
        }
      });
    }
    return f;
  };
  getClass = () => {
    console.log(this.state.curators);
    // getClass()
    //   .then((res) => {
    //     var classes = res.data;
    //     for (let i = 0; i < classes.length; i++) {
    //       classes[i].key = i + 1;
    //     }
    //     this.setState({
    //       classes: res.data,
    //     });
    //   })
    //   .catch((err) => console.log(err));
    axios
      .get(`${url}/class/`)
      .then((res) => {
        var classes = [];
        res.data.map((item) => {
          return item.school === GLOBAL.id ? classes.push(item) : "";
        });
        for (let i = 0; i < classes.length; i++) {
          classes[i].key = i + 1;
        }
        this.setState({
          classes: classes,
        });
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
  };
  editClass = (id) => {
    axios
      .get(`${url}/class/${this.state.classes[id].id}`)
      .then((res) => {
        document.getElementById("classNumber").value = res.data.class_number;
        document.getElementById("classChar").value = res.data.class_char;
        this.setState({
          editId: res.data.id,
          curator: res.data.curator,
        });
      })
      .catch((err) => console.log(err));
    this.openModal();
  };
  createClass = () => {
    var classNumber = document.getElementById("classNumber").value;
    var classChar = document.getElementById("classChar").value;
    var classes = {
      curator: this.state.curator,
      class_number: classNumber,
      class_char: classChar,
      school: GLOBAL.id,
    };
    if (this.state.editId !== null) {
      editClass(classes, this.state.editId)
        .then((res) => this.getClass())
        .catch((err) => console.log(err));
    } else {
      createClass(classes)
        .then((res) => this.getClass())
        .catch((err) => console.log(err));
    }
    this.handleCancel();
  };
  deleteClass = (id) => {
    deleteClass(id)
      .then((res) => this.getClass())
      .catch((err) => console.log(err));
  };
  selected = (value) => {
    this.setState({ curator: value });
  };
  componentDidMount() {
    this.getCurator();
    this.getClass();
  }
  render() {
    const columns = [
      {
        title: "T/r",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Sinf rahbari",
        dataIndex: "curator",
        key: "curator",
        render: (curator) => {
          return this.echoTeacher(curator);
        },
      },
      {
        title: "Sinf raqami",
        dataIndex: "class_number",
        key: "class_number",
      },
      {
        title: "Sinf harfi",
        dataIndex: "class_char",
        key: "class_char",
      },
      {
        title: "O'zgartirish",
        dataIndex: "key",
        key: "key",
        render: (key) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.editClass(key - 1);
              }}
            >
              O'zgartirish
            </Button>
          );
        },
      },
      {
        title: "O'chirish",
        dataIndex: "id",
        key: "id",
        render: (id) => {
          return (
            <Button
              type="danger"
              onClick={() => {
                this.deleteClass(id);
              }}
            >
              O'chirish
            </Button>
          );
        },
      },
    ];
    const { Option } = Select;
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <Button type="primary" width="60%" onClick={this.openModal}>
              Sinf yaratish
            </Button>
            <br />
            <br />
            <Table
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              columns={columns}
              dataSource={this.state.classes}
            />
            <Modal
              title="Sinf yaratish"
              visible={this.state.show}
              onCancel={this.handleCancel}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3" controlId="curator">
                  <Form.Label>Sinf rahbari</Form.Label>
                  <Select
                    style={{ width: "100%" }}
                    value={
                      this.state.curator !== null ? this.state.curator : ""
                    }
                    onChange={this.selected}
                    optionLabelProp="label"
                  >
                    {this.state.curators !== null
                      ? this.state.curators.map((item) => {
                          return (
                            <Option value={item.id} label={item.full_name}>
                              {item.full_name}
                            </Option>
                          );
                        })
                      : ""}
                  </Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="classNumber">
                  <Form.Label>Sinf raqami</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="number"
                    min="1"
                    max="11"
                    placeholder="1"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="classChar">
                  <Form.Label>Sinf harfi</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="text"
                    placeholder="A"
                    pattern="[A-Z]{1}"
                  />
                </Form.Group>

                <br />

                <Button
                  type="danger"
                  htmlType="button"
                  style={{ marginRight: "10px" }}
                  onClick={this.handleCancel}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={this.createClass}
                >
                  Saqlash
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
