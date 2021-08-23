import React, { Component } from "react";
import styles from "../css/admin.module.css";
import { Form, Button, Table } from "react-bootstrap";
import { Select } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import rasm from "../img/school19.jpg";
import { url } from "../host/Host";
import axios from "axios";
import GLOBAL from "../host/Global";

export default class Yutuqlar extends Component {
  state = {
    edit: null,
    teachers: null,
    student:{},
    clas:null,
    students:[],
   sinf:[]
  };
  setUstoz = (value) => {
   
    this.setState({
      sinf:value
    })
  };
  saveTeacher = () => {
    var name = this.state.ustoz;
    var yutuq = document.getElementById("yutuq").value;
    var orin = document.getElementById("orin").value;
    var rasm = document.getElementById("rasm").value;
    var newteacher = {
      name,
      yutuq,
      orin,
      rasm,
    };
    var newteachers = this.state.teachers;
    if (this.state.edit === null) {
      newteachers.push(newteacher);
      this.setState({
        teachers: newteachers,
      });
    } else {
      newteachers[this.state.edit] = newteacher;
      this.setState({
        edit: null,
      });
    }
  };
  deleteTeacher = (id) => {
    var newteachers = this.state.teachers;
    newteachers.splice(id, 1);
    this.setState({
      teachers: newteachers,
    });
  };
  editTeacher = (id) => {
    var newteacher1 = {
      name: this.state.teachers[id].name,
      yutuq: this.state.teachers[id].yutuq,
      orin: this.state.teachers[id].orin,
      rasm: this.state.teachers[id].rasm,
    };
    this.setState({
      teacher1: newteacher1,
      edit: id,
    });
  };
  componentDidMount(){
    
axios.get(`${url}/pupil/`).then(res=>{
  var students=res.data
  console.log('f')
  this.setState({
   students:res.data
 })

})
    axios.get(`${url}/class/`).then(res=>{
      var clas=[]
      console.log('f')
      res.data.map(fer=>{
      if(fer.school===GLOBAL.id){
        clas.push(fer)
        console.log(fer)
      }
      
    })
    
    this.setState({
      clas:clas
    })
    this.fer()

  })



   
 
    
  }
  fer=()=>{
    console.log('f')
    var clas=[]
    console.log(this.state.clas)
    this.state.clas.map(item=>{
var f=[]
this.state.students.map(item1=>{
  if(item.id===item1.clas){
    f.push(item1)
  }
})
clas.push(f)
    })
    console.log(clas)
    this.setState({students:clas})
  }
  render() {
    const { Option } = Select;
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg={12} id="1">
              <h1 style={{ fontSize: "30px", marginLeft: "10px" }} className={styles.adminTop}>
                Yutuqlar
              </h1>
              <Row>
                <Col lg={12}>
                  <div className={styles.formAdmin}>
                    <h4>Yutuq kiritish</h4>
                    <Form>
                    <Form.Group controlId="sinf">
                        <Select showSearch style={{ width: "100%" }} defaultValue={this.state.sinf} placeholder="Sinf" optionFilterProp="children" onChange={this.setUstoz} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
{this.state.clas!==null?this.state.clas.map((item, key)=>{
         return(               
        <Option value={key} label={item.class_number+' "' + item.class_char + '" - sinf'}>{item.class_number+' "' + item.class_char + '" - sinf'}</Option>
         )
}):''}                          
                          </Select>
                      </Form.Group>
                  
                    <Form.Group controlId="name">
                    
      <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="O'quvchiarni tanlang"
      defaultValue={[]}
      onChange={this.handleChange}
    > 
    {this.state.students!==null && this.state.students!==[] && this.state.students[this.state.sinf]!==[]?this.state.students[this.state.sinf].map(item=>{
return(<Option value={item.id} label={item.full_name}>{item.full_name}</Option>)
    }):''}
                        </Select>
                      </Form.Group>
                      <Form.Group controlId="yutuq">
                        <Form.Control type="text" placeholder="Yutuq kiriting" />
                      </Form.Group>
                      <Form.Group controlId="orin">
                        <Form.Control type="text" placeholder="O'rinni kiriting" />
                      </Form.Group>
                      <Form.Group controlId="rasm">
                        <Form.Control type="file" placeholder="Rasm kiriting"  />
                      </Form.Group>
                      <Button variant="primary" className={styles.inputFormBtn} onClick={this.saveTeacher}>
                        O'zgarishlarni saqlash
                      </Button>
                      <Button variant="primary" className={styles.inputFormBtn1} onClick={this.reset1}>
                        Bekor qilish
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <Table style={{ backgroundColor: "white", border: "none", boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px", borderRadius: "5px" }}>
                <thead style={{ borderBottom: "none" }}>
                  <tr style={{ borderBottom: "none" }}>
                    <th>#</th>
                    <th>F.I.O</th>
                    <th>Yutuq</th>
                    <th>O'rin</th>
                    <th>Rasm</th>
                    <th>O'zgartirish</th>
                    <th>O'chirish</th>
                  </tr>
                </thead>
                <tbody style={{ border: "none" }}>
                  {this.state.teachers.map((item, key) => {
                    return (
                      <tr>
                        <td>{key + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.yutuq}</td>
                        <td>{item.orin}</td>
                        <td>{item.rasm}</td>
                        <td>
                          <Button style={{ backgroundColor: "#187CC0", padding: "3px 10px", fontSize: "17px", border: "none" }} onClick={() => this.editTeacher(key)}>
                            O'zgartirish
                          </Button>
                        </td>
                        <td>
                          <Button style={{ backgroundColor: "#187CC0", padding: "3px 10px", fontSize: "17px", border: "none" }} onClick={() => this.deleteTeacher(key)}>
                            O'chirish
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
