import { Button, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { createClass, deleteClass, editClass, getClass, getXodim } from "../host/Config";
import { id, url } from "../host/Host";

export default class Sinflar extends Component {
    state = {
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
        getXodim()
            .then((res) => this.setState({ curators: res.data }))
            .catch((err) => console.log(err));
    };
    getClass = () => {
        getClass()
            .then((res) => {
                var classes = res.data;
                for (let i = 0; i < classes.length; i++) {
                    classes[i].key = i + 1;
                }
                this.setState({
                    classes: res.data,
                });
            })
            .catch((err) => console.log(err));
    };
    editClass = (id) => {
        axios
            .get(`${url}/class/${id}`)
            .then((res) => {
                document.getElementById("classNumber").value = res.data[id].class_number;
                document.getElementById("classChar").value = res.data[id].class_char;
                this.setState({
                    editId: res.data[id].id,
                    curator: res.data[id].curator,
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
            school: id,
        };
        if (this.state.editId !== null) {
            console.log(classes);
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
        this.getClass();
        this.getCurator();
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
            },
            {
                title: "Sinf raqami",
                dataIndex: "class_number",
                key: "class_number",
            },
            {
                title: "Sinf",
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
        return (
            <div>
                <Button type="primary" width="60%" onClick={this.openModal}>
                    Sinf yaratish
                </Button>
                <br />
                <br />
                <Table style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} columns={columns} dataSource={this.state.classes} />
                <Modal title="Sinf yaratish" visible={this.state.show} onCancel={this.handleCancel} footer={false}>
                    <Form>
                        <Form.Group className="mb-3" controlId="curator">
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
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="classNumber">
                            <Form.Label>Sinf raqami</Form.Label>
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
                        <Button type="primary" htmlType="button" onClick={this.createClass}>
                            Saqlash
                        </Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}
