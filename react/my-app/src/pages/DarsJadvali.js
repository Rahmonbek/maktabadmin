import axios from 'axios';
import React, { Component } from 'react'
import { Button, Container, Form, } from 'react-bootstrap';
import { url } from '../host/Host';
import { message, Modal, Select} from 'antd'
import { Option } from 'antd/lib/mentions';
import GLOBAL from '../host/Global'
export default class DarsJadvali extends Component {
  state={
    id:null,
    subjects:[],
    teacher:null,
teach:[],
    class:null,
    show:false,
    kun:["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]
  }
  handleClose = () =>this.setState({show:false});
  handleShow = () => this.setState({show:true});
  componentDidMount(){
    axios.get(`${url}/subject/`).then(res=>{this.setState({subjects:res.data}); console.log(res.data)})
    axios.get(`${url}/class/`).then(res=>{
      var a=[]
      
      res.data.map(item=>{
        if(item.school===GLOBAL.id){a.push(item)}
      })

      this.setState({class:a}); }).catch(err=>{console.log(err)})
      axios.get(`${url}/staff/`).then(res=>{
        var a=[]
        res.data.map(item=>{
          if(item.school===GLOBAL.id){a.push(item)}
        })
  if(a.length!==0){
    this.setState({teacher:a})
  }
     }).catch(err=>{console.log(err)})
 
      }
addLesson=(e)=>{
  
  e.preventDefault();
  const formData = new FormData(e.target)
formData.append('school', GLOBAL.id)
    var formDataObj = Object.fromEntries(formData.entries());
    formDataObj.class=Number(formDataObj.class)
    formDataObj.number=Number(formDataObj.number)
    formDataObj.subject=Number(formDataObj.subject)
    formDataObj.school=Number(formDataObj.school)
    axios.post(`${url}/lesson/`, formDataObj).then(res=>{axios.put(`${url}/lesson/${res.data.id}`, {teacher:this.state.teach}).then(res1=>{message.success("Ma'lumot saqlandi")})
  .catch(err=>{message.error("Ma'lumot saqlanmadi")})}).catch(err=>{message.error("Ma'lumot saqlanmadi")})

  }

handleChange = (value)=>{
  this.setState({
    teach:value
  })
}

  render() {
    return (
      <div>
     <Modal title="Dars qo'shish" visible={this.state.show}footer={false} onCancel={this.handleCancel}>
        <Form 
        onSubmit={this.addLesson}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Label>Sinfni tanlang</Form.Label><br/>
   <select style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} name="class">
     {this.state.class!==null?this.state.class.map(item=>{
       return(<option value={item.id}>{item.class_number} "{item.class_char}" - sinf </option>)
     }):''}
   </select>
  </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Label>Hafta kunini tanlang</Form.Label><br/>
   <select style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} name="day">
     {this.state.kun.map(item=>{
       return(<option value={item}>{item}</option>)
     })}
   </select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Soatni kiriting</Form.Label><br/>
  <Form.Control style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} type="number" placeholder="Nechinchi soat" min="1" max="12"/>
  
   </Form.Group>
   <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Fanni tanlang</Form.Label><br/>
   <select style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} name="subject">
      {this.state.subjects!==null?this.state.subjects.map(item=>{
       return(<option value={item.id}>{item.subject_name}</option>)
     }):''} 
   </select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Select
      mode="multiple"
      allowClear
      style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px' }}
      placeholder="O'qituvchilarni tanlang"
      defaultValue={this.state.teach}
      onChange={this.handleChange}
      name="teacher"
    >
{this.state.teacher!==null?this.state.teacher.map(item=>{
  return(<Option key={item.id} label={item.full_name}>{item.full_name}</Option>)
}):''}

    </Select>
    </Form.Group>
    
 
  
  <Button variant="danger" onClick={this.handleClose}>
            Bekor qilish
          </Button>
          <Button variant="primary" type="submit">
            Saqlash
          </Button>
       
</Form>
       
       </Modal>
      <Container>
      <Button variant="primary" onClick={this.handleShow}>
        Dars yaratish
      </Button>
        </Container>      
      </div>
    )
  }
}
