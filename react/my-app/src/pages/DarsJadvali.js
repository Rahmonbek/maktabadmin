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
    rowNumber:[[0],[0]],
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
        var jad=[]
        var number=[[0], [0]] 
        this.state.class.map(item=>{

 axios.get(`${url}/lesson-table/${item.id}`).then(res=>{
  console.log('jsss')
  jad[jad.length]=res.data
   var max=0
   res.data.Dushanba.map(item1=>{
     if(item1.number>max){
       max=item1.number
     }
   })
   
   res.data.Seshanba.map(item1=>{
    if(item1.number>max){
      max=item1.number
    }
  })
  
  res.data.Chorshanba.map(item1=>{
    if(item1.number>max){
      max=item1.number
    }
  })
  
  res.data.Payshanba.map(item1=>{
    if(item1.number>max){
      max=item1.number
    }
  })
  
  res.data.Juma.map(item1=>{
    if(item1.number>max){
      max=item1.number
    }
  })
  
  res.data.Shanba.map(item1=>{
    if(item1.number>max){
      max=item1.number
    }
  })
  var g=[]
  for(let i=0; i<max; i++){
g.push(i+1)
  }
if(g.length===0){
  number[number.length-1]=[1]
  number.push([0])
}
else{
  number[number.length-1]=g
  number.push([0])
  
}
  
 
  
 
  
  
  })
  
})

console.log(jad,number)
this.setState({jadval:jad, rowNumber:number})
   
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

// console.log(value)
  this.setState({
    teach:value
  })
}
Dushanba=(key, number)=>{
  var t=["", []]
  if(this.state.jadval[key]){
    var a=this.state.jadval[key].Dushanba
    // console.log(this.state.jadval[key].Dushanba)
    a.map(item=>{
      
      if(item.number===number){
        t[0]=item.subject
        item.teacher.map(item1=>{
          t[1].push(this.echoTeacher(item1))
        })
        
      }
    })

  }
   return(t)
}

Seshanba=(key, number)=>{
  var t=["", []]
  if(this.state.jadval[key]){
    var a=this.state.jadval[key].Seshanba
    // console.log(this.state.jadval[key].Dushanba)
    a.map(item=>{
      
      if(item.number===number){
        t[0]=item.subject
        item.teacher.map(item1=>{
          t[1].push(this.echoTeacher(item1))
        })
        
      }
    })

  }
   return(t)
}

Chorshanba=(key, number)=>{
  var t=["", []]
  if(this.state.jadval[key]){
    var a=this.state.jadval[key].Chorshanba
    // console.log(this.state.jadval[key].Dushanba)
    a.map(item=>{
      
      if(item.number===number){
        t[0]=item.subject
        item.teacher.map(item1=>{
          t[1].push(this.echoTeacher(item1))
        })
        
      }
    })

  }
   return(t)
}

Payshanba=(key, number)=>{
  var t=["", []]
  if(this.state.jadval[key]){
    var a=this.state.jadval[key].Payshanba
    // console.log(this.state.jadval[key].Dushanba)
    a.map(item=>{
      
      if(item.number===number){
        t[0]=item.subject
        item.teacher.map(item1=>{
          t[1].push(this.echoTeacher(item1))
        })
        
      }
    })

  }
   return(t)
}

Juma=(key, number)=>{
  var t=["", []]
  if(this.state.jadval[key]){
    var a=this.state.jadval[key].Juma
    // console.log(this.state.jadval[key].Dushanba)
    a.map(item=>{
      
      if(item.number===number){
        t[0]=item.subject
        item.teacher.map(item1=>{
          t[1].push(this.echoTeacher(item1))
        })
        
      }
    })

  }
   return(t)
}

Shanba=(key, number)=>{
  var t=["", []]
  if(this.state.jadval[key]){
    var a=this.state.jadval[key].Shanba
    // console.log(this.state.jadval[key].Dushanba)
    a.map(item=>{
      
      if(item.number===number){
        t[0]=item.subject
        item.teacher.map(item1=>{
          t[1].push(this.echoTeacher(item1))
        })
        
      }
    })

  }
   return(t)
}

echoTeacher=(a)=>{
  var g=""
  this.state.teacher.map(item=>{
    if(item.id===a){
      g=item.full_name
    }

  })
  return(g)
}
  render() {
    console.log(this.state.jadval[0], this.state.rowNumber.length)
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

{this.state.class!==null?this.state.class.map((item,key)=>{
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
    {this.state.rowNumber.length!==2?this.state.rowNumber[key+1]!==[]?this.state.rowNumber[key+1].map(number=>{
      
  return(    <tr>
        <td>{number}</td>
        <td><b>{this.Dushanba(key,number)[0]}</b><br/><br/> {this.Dushanba(key,number)[1].map(item3=>{return(<p>{item3}</p>)})}</td>
        <td><b>{this.Seshanba(key,number)[0]}</b><br/><br/> {this.Seshanba(key,number)[1].map(item3=>{return(<p>{item3}</p>)})}</td>
        <td><b>{this.Chorshanba(key,number)[0]}</b><br/><br/> {this.Chorshanba(key,number)[1].map(item3=>{return(<p>{item3}</p>)})}</td>
        <td><b>{this.Payshanba(key,number)[0]}</b><br/><br/> {this.Payshanba(key,number)[1].map(item3=>{return(<p>{item3}</p>)})}</td>
        <td><b>{this.Juma(key,number)[0]}</b><br/><br/> {this.Juma(key,number)[1].map(item3=>{return(<p>{item3}</p>)})}</td>
        <td><b>{this.Shanba(key,number)[0]}</b><br/><br/> {this.Shanba(key,number)[1].map(item3=>{return(<p>{item3}</p>)})}</td>
        
        </tr>)
        
    }):'':''}
  
  </tbody>
</table></div>)
}):''}

        </Container>      
      </div>
    )
  }
}
