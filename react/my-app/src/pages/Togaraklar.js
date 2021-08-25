import React, { Component } from "react";
import styles from "../css/sport.module.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "antd/lib/modal/Modal";
import admin from "../img/user.png";
import { createCourses, deleteCourse, editCourse, getCourses, getMentors, getStaff } from "../host/Config";
import Loader from "./Loader";
import Global from "../host/Global";
import { message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import ImageDemo from "./ImageDemo";
export default class Togaraklar extends Component {
  state = {
    loading: true,
    curators: [],
    curator: null,
    show: false,
    previewImage: false,
    imageUrl: "",
    image: "",
    courses: [],
    course: {},
    edit:null,
  };
  echoPupil=(id)=>{

    var f=''
    if(this.state.curators!==null){this.state.curators.map(item=>{
 if(item.id===id){
  f=item.full_name
}

    })}
    return(f)

  }
  getCourses = () => {
    getCourses(Global.id)
      .then((res) => {
        this.setState({ courses: res.data  });
        this.setState({ loading: false });

      })
      .catch((err) => {message.error("Ma'lumot topilmadi");
         this.setState({
        loading: false
       });});

  };
  getMentors = () => {
    getStaff().then((res) => {
      this.setState({ curators: res.data });
    });
  };
  openModal = () => {
    this.setState({ show: true });
  };
  handleCancel = () => {
    this.setState({ show: false, previewImage: false, edit: null, curator:null });
    document.getElementById("title").value = "";
    document.getElementById("address").value = "";
    document.getElementById("text").value = "";
    document.getElementById("image").value = "";
  };
  customRequest = (e) => {
    this.setState({ previewImage: false, image: e.target.files[0] });
  };
  selected = (e) => {
    this.setState({ curator: e });
  };
  editCourses = (key) => {
    getCourses(Global.id).then((res) => {
      document.getElementById("title").value = res.data[key].title;
      document.getElementById("address").value = res.data[key].address;
      document.getElementById("text").value = res.data[key].text;
      this.setState({ course: res.data[key], curator: res.data[key].mentor, imageUrl: res.data[key].image, edit: res.data[key].id, previewImage: true });
    });

    this.openModal();
  };
  saveCourses = () => {
    var data = {
      title: document.getElementById("title").value,
      address: document.getElementById("address").value,
      text: document.getElementById("text").value,
      mentor: this.state.curator,
      school: Global.id,
    };
    let formData = new FormData();
    formData.append("title", data.title ?? null);
    formData.append("address", data.address ?? null);
    formData.append("text", data.text ?? null);
    formData.append("mentor", data.mentor ?? null);
    formData.append("school", data.school ?? null);
    if (this.state.edit !== null) {
      if (this.state.image !== "") {
        formData.append("image", this.state.image ?? null);
        editCourse(formData, this.state.edit)
          .then((res) => {
            this.getCourses();
            message.success("Ma'lumot o'zgartirildi");
          })
          .catch((err) => message.error("Ma'lumot o'zgartirilmadi"));
      } else {
        editCourse(data, this.state.edit)
          .then((res) => {
            this.getCourses();
            message.success("Ma'lumot o'zgartirildi");
          })
          .catch((err) => message.error("Ma'lumot o'zgartirilmadi"));
      }
    } else {
      formData.append("image", this.state.image ?? null);
      createCourses(formData)
        .then((res) => {
          this.getCourses();
          message.success("Ma'lumot yaratildi");
        })
        .catch((err) => message.error("Ma'lumot yaratilmadi"));
    }
    this.handleCancel();
  };
  deleteCourses = (id) => {
    deleteCourse(id)
      .then((res) => {
        this.getCourses();
        message.success("Ma'lumot o'chirildi");
      })
      .catch((err) => message.error("Ma'lumot o'chirilmadi"));
  };
  componentDidMount() {
    this.getCourses();
    this.getMentors();
  }
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <h1 style={{ fontSize: "30px", display: "inline-block", marginRight: "30px" }}>
              To'garaklar{" "}
              <Button onClick={this.openModal} style={{ marginLeft: "30px", backgroundColor: "#187CC0", border: "none" }}>
                Qo'shish
              </Button>
            </h1>
            <Row>
              {this.state.courses !== []
                ? this.state.courses.map((item, key) => {
                    return (
                      <Col lg={4} md={6} sm={12} style={{ marginTop: "20px" }}>
                        <div className={styles.card}  style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                          <div className={(styles.card, styles.cardone)} >
                            <header>
                              <div className={styles.avatar}>
                                <img src={item.image !== null ? item.image : admin} alt="" />
                              </div>
                            </header>

                            <h3 className={styles.headerName}>{item.title}</h3>
                            <div className={styles.desc}>
                              <p><b>O'qituvchi:</b> {this.echoPupil(item.mentor)}</p>
                              <p style={{ marginTop: "-40px", }}><b>Manzil:</b> {item.address}</p>
                              <p style={{ marginTop: "-40px", }}><b>Qo'shimcha ma'lumot:</b> {item.text}</p>
                            </div>

                            <footer className={styles.footer} style={{ marginTop: "-40px", fontWeight: "800" }}>
                              <FaEdit style={{ color: "green", fontSize: "20px" }} onClick={() => this.editCourses(key)} />
                              <MdDelete style={{ color: "red", fontSize: "20px", marginLeft: "20px" }} onClick={() => this.deleteCourses(item.id)} />
                            </footer>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                : ""}
            </Row>
            <Modal title="To'garak yaratish" visible={this.state.show} onCancel={this.handleCancel} footer={false}>
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>To'garak nomi</Form.Label>
                  <Form.Control placeholder="To'garak nomi" defaultValue={this.state.course.title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="mentor">
                  <Form.Label>To'garak rahbari</Form.Label>
                  <Select style={{ width: "100%" }} value={this.state.curator} onChange={this.selected} optionLabelProp="label">
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
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>To'garak rasmi</Form.Label>
                  <br />
                  <Form.Control className="formInput" accept=".jpg, .jpeg, .png" onChange={this.customRequest} name="image" required type="file" />
                  <br />
                  <br />
                  {this.state.previewImage ? ImageDemo(this.state.imageUrl) : ""}
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>To'garak manzili</Form.Label>
                  <Form.Control placeholder="To'garak manzili" defaultValue={this.state.course.address} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="text">
                  <Form.Label>To'garak matni</Form.Label>
                  <Form.Control as="textarea" defaultValue={this.state.course.text} style={{ height: "120px" }} placeholder="To'garak matni" />
                </Form.Group>

                <br />

                <Button variant="danger" style={{ marginRight: "10px" }} onClick={this.handleCancel}>
                  Bekor qilish
                </Button>
                <Button variant="primary" onClick={this.saveCourses}>
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
