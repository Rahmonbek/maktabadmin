import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
  Form,
} from "react-bootstrap";
import {
  createXodim,
  deleteXodim,
  getSpec,
  editXodim,
  getXodim,
  patchXodim,
  register,
  getStaff,
} from "../host/Config";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import style from "../css/xodim.module.css";
import styles from "../css/modalStyle.css";
import clsx from "clsx";
import Modal from "antd/lib/modal/Modal";
import ImageDemo from "./ImageDemo";
import { Input, message, Select } from "antd";
import axios from "axios";
import { url } from "../host/Host";
import { Option } from "antd/lib/mentions";
import GLOBAL from "../host/Global";
import Loader from "./Loader";
export default class Oqituvchilar extends Component {
  state = {
    loading: true,
    mutaxassislik: [],
    visible: false,
    selectedFile: null,
    edit: null,
    previewImage: false,
    teachers: [],
    expanded: [],
    options: [],
    image: null,
    imageUrl: null,
    speciality: [],
    teach: {},
    fullname: "",
    position: "",
    phone: "",
    description: "",
  };
  openModal = () => {
    this.setState({
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
      speciality: [],
      image: null,
      edit: null,
      imageUrl: null,
      teach: {},
      previewImage: false,
      fullname: "",
      phone: "",
      position: "",
      description: "",
    });
  };
  echoOptions = (a) => {
    var g = "";
    this.state.options.map((item) => {
      if (item.id === a) {
        g = item.name;
      }
    });
    return g;
  };
  getSpec = () => {
    getSpec()
      .then((res) => {
        this.setState({ options: res.data });
      })
      .catch((err) => console.log(err));
  };
  getXodim = () => {
    getStaff()
      .then((res) => {
        this.setState({
          teachers: res.data,
        });
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
  };

  editXodim = (key) => {
    this.setState({
      fullname: this.state.teachers[key].full_name,
      phone: this.state.teachers[key].phone,
      position: this.state.teachers[key].position,
      description: this.state.teachers[key].description,
      edit: this.state.teachers[key].id,
      imageUrl: this.state.teachers[key].image,
      speciality: this.state.teachers[key].speciality,
      previewImage: true,
    });
    this.openModal();
  };
  saveXodim = () => {
    var full_name = document.getElementById("fullname").value;
    var phone = document.getElementById("phone").value;
    var description = document.getElementById("description").value;
    var position = document.getElementById("position").value;
    var speciality = this.state.speciality;

    let formData = new FormData();

    formData.append("position", position ?? "");
    formData.append("full_name", full_name ?? "");
    formData.append("phone", phone ?? "");
    formData.append("school", GLOBAL.id ?? "");
    formData.append("description", description ?? "");

    if (this.state.edit !== null) {
      if (this.state.image !== null) {
        formData.append("image", this.state.image ?? "");
      }
      editXodim(formData, this.state.edit)
        .then((res) => {
          editXodim(
            { speciality: this.state.speciality },
            this.state.edit
          ).then((res2) => {
            message.success("Xodim o'zgartildi.");
            this.hideModal();
            this.getXodim();
          });
        })
        .catch((err) => message.error("Xodim o'zgartilmadi!"));
    } else {
      formData.append("image", this.state.image ?? "");
      createXodim(formData)
        .then((res) => {
          patchXodim({ speciality: speciality }, res.data.id)
            .then((res1) => {
              this.hideModal();
              this.getXodim();
              message.success("Xodim saqlandi.");
            })
            .catch((err1) => {
              message.error("Xodim saqlanmadi!");
            });
        })
        .catch((err) => {
          message.error("Xodim saqlanmadi!");
        });
    }
  };
  deleteXodim = (id) => {
    deleteXodim(id)
      .then((res) => {
        this.getXodim();
        message.success("Xodim o'chirildi.");
      })
      .catch((err) => message.error("Xodim o'chirilmadi!"));
  };
  customRequest = (e) => {
    console.log(e.target.files[0].name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          imageUrl: reader.result,
          previewImage: true,
          image: e.target.files[0],
        });
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  fullName = (e) => {
    this.setState({ fullname: e.target.value });
  };
  position = (e) => {
    this.setState({ position: e.target.value });
  };
  phone = (e) => {
    this.setState({ phone: e.target.value });
  };
  description = (e) => {
    this.setState({ description: e.target.value });
  };
  handleExpandClick = (id) => {
    var a = this.state.expanded;
    a[id] = !a[id];
    this.setState({ expanded: a });
  };
  saveMutaxassislik = (e) => {
    var newmutax = e;
    this.setState({
      mutaxassislik: newmutax,
    });
  };
  handleChange = (selectedOption) => {
    this.setState({ speciality: selectedOption });
  };
  componentDidMount() {
    this.getXodim();
    this.getSpec();
  }

  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <Container fluid>
              <br />
              <br />
              <Button
                type="primary"
                onClick={() => {
                  this.openModal();
                }}
              >
                Xodim qo'shish
              </Button>
              <Row>
                {this.state.teachers !== []
                  ? this.state.teachers.map((item, key) => {
                      return (
                        <Col
                          lg={4}
                          md={6}
                          sm={12}
                          style={{ marginTop: "20px" }}
                        >
                          <Card className={style.root}>
                            <CardHeader title="Xodim" />
                            {item.image !== null ? (
                              <CardMedia
                                className={style.media}
                                image={item.image}
                                title={item.full_name}
                              />
                            ) : (
                              ""
                            )}
                            <CardContent>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <p>
                                  <b>F.I.Sh.: </b>
                                  {item.full_name}
                                </p>
                                <p>
                                  <b>Sohasi: </b>
                                  {item.speciality.map((item1) => {
                                    return this.echoOptions(item1) + " ";
                                  })}
                                </p>
                                <p>
                                  <b>Mutaxassislik: </b>
                                  {item.position}
                                </p>
                                <p>
                                  <b>Telefon raqami: </b>
                                  {item.phone}
                                </p>
                              </Typography>
                            </CardContent>
                            <CardActions
                              disableSpacing
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip
                                    id="button-tooltip-2"
                                    style={{
                                      marginTop: "15px",
                                    }}
                                  >
                                    O'zgartirish
                                  </Tooltip>
                                }
                              >
                                {({ ref, ...triggerHandler }) => (
                                  <Button
                                    onClick={() => {
                                      this.editXodim(key);
                                    }}
                                    variant="blue"
                                    {...triggerHandler}
                                    className="d-inline-flex align-items-center"
                                  >
                                    <Image ref={ref} />

                                    <IconButton>
                                      <BorderColorIcon />
                                    </IconButton>
                                  </Button>
                                )}
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip
                                    id="button-tooltip-2"
                                    style={{
                                      marginTop: "15px",
                                    }}
                                  >
                                    O'chirish
                                  </Tooltip>
                                }
                              >
                                {({ ref, ...triggerHandler }) => (
                                  <Button
                                    onClick={() => {
                                      this.deleteXodim(item.id);
                                    }}
                                    variant="#f70707d9"
                                    {...triggerHandler}
                                    className="d-inline-flex align-items-center"
                                  >
                                    <Image ref={ref} />

                                    <IconButton>
                                      <DeleteIcon />
                                    </IconButton>
                                  </Button>
                                )}
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip
                                    id="button-tooltip-2"
                                    style={{
                                      marginTop: "15px",
                                    }}
                                  >
                                    Xodim haqida batafsil ma'lumot
                                  </Tooltip>
                                }
                              >
                                {({ ref, ...triggerHandler }) => (
                                  <Button
                                    variant="#F2F2F2"
                                    {...triggerHandler}
                                    className="d-inline-flex align-items-center"
                                  >
                                    <Image ref={ref} />
                                    <IconButton
                                      className={clsx(styles.expand, {
                                        [styles.expandOpen]:
                                          this.state.expanded[key],
                                      })}
                                      onClick={() => {
                                        this.handleExpandClick(key);
                                      }}
                                      aria-expanded={this.state.expanded[key]}
                                      aria-label="show more"
                                    >
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Button>
                                )}
                              </OverlayTrigger>
                            </CardActions>
                            <Collapse
                              in={this.state.expanded[key]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <CardContent>
                                <Typography
                                  paragraph
                                  style={{
                                    fontSize: "16px",
                                  }}
                                >
                                  <p>Qo'shimcha ma'lumot</p>
                                  <p>{item.description}</p>
                                </Typography>
                              </CardContent>
                            </Collapse>
                          </Card>
                        </Col>
                      );
                    })
                  : ""}
              </Row>
            </Container>
            <Modal
              title="Xodim"
              width="70%"
              visible={this.state.visible}
              footer={false}
              onCancel={() => {
                this.hideModal();
              }}
            >
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="fullname">
                      <Form.Label>F.I.Sh.</Form.Label>
                      <Form.Control
                        onChange={this.fullName}
                        value={this.state.fullname}
                        className="formInput"
                        placeholder="F.I.Sh."
                      />
                    </Form.Group>
                    {/* {this.state.edit === null ? (
                  <div id="user">
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Login</Form.Label>
                      <Form.Control className="formInput" placeholder="Login" />
                    </Form.Group>
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        display: "none",
                      }}
                      className="registerRed"
                    >
                      Bu login tizimda bor boshqa login kiriting
                    </p>
                    <Form.Group className="mb-3 red" controlId="password">
                      <Form.Label>Parol</Form.Label>
                      <Form.Control
                        className="formInput"
                        type="password"
                        placeholder="Parol"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 red"
                      controlId="confirmPassword"
                    >
                      <Form.Label>Parol tekshirish</Form.Label>
                      <Form.Control
                        className="formInput"
                        placeholder="Parol tekshirish"
                        type="password"
                      />
                    </Form.Group>
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        display: "none",
                      }}
                      className="confirm"
                    >
                      Parollar mos kelmadi!
                    </p>
                  </div>
                ) : (
                  ""
                )} */}
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Label>Telefon raqam</Form.Label>
                      <Form.Control
                        onChange={this.phone}
                        value={this.state.phone}
                        className="formInput"
                        placeholder="Telefon raqam"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="position">
                      <Form.Label>Mutaxassislik</Form.Label>
                      <Form.Control
                        onChange={this.position}
                        value={this.state.position}
                        className="formInput"
                        placeholder="Mutaxassislik"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Rasm</Form.Label>
                      <Form.Control
                        onChange={this.customRequest}
                        type="file"
                        required={false}
                        style={{ marginBottom: "20px" }}
                        accept="image/jpg, image/jpeg, image/png"
                      />
                      {/* <Input
                        id="img"
                      /> */}
                      {this.state.previewImage
                        ? ImageDemo(this.state.imageUrl)
                        : ""}
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="speciality">
                  <Form.Label>Soha</Form.Label>
                  <Select
                    placeholder="Soha"
                    value={
                      this.state.speciality !== [] ? this.state.speciality : ""
                    }
                    mode="multiple"
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                    optionLabelProp="label"
                  >
                    {this.state.options !== null
                      ? this.state.options.map((item) => {
                          return (
                            <Option value={item.id} label={item.name}>
                              {item.name}
                            </Option>
                          );
                        })
                      : ""}
                  </Select>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  style={{ width: "100%" }}
                  controlId="description"
                >
                  <Form.Label>Qo'shimcha ma'lumot</Form.Label>
                  <Form.Control
                    onChange={this.description}
                    value={this.state.description}
                    className="formInput"
                    as="textarea"
                    placeholder="Qo'shimcha ma'lumot"
                    style={{ height: "200px" }}
                  />
                </Form.Group>
                <br />
                <Button
                  variant="danger"
                  htmlType="button"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    this.hideModal();
                  }}
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="primary"
                  htmlType="button"
                  onClick={() => {
                    this.saveXodim();
                  }}
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
