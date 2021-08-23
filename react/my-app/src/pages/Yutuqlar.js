import React, { Component } from "react";
import styles from "../css/admin.module.css";
import { Form, Button, Table } from "react-bootstrap";
import { message, Select } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import rasm from "../img/school19.jpg";
import { url } from "../host/Host";
import axios from "axios";
import GLOBAL from "../host/Global";

export default class Yutuqlar extends Component {
  state = {
    edit: null,
    teachers: null,
    student:[],
    clas:null,
    students:null,
   sinf:null,
   image:null,

  };
  setUstoz = (value) => {
   
    this.setState({
      sinf:value
    })
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
  console.log('f')
  this.setState({
   students:res.data
 })
 axios.get(`${url}/class/`).then(res1=>{
  var clas=[]
  console.log('f')
  res1.data.map(fer=>{
  if(fer.school===GLOBAL.id){
    clas.push(fer)
    console.log(fer)
  }
  
})

this.setState({
  clas:clas
})
setTimeout(()=>{

  this.fer(clas, res.data)

},500)

})
})
   }
   
addYutuq=(e)=>{
  e.preventDefault();
    const formData = new FormData(e.target)
  
    formData.append(
      "competition",
      document.getElementById("formBasiccompetition").value ?? ""
    );
    formData.append(
      "text",
      document.getElementById("formBasictext").value ?? ""
    );
    formData.append(
      "result",
      document.getElementById("formBasicresult").value ?? ""
    );
    formData.append(
      "school",
      Number(GLOBAL.id)
    );
    
    var formDataObj = Object.fromEntries(formData.entries());
   
    formDataObj.id=Number(formDataObj.id)
          
  
  // if(this.state.edit!==null) {
  // if(this.state.image!==null){
  //   formData.append("image", this.state.image ?? "");
  // }
    
  //   editNew(formData, this.state.edit).then(res=>{message.success("Yangilik o'gartirildi");; this.getNews()}).catch(err=>{message.success("Yangilik o'zgartirilmadi");;})
  // } else {
    formData.append("image", this.state.image ?? "");
  if(this.state.student.length!==0){
    axios.post(`${url}/achiviment/`, formData).then(res=>{
      axios.patch(`${url}/achiviment/`, {pupils:this.state.student}).then(res=>{ message.success("Ma'lumot qo'shildi");}).catch(err=>{
        message.error("Ma'lumot qo'shilmadi");
      })
    }).catch(err=>{
      message.error("Ma'lumot qo'shilmadi");
    })
        
  }
    

  // }
   
  }
   customRequest = (e) => {
    let image = e.target.files[0];
    this.setState({
      image:image,
    })
  };
   handleChange=(value)=>{
     this.setState({
       student:value
     })
   }
  fer=(clasa, st)=>{
    console.log('f')
    var clas=[]
    clasa.map(item=>{
var f=[]
st.map(item1=>{
  if(item.id===item1.clas){
    f.push(item1)
  }
})
if(f.length==0){
  clas.push(null)

}else{
  clas.push(f)

}
    })
    console.log(clas, clasa,this.state.sinf, st)
    this.setState({students:clas, sinf:0})
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
                    <Form 
                    onSubmit={this.addYutuq}>
                    <Form.Group required={true} controlId="sinf">
                        <Select required={true} showSearch style={{ width: "100%" }} defaultValue={this.state.sinf} placeholder="Sinf" optionFilterProp="children" onChange={this.setUstoz}>
{this.state.clas!==null?this.state.clas.map((item, key)=>{
         return(               
        <Option value={key} label={item.class_number+' "' + item.class_char + '" - sinf'}>{item.class_number+' "' + item.class_char + '" - sinf'}</Option>
         )
}):''}                          
                          </Select>
                      </Form.Group>
                  
                    <Form.Group required={true} controlId="name">
                    
      <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="O'quvchiarni tanlang"
      defaultValue={[]}
      
      onChange={this.handleChange}
    > 
    {this.state.sinf!==null && this.state.students!==null && this.state.students[this.state.sinf]!==null?
    this.state.students[this.state.sinf].map(item=>{
return(<Option value={item.id} label={item.full_name}>{item.full_name}</Option>)
    }):''}
                        </Select>
                      </Form.Group>
                      <Form.Group controlId="formBasiccompetition">
                        <Form.Control required={true}
       type="text" name="competition" placeholder="Tanlovni kiriting" />
                      </Form.Group>
                      <Form.Group controlId="formBasicresult">
                        <Form.Control required={true}
       type="text" name="result" placeholder="O'rinni kiriting" />
                      </Form.Group>
                      <Form.Group required={true}
       controlId="formBasictext" className="mb-3" style={{width:"100%"}}>
    {/* <Form.Label></Form.Label> */}
    <br/><Form.Control
    required={true}
      
      as="textarea"
      name="text"
      placeholder="Yutuq haqida qisqacha yozing..."
      style={{ height: '200px'}}
    />
  </Form.Group>
                      <Form.Group controlId="rasm">
                        <Form.Control type="file" required={true}  onChange={this.customRequest} placeholder="Rasm kiriting"  />
                      </Form.Group>
                      <Button variant="primary" className={styles.inputFormBtn} type="submit">
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
              {/* <Table style={{ backgroundColor: "white", border: "none", boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px", borderRadius: "5px" }}>
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
              </Table> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
