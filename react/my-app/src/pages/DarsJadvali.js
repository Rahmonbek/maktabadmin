import axios from 'axios';
import React, { Component } from 'react'
import { Button, Container, Form, } from 'react-bootstrap';
import { url } from '../host/Host';
import { message, Modal, Select} from 'antd'
import { Option } from 'antd/lib/mentions';
import GLOBAL from '../host/Global'
import style from '../css/Jadval.module.css'
export default class DarsJadvali extends Component {
  state={
    id:null,
    subjects:[],
    teacher:null,
teach:[],
jadval:[],
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

      this.setState({class:a}); 
    setTimeout(()=>{
      this.getJadval()
    },500)}).catch(err=>{console.log(err)})
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
      getJadval=()=>{
this.state.class.map(item=>{
  axios.get(`${url}/lesson-table/${item.id}`).then(res=>{
   var a=this.state.jadval
   console.log(res.data)
   a.push(res.data)
    this.setState({jadval:a})
    console.log(a) 
  
  })
    
})        
      }
addLesson=(e)=>{
  
  e.preventDefault();
  const formData = new FormData(e.target)
formData.append('teacher', [])
    var formDataObj = Object.fromEntries(formData.entries());
    formDataObj.clas=Number(formDataObj.clas)
    formDataObj.number=Number(formDataObj.number)
    formDataObj.subject=Number(formDataObj.subject)
    var te=[];
    console.log( this.state.teach)
    this.state.teach.map(item=>{te.push(Number(item))})
    var config={
      clas:formDataObj.clas,
      number:formDataObj.number,
      subject:formDataObj.subject,
      day:formDataObj.day,
      teacher:te
    }

    // formDataObj.school=Number(formDataObj.school)
    axios.post(`${url}/lesson/`, config).then(res=>{message.success("Ma'lumot saqlandi"); this.handleClose()}).catch(err=>{message.error("Ma'lumot saqlanmadi")})

  }

handleChange = (value)=>{
console.log(value)
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
   <select style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} name="clas">
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
  <Form.Control style={{width:'100%', borderRadius:'10px', border:'1px solid lightgrey', fontSize:'16px', padding:'5px'}} required={true} type="number" name="number" placeholder="Nechinchi soat" min="1" max="12"/>
  
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

{this.state.class!==null && this.state.jadval.length!==0?this.state.class.map((item,key)=>{
  return(
    <div className={style.tableWrapper}>
      <h3>{item.class_number} "{item.class_char}" - sinf</h3>
  <table className={style.flTable}>
  <thead>
  <tr>
      <th>T/r</th>
      <th>Dushanba</th>
      <th>Seshanba</th>
      <th>Chorshanba</th>
      <th>Payshanba</th>
      <th>Juma</th>
      <th>Shanba</th>
  </tr>
  </thead>
  <tbody>
  
  <tr>
      <td>1</td>
      <td>Content 1</td>
      <td>Content 1</td>
      <td>Content 1</td>
      <td>Content 1</td>
      <td>Content 1</td>
      <td>Content 1</td>
  </tr>
  </tbody>
</table></div>)
}):''}

        </Container>      
      </div>
    )
  }
}
