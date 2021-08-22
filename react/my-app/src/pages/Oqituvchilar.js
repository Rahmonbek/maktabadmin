import React, { Component } from "react";
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip, Form } from "react-bootstrap";
import { createXodim, deleteXodim, getSpec, editXodim, getXodim, patchXodim, register } from "../host/Config";
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

export default class Oqituvchilar extends Component {
  state = {
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
      image: {},
    });
    this.reset();
  };
  echoOptions=(a)=>{
    var g=""
    this.state.options.map(item=>{
      if(item.id===a){
        g=item.name
      }

    })
    return(g)
  }
  getSpec = () => {
    getSpec()
      .then((res) => {
        this.setState({ options: res.data });
    
      })
      .catch((err) => console.log(err));
  };
  getXodim = () => {
    getXodim()
      .then((res) => {
        var a=[]
    
      res.data.map(item=>{
          if(item.school===GLOBAL.id){
            a.push(item)
          }
        })
        this.setState({
          teachers:a
        })
    
      })
      .catch((err) => console.log(err));
  };
  editXodim = (key) => {
    axios
      .get(`${url}/staff/`)
      .then((res) => {
    
        document.getElementById("fullname").value = res.data[key].full_name;
        document.getElementById("user").style.display = "none";
        document.getElementById("phone").value = res.data[key].phone;
        document.getElementById("description").value = res.data[key].description;
        document.getElementById("position").value = res.data[key].position;
        this.setState({
          edit: res.data[key].id,
          imageUrl: res.data[key].image,
          speciality: res.data[key].speciality,
        });
      })
      .catch((err) => console.log(err));
    this.openModal();
  };
  saveXodim = () => {
    var full_name = document.getElementById("fullname").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var phone = document.getElementById("phone").value;
    var description = document.getElementById("description").value;
    var position = document.getElementById("position").value;
    var speciality = this.state.speciality;
    if (confirmPassword !== password) {
      document.querySelector(".confirm").style.display = "block";
      return (document.getElementById("confirmPassword").style.backgroundColor = "red");
    }

    let formData = new FormData();

    formData.append("position", position ?? "");
    formData.append("full_name", full_name ?? "");
    // formData.append(
    //   'password',
    //  password ?? ''
    // )
    formData.append("phone", phone ?? "");
    formData.append("school", GLOBAL.id ?? "");
    formData.append("description", description ?? "");
    

    if (this.state.edit !== null) {
      if (this.state.image !== null) {
        formData.append("image", this.state.image ?? "");
      }
      editXodim(formData, this.state.edit)
        .then((res) => {
    editXodim({speciality:this.state.speciality}, this.state.edit).then(res2=>{
  message.success("Xodim o'zgartildi")
      this.hideModal();
      this.getXodim();
  
    })
        })
        .catch((err) => message.error("Xodim o'zgartilmadi"));
    } else {
      formData.append("image", this.state.image ?? "");
      register({ username, password })
        .then((res) => {
          formData.append("user", res.data.user.id ?? "");
          createXodim(formData)
            .then((res) => {
          
              patchXodim({ speciality: speciality }, res.data.id)
                .then((res1) => {
                  this.hideModal();
                  this.getXodim();
                  message.success("Xodim saqlandi")
  
                })
                .catch((err1) => {
                  message.error("Xodim saqlanmadi")
              
                });
            })
            .catch((err) => {
              message.error("Xodim saqlanmadi")
          
            });
        })
        .catch((err) => {
          document.querySelector(".registerRed").style.display = "block";
        });
    }
  };
  deleteXodim = (id) => {
    deleteXodim(id)
      .then((res) => {
        this.getXodim();
        message.success("Xodim o'chirildi")
        
      })
      .catch((err) =>                   message.error("Xodim o'chirilmadi")
      );
  };
  reset = () => {
    document.getElementById("fullname").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("description").value = "";
    document.getElementById("position").value = "";
    document.getElementById("user").style.display = "block";
    document.querySelector(".registerRed").style.display = "none";
    document.querySelector(".confirm").style.display = "none";
    document.getElementById("confirmPassword").style.backgroundColor = "white";
    this.setState({
      image: null,
      speciality: [],
    });
  };
  customRequest = (e) => {
    let image = e.target.files[0];
    this.setState({
      image: image,
    });
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
                    <Col lg={4} md={6} sm={12} style={{ marginTop: "20px" }}>
                      <Card className={style.root}>
                        <CardHeader title="Xodim" />
                        {item.image !== null ? <CardMedia className={style.media} image={item.image} title={item.full_name} /> : ""}
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <p>
                              <b>F.I.O: </b>
                              {item.full_name}
                            </p>
                            <p>
                              <b>Sohasi: </b>
                              {item.speciality.map((item1) => {
                                return this.echoOptions(item1)+' ';
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
                              <Button variant="#F2F2F2" {...triggerHandler} className="d-inline-flex align-items-center">
                                <Image ref={ref} />
                                <IconButton
                                  className={clsx(styles.expand, {
                                    [styles.expandOpen]: this.state.expanded[key],
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
                        <Collapse in={this.state.expanded[key]} timeout="auto" unmountOnExit>
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
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>F.I.O.</Form.Label>
              <Form.Control placeholder="F.I.O." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Rasm</Form.Label>
              <Input onChange={this.customRequest} type="file" required={false} style={{ marginBottom: "20px" }} accept="image/jpg, image/jpeg, image/png" />
              {this.state.previewImage ? ImageDemo(this.state.imageUrl) : ""}
            </Form.Group>

            <div id="user">
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Login</Form.Label>
                <Form.Control placeholder="Login" />
              </Form.Group>
              <p style={{ color: "red", fontSize: "14px", display: "none" }} className="registerRed">
                Bu login tizimda bor boshqa login kiriting
              </p>
              <Form.Group className="mb-3 red" controlId="password">
                <Form.Label>Parol</Form.Label>
                <Form.Control type="password" placeholder="Parol" />
              </Form.Group>

              <Form.Group className="mb-3 red" controlId="confirmPassword">
                <Form.Label>Parol tekshirish</Form.Label>
                <Form.Control placeholder="Parol tekshirish" type="password" />
              </Form.Group>
              <p style={{ color: "red", fontSize: "14px", display: "none" }} className="confirm">
                Parollar mos kelmadi!
              </p>
            </div>

            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Soha</Form.Label>
              <Form.Control placeholder="Soha" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="speciality">
              <Form.Label>Mutaxassislik</Form.Label>
              <Select placeholder="Mutaxassislik" value={this.state.speciality !== [] ? this.state.speciality : ""} mode="multiple" style={{ width: "100%" }} onChange={this.handleChange} optionLabelProp="label">
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

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefon raqam</Form.Label>
              <Form.Control placeholder="Telefon raqam" />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: "100%" }} controlId="description">
              <Form.Label>Qo'shimcha ma'lumot</Form.Label>
              <Form.Control as="textarea" placeholder="Qo'shimcha ma'lumot" style={{ height: "200px" }} />
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
              Yaratish
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
