import axios from 'axios';
import React, { Component } from 'react'
import { Button, Container, Form, } from 'react-bootstrap';
import { url } from '../host/Host';
import { Modal} from 'antd'

export default class DarsJadvali extends Component {
  state={
    id:null,
    subjects:[],
    teacher:null,
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
        
      })
      this.setState({subjects:res.data}); console.log(res.data)})
  }
  render() {
    return (
      <div>
     <Modal title="Basic Modal" visible={this.state.show}footer={false} onCancel={this.handleCancel}>
        <Form>
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
  <Form.Control required={true} type="number" placeholder="number" min="1" max="12"/>
  
   </Form.Group>
   <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Fanni tanlang</Form.Label><br/>
   <select style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} name="subject">
      {this.state.subjects!==null?this.state.subjects.map(item=>{
       return(<option value={item.id}>{item.subject_name}</option>)
     }):''} 
   </select>
  </Form.Group>


 
  
  <Button variant="secondary" onClick={this.handleClose}>
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
