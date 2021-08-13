import React, { Component } from "react";
import styles from "../css/sport.module.css";
import { Form } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
export default class DarsJadvali extends Component {
  state = {
    edit: null,
    darslar: [
      {
        sinf: '5-"a"',
        rahbar: "odina nosirova",
        smena: "1-smena 8:30 dan 13:00 gacha",
        jadval: {
          dushanba: ["matem", "ona tili", "rus tili"],
          seshanba: ["matem", "ona tili", "rus tili"],
          chorshanba: ["matem", "ona tili", "rus tili"],
          payshanba: ["matem", "ona tili", "rus tili"],
          juma: ["matem", "ona tili", "rus tili"],
          shanba: ["matem", "ona tili", "rus tili"],
        },
      },
    ],
    dars: [],
    dars1: {
      sinf: "",
      rahbar: "",
      smena: "",
      jadval: {
        dushanba: [],
        seshanba: [],
        chorshanba: [],
        payshanba: [],
        juma: [],
        shanba: [],
      },
    },
  };
  saveJadval = () => {
    var sinf = document.getElementById("sinf").value;
    var rahbar = document.getElementById("rahbar").value;
    var smena = document.getElementById("smena").value;
    var dushanba = document.getElementById("dushanba").value.split(",");
    var seshanba = document.getElementById("seshanba").value.split(",");
    var chorshanba = document.getElementById("chorshanba").value.split(",");
    var payshanba = document.getElementById("payshanba").value.split(",");
    var juma = document.getElementById("juma").value.split(",");
    var shanba = document.getElementById("shanba").value.split(",");
    var dars = {
      sinf,
      rahbar,
      smena,
      jadval: {
        dushanba,
        seshanba,
        chorshanba,
        payshanba,
        juma,
        shanba,
      },
    };
    var newdars = this.state.darslar;
    if (this.state.edit === null) {
      newdars.push(dars);
      this.setState({
        darslar: newdars,
      });
    } else {
      newdars[this.state.edit] = dars;
      this.setState({
        edit: null,
      });
    }
    this.reset();
  };

  deleteDars = (id) => {
    var newdars = this.state.darslar;
    newdars.splice(id, 1);
    this.setState({
      darslar: newdars,
    });
  };
  editDars = (id) => {
    var dars1 = this.state.darslar[id];
    this.setState({
      dars1: dars1,
      edit: id,
    });
  };
  reset = () => {
    document.getElementById("sinf").value = "";
    document.getElementById("rahbar").value = "";
    document.getElementById("smena").value = "";
    document.getElementById("dushanba").value = "";
    document.getElementById("seshanba").value = "";
    document.getElementById("chorshanba").value = "";
    document.getElementById("payshanba").value = "";
    document.getElementById("juma").value = "";
    document.getElementById("shanba").value = "";
  };

  render() {
    const Input = ({ value, onChange, type = "text" }) => <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />;
    return (
      <div>
        <Container fluid>
          <Row>
            <h1 style={{ fontSize: "30px", fontFamily: '"Lobster",cursive' }}>Dars jadvali</h1>
            <Col lg={12} style={{ marginTop: "0px" }}>
              <div className={styles.formAdmin}>
                <h4>Dars jadvalini kiritish</h4>
                <Form id="formAdmin">
                  <Form.Group controlId="sinf" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Sinfni kiriting" defaultValue={this.state.dars1.sinf} />
                  </Form.Group>
                  <Form.Group controlId="rahbar" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Rahbarni kiriting" defaultValue={this.state.dars1.rahbar} />
                  </Form.Group>
                  <Form.Group controlId="smena" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Smenani kiriting" defaultValue={this.state.dars1.smena} />
                  </Form.Group>
                  <Form.Group controlId="dushanba" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Dushanba uchun: matematika,ona tili,rus tili" defaultValue={this.state.dars1.jadval.dushanba} />
                  </Form.Group>
                  <Form.Group controlId="seshanba" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Seshanba uchun: matematika,ona tili,rus tili" defaultValue={this.state.dars1.jadval.seshanba} />
                  </Form.Group>
                  <Form.Group controlId="chorshanba" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Chorshanba uchun: matematika,ona tili,rus tili" defaultValue={this.state.dars1.jadval.chorshanba} />
                  </Form.Group>
                  <Form.Group controlId="payshanba" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Payshanba uchun: matematika,ona tili,rus tili" defaultValue={this.state.dars1.jadval.payshanba} />
                  </Form.Group>
                  <Form.Group controlId="juma" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="Juma uchun: matematika,ona tili,rus tili" defaultValue={this.state.dars1.jadval.juma} />
                  </Form.Group>
                  <Form.Group controlId="shanba" className={styles.miniInput}>
                    <Form.Control type="text" placeholder="shanba uchun: matematika,ona tili,rus tili" defaultValue={this.state.dars1.jadval.shanba} />
                  </Form.Group>

                  <a href="#2">
                    <Button variant="primary" className={styles.inputFormBtn} onClick={this.saveJadval}>
                      O'zgarishlarni saqlash
                    </Button>
                  </a>
                  <Button variant="primary" className={styles.inputFormBtn1} onClick={this.reset}>
                    Bekor qilish
                  </Button>
                </Form>
              </div>
            </Col>
            <Col lg={12}>
              <div className={styles.timetable}>
                {this.state.darslar.map((item, key) => {
                  return (
                    <div className={styles.timeDiv}>
                      <div className={styles.sinf}>
                        <h1>
                          {item.sinf} <AiOutlineEdit onClick={() => this.editDars(key)} style={{ fontSize: "20px", color: "green", cursor: "pointer" }} /> <AiOutlineDelete style={{ fontSize: "20px", color: "red", cursor: "pointer" }} onClick={() => this.deleteDars(key)} />
                        </h1>
                        <p>Sinf rahbari: {item.rahbar}</p>
                        <p>{item.smena}</p>
                      </div>
                      <div className={styles.day}>
                        <h1>Dushanba</h1>
                        <ol>
                          {item.jadval.dushanba.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ol>
                      </div>
                      <div className={styles.day}>
                        <h1>Seshanba</h1>
                        <ol>
                          {item.jadval.seshanba.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ol>
                      </div>
                      <div className={styles.day}>
                        <h1>Chorshanba</h1>
                        <ol>
                          {item.jadval.chorshanba.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ol>
                      </div>
                      <div className={styles.day}>
                        <h1>Payshanba</h1>
                        <ol>
                          {item.jadval.payshanba.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ol>
                      </div>
                      <div className={styles.day}>
                        <h1>Juma</h1>
                        <ol>
                          {item.jadval.juma.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ol>
                      </div>
                      <div className={styles.day}>
                        <h1>Shanba</h1>
                        <ol>
                          {item.jadval.shanba.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ol>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
