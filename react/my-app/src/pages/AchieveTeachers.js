import React, { Component } from "react";
import Loader from "./Loader";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Button, Table } from "react-bootstrap";
import { Image, message, Modal } from "antd";
import { url } from "../host/Host";
import axios from "axios";
import Global from "../host/Global";
import ImageDemo from "./ImageDemo";
import moment from "moment";
import styles from "../css/admin.module.css";

export default class AchieveTeachers extends Component {
    state = {
        loading: true,
        teachers: null,
        editId: null,
        fullname: "",
        position: "",
        speciality: "",
        phone: "",
        description: "",
        image: null,
        imageData: null,
        text: "",
        title: "",
        show: false,
    };

    openModal = (key) => {
        this.setState({
            show: true,
            text: this.state.teachers[key].description,
            title: this.state.teachers[key].full_name + " haqida ma'lumot",
        });
    };
    closeModal = () => {
        this.setState({ show: false, text: "", title: "" });
    };
    deleteActiveT = (id) => {
        this.setState({ loading: true });
        axios
            .delete(`${url}/active-teachers/${id}/`)
            .then((res) => {
                this.getActiveT();
                message.success("Ma'lumot o'chirildi.");
            })
            .catch((err) => {
                this.setState({ loading: false });
                message.error("Ma'lumot o'chirilmadi!");
            });
    };
    editActiveT = (id) => {
        this.setState({
            editId: this.state.teachers[id].id,
            fullname: this.state.teachers[id].full_name,
            position: this.state.teachers[id].position,
            phone: this.state.teachers[id].phone.slice(5),
            speciality: this.state.teachers[id].speciality,
            description: this.state.teachers[id].description,
            imageData: url + this.state.teachers[id].imageURL,
        });
    };
    getActiveT = () => {
        axios
            .get(`${url}/active-teachers/?school=${Global.id}`)
            .then((res) => {
                this.setState({ loading: false, teachers: res.data });
            })
            .catch((err) => {
                this.setState({ loading: false });
                message.error("Ma'lumot topilmadi! Iltimos qaytatdan urinib ko'ring!");
            });
    };
    componentDidMount() {
        this.getActiveT();
    }
    imageChange = (e) => {
        if (e.target.value !== "") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    this.setState({ imageData: reader.result, image: e.target.files[0] });
                }
            };
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
        } else {
            this.setState({ imageData: null, image: null });
        }
    };
    fullnameChange = (e) => {
        this.setState({ fullname: e.target.value });
    };
    positionChange = (e) => {
        this.setState({ position: e.target.value });
    };
    phoneChange = (e) => {
        if (e.nativeEvent.data === null) {
            this.setState({ phone: e.target.value });
        } else if (e.nativeEvent.data !== undefined) {
            if (e.nativeEvent.data.charCodeAt(0) >= 48 && e.nativeEvent.data.charCodeAt(0) <= 57) {
                this.setState({ phone: e.target.value });
            }
        }
    };
    specialityChange = (e) => {
        this.setState({ speciality: e.target.value });
    };
    descriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };
    saveActiveT = () => {
        this.setState({ loading: true });
        var formData = new FormData();
        formData.append("full_name", this.state.fullname ?? null);
        formData.append("position", this.state.position ?? null);
        formData.append("phone", "+998 " + this.state.phone ?? null);
        formData.append("description", this.state.description ?? null);
        formData.append("speciality", this.state.speciality ?? null);
        formData.append("school", Global.id ?? null);
        if (this.state.editId === null) {
            formData.append("image", this.state.image ?? null);
            axios
                .post(`${url}/active-teachers/`, formData)
                .then((res) => {
                    message.success("Ma'lumot qo'shildi.");
                    this.getActiveT();
                    this.reset1();
                })
                .catch((err) => {
                    this.setState({ loading: false });
                    message.error("Ma'lumot qo'shilmadi!");
                });
        } else {
            if (this.state.image !== null) {
                formData.append("image", this.state.image ?? null);
            }
            axios
                .patch(`${url}/active-teachers/${this.state.editId}/`, formData)
                .then((res) => {
                    message.success("Ma'lumot o'zgardi.");
                    this.getActiveT();
                    this.reset1();
                })
                .catch((err) => {
                    this.setState({ loading: false });
                    message.error("Ma'lumot o'zgarmadi!");
                });
        }
    };
    reset1 = () => {
        this.setState({
            fullname: "",
            position: "",
            speciality: "",
            phone: "",
            description: "",
            imageData: null,
            image: null,
            editId: null,
        });
    };
    render() {
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
                                                <Form onSubmit={this.saveActiveT}>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group controlId="fullname">
                                                                <Form.Label>
                                                                    O'qituvchining F.I.Sh. ni kiriting
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={this.fullnameChange}
                                                                    value={this.state.fullname}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group controlId="position">
                                                                <Form.Label>
                                                                    O'qituvchining lavozimini kiriting
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={this.positionChange}
                                                                    value={this.state.position}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group controlId="speciality">
                                                                <Form.Label>
                                                                    O'qituvchining mutaxasisligini kiriting
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={this.specialityChange}
                                                                    value={this.state.speciality}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group controlId="phone">
                                                                <Form.Label>
                                                                    O'qituvchining telefon raqamini kiriting
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="tel"
                                                                    onChange={this.phoneChange}
                                                                    value={this.state.phone}
                                                                    placeholder="991234567"
                                                                />
                                                            </Form.Group>
                                                            {this.state.phone !== "" ? (
                                                                <p disabled>+998 {this.state.phone}</p>
                                                            ) : (
                                                                ""
                                                            )}
                                                            <Form.Group controlId="description">
                                                                <Form.Label>Qisqacha ma'lumot</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={3}
                                                                    onChange={this.descriptionChange}
                                                                    value={this.state.description}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="image">
                                                                <Form.Label>O'qituvchining rasmini kiriting</Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={this.imageChange}
                                                                />
                                                                <br />
                                                                <div>
                                                                    {this.state.imageData !== null ? (
                                                                        <Image
                                                                            src={this.state.imageData}
                                                                            alt="O'qituvchi rasmi"
                                                                            height={160}
                                                                        />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        variant="primary"
                                                        // className={styles.inputFormBtn}
                                                        style={{ marginRight: 20 }}
                                                        onClick={this.saveActiveT}
                                                    >
                                                        O'zgarishlarni saqlash
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        // className={styles.inputFormBtn1}
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
                                        <thead style={{ borderBottom: "none", textAlign: "center" }}>
                                            <tr style={{ borderBottom: "none" }}>
                                                <th>T/r</th>
                                                <th>F.I.Sh.</th>
                                                <th>Lavozimi</th>
                                                <th>Mutaxasisligi</th>
                                                <th>Tel. raqami</th>
                                                <th>Rasmi</th>
                                                <th>Qisqacha ma'lumot</th>
                                                <th>O'zgartirish</th>
                                                <th>O'chirish</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ border: "none" }}>
                                            {this.state.teachers !== null && this.state.teachers.length !== 0 ? (
                                                this.state.teachers.map((item, key) => {
                                                    return (
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{item.full_name}</td>
                                                            <td>{item.position}</td>
                                                            <td>{item.speciality}</td>
                                                            <td>{item.phone}</td>
                                                            <td>
                                                                {item.imageURL !== null && item.imageURL !== ""
                                                                    ? ImageDemo(url + item.imageURL)
                                                                    : ""}
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="primary"
                                                                    style={{
                                                                        marginRight: "auto",
                                                                        marginLeft: "auto",
                                                                        display: "block",
                                                                    }}
                                                                    onClick={() => this.openModal(key)}
                                                                >
                                                                    Ko'proq
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    // style={{
                                                                    //     backgroundColor: "#187CC0",
                                                                    //     padding: "3px 10px",
                                                                    //     fontSize: "17px",
                                                                    //     border: "none",
                                                                    // }}
                                                                    variant="primary"
                                                                    onClick={() => this.editActiveT(key)}
                                                                >
                                                                    O'zgartirish
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    // style={{
                                                                    //     backgroundColor: "red",
                                                                    //     padding: "3px 10px",
                                                                    //     fontSize: "17px",
                                                                    //     border: "none",
                                                                    // }}
                                                                    onClick={() => this.deleteActiveT(item.id)}
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
                        <Modal
                            visible={this.state.show}
                            centered
                            title={this.state.title}
                            footer={false}
                            onCancel={() => this.closeModal()}
                        >
                            <p>{this.state.text}</p>
                        </Modal>
                    </div>
                )}
            </div>
        );
    }
}
