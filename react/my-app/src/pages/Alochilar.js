import React, { Component } from "react";
import styles from "../css/admin.module.css";
import { Form, Button, Table } from "react-bootstrap";
import { message, Select } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import rasm from "../img/school19.jpg";
import { url } from "../host/Host";
import axios from "axios";
import GLOBAL from "../host/Global";
import Loader from './Loader'
export default class Yutuqlar extends Component {
  state = {
    loading:true,
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

},500);
this.setState({loadig:false})
})

})
   }
   
addYutuq=()=>{
  if(this.state.student!==null){
    axios.post(`${url}/excellent/`, {pupil:this.state.student, school:GLOBAL.id}).then(res=>{
  message.success("Ma'lumot qo'shildi");
    }).catch(err=>{
      message.error("Ma'lumot qo'shilmadi");
    })
        
  }
   
  }
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
     
      <div> {this.state.loading===true?(<Loader/>):(<div>
        <Container fluid>
          <Row>
            <Col lg={12} id="1">
             
              <Row>
                <Col lg={12}>
                  <div className={styles.formAdmin}>
                    <h4>A'lochi o'quvchini tanlang</h4>
                    <Form 
                    onSubmit={this.addYutuq}>
                    <Form.Group controlId="sinf">
                        <Select required={true} showSearch style={{ width: "100%" }} defaultValue={this.state.sinf} placeholder="Sinf" optionFilterProp="children" onChange={this.setUstoz}>
{this.state.clas!==null?this.state.clas.map((item, key)=>{
         return(               
        <Option value={key} label={item.class_number+' "' + item.class_char + '" - sinf'}>{item.class_number+' "' + item.class_char + '" - sinf'}</Option>
         )
}):''}                          
                          </Select>
                      </Form.Group>
                  
                    <Form.Group controlId="name">
                    
                    <Select required={true} showSearch style={{ width: "100%" }}
                     placeholder="O'quvchi tanlang" optionFilterProp="children" onChange={this.handleChange}>

    
    {this.state.sinf!==null && this.state.students!==null && this.state.students[this.state.sinf]!==null?
    this.state.students[this.state.sinf].map(item=>{
return(<Option value={item.id} label={item.full_name}>{item.full_name}</Option>)
    }):''}
                        </Select>
                      </Form.Group>
                  <Button variant="primary" className={styles.inputFormBtn} onClick={this.addYutuq}>
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
        </Container></div>)}
      </div>
    );
  }
}
