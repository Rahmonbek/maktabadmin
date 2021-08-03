import React, { Component } from 'react'
import styles from '../css/sport.module.css'
import { Container,Row,Col,Button,Form,Table} from 'react-bootstrap'
import new1 from '../img/new1.jpg'
import { Modal, Select} from 'antd'
import { getXodim } from '../host/Config'

export default class DarsJadvali extends Component {
    state = {
        mutaxassislik:[],
        visible: false,
        selectedFile:null,
        teacher: {},
        edit: null,
        teacher1:{
          name:'',
          tugilgansana:'',
          rasm:'',
          malumot:'',
          mutaxassislik:'',
          qabulsoati:'',
          email:'',
          telefon:''
        },
        teachers: []
    }
      showModal = () => {
        this.setState({
          visible: true,
        })
      }
    
      hideModal = () => {
        this.setState({
          visible: false,
        })
      }
      getXodim=()=>{
        getXodim().then(res=>{this.setState({teachers: res.data});
         }).catch(err=>console.log(err))
      }
      saveTeacher = () => {
        var name = document.getElementById('name').value
        var tugilgansana = document.getElementById('tugilgansana').value
        var rasm = document.getElementById('rasm').value
        var malumot = document.getElementById('malumot').value
        var mutaxassislik = this.state.mutaxassislik
        var qabulsoati= document.getElementById('qabulsoati').value
        var email = document.getElementById('email').value
        var telefon = document.getElementById('telefon').value
        var login = document.getElementById('login').value
        var parol = document.getElementById('parol').value
        var teacher = {
          name,
          tugilgansana,
          rasm,
          malumot,
          mutaxassislik,
          qabulsoati,
          email,
          telefon,
          login,
          parol    
        }
    
        var teachertable = this.state.teachers
    
        if(this.state.edit==null){
            teachertable.push(teacher)
            this.setState({
                teachers:teachertable
            })
            console.log(teachertable)
        }
        else{
            teachertable[this.state.edit] = teacher
            this.setState({
                teacher: {},
                edit: null
            })
        }
        this.setState({
            teachers: teachertable
        })
        this.reset()
        this.hideModal()
    }
    deleteTeacher = (value) => {
      var newteacher=this.state.teachers
      newteacher.splice(value,1)
      this.setState({
        teachers:newteacher
      })
    }
    editTeacher=(id)=>{
     var newteacher=this.state.teachers[id]
     console.log(newteacher)
     this.setState({
       teacher1:newteacher,
       edit:id
     })
     this.showModal()
    }
    reset=()=>{
      document.getElementById('name').value=''
      document.getElementById('tugilgansana').value=''
      document.getElementById('rasm').value=''
      document.getElementById('malumot').value=''
      document.getElementById('mutaxassislik').value=''
      document.getElementById('qabulsoati').value=''
      document.getElementById('email').value=''
      document.getElementById('telefon').value=''
      document.getElementById('login').value=''
      document.getElementById('parol').value=''
      this.setState({
        edit:null
      })
    }
    saveMutaxassislik=(e)=>{
      var newmutax=e;
      this.setState({
        mutaxassislik:newmutax
      })
    }
    componentDidMount(){
      this.getXodim()
    }
    render() {
        const { Option } = Select;
          return (
            <div>
                <Container fluid style={{padding:'0',marginRight:'20px'}}>               
                  <Row>
                    <Col lg={12} style={{padding:'0'}}>
                    <h1  style={{fontSize:'30px',fontFamily:'"Lobster",cursive',display:'inline-block',marginRight:'30px'}}>O'qituvchilar <Button onClick={this.showModal} style={{marginLeft:'30px',backgroundColor:'#187CC0',border:'none'}}>Qo'shish</Button></h1>
                    </Col>
                  <Col lg={12} style={{padding:'0',marginRight:'20px'}}>
                  <Table style={{backgroundColor:'white',border:'none', boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',borderRadius:'5px',marginRight:'20px'}} >
                        <thead style={{borderBottom:'none'}}>
                            <tr style={{borderBottom:'none'}}>
                            <th>#</th>
                            <th>F.I.O</th>
                            <th>Rasm</th>
                            <th>Ma'lumot</th>
                            <th>Mutaxassislik</th>
                            <th>Telefon</th>
                            <th>Login</th>                          
                            <th>E-mail</th>
                            <th>Manzil</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>                      
                            </tr>
                        </thead>
                        <tbody style={{border:'none'}}>
                         {
                             this.state.teachers!==[]?this.state.teachers.map((item, key)=>{
                               console.log(item)
                              return(
                                <tr>
                                <td>{key+1}</td>
                                <td>{item.user.last_name} {item.user.first_name}</td>
                                <td>{item.image}</td>
                                <td>{item.description}</td>
                                <td>{item.speciality}</td>
                                <td>{item.phone}</td>
                                <td>{item.user.username}</td>
                                <td>{item.user.email}</td>
                                <td>{item.position}</td>
                                <td><Button style={{backgroundColor:'#187CC0',padding:'3px 10px',fontSize:'17px',border:'none'}} onClick={()=> this.editTeacher(key)}>O'zgartirish</Button></td>
                                <td><Button style={{backgroundColor:'red',padding:'3px 10px',fontSize:'17px',border:'none'}}  onClick={()=> this.deleteTeacher(key)}>O'chirish</Button></td>
                                </tr>
                              )
                             }):''
                         }
                        </tbody>
                        </Table>
                  </Col>
                  </Row>      
                </Container>
                <Modal
                        title="O'qituvchi kiritish"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        footer={false}
                        >
                       <Form id="formAdmint">
                                  <Form.Group controlId="name">
                                    <Form.Control type="text" placeholder="F.I.O" defaultValue={this.state.teacher1.nomi}/>
                                  </Form.Group>
                                  <Form.Group controlId="tugilgansana">
                                    <Form.Control type="text" placeholder="Tug'ilgan sanasi" defaultValue={this.state.teacher1.sana}/>
                                  </Form.Group>
                                  <Form.Group controlId="malumot">
                                    <Form.Control type="text" placeholder="Ma'lumotini kiriting" defaultValue={this.state.teacher1.sana}/>
                                  </Form.Group>
                                  <Form.Group controlId="rasm">
                                    <Form.Control type="file" placeholder="Rasm kiriting" defaultValue={this.state.teacher1.rasm} onChange={(e)=>this.handleImage(e)}/>
                                  </Form.Group>
                                  <Form.Group controlId="qabulsoati">
                                    <Form.Control type="text" placeholder="Qabul soatini kiriting" defaultValue={this.state.teacher1.qabulsoat}/>
                                  </Form.Group>
                                  <Form.Group controlId="email">
                                    <Form.Control type="email" placeholder="Emailini kiriting" defaultValue={this.state.teacher1.email}/>
                                  </Form.Group>
                                  <Form.Group controlId="telefon">
                                    <Form.Control type="text" placeholder="Telefonini  kiriting" defaultValue={this.state.teacher1.telefon}/>
                                  </Form.Group>
                                  <Form.Group controlId="login">
                                    <Form.Control type="text" placeholder="Loginni  kiriting" defaultValue={this.state.teacher1.login}/>
                                  </Form.Group>
                                  <Form.Group controlId="parol">
                                    <Form.Control type="text" placeholder="Parolni  kiriting" defaultValue={this.state.teacher1.parol}/>
                                  </Form.Group>
                                  <Form.Group>
                                  <Select
                                        id="mutaxassislik"
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="select one country"
                                        defaultValue={['matematika']}
                                        onChange={this.saveMutaxassislik}
                                        optionLabelProp="label"
                                    >
                                        <Option value="bilogiya" label="China">
                                        <div className="demo-option-label-item">
                                            <span role="img" aria-label="China">
                                             Bilogiya
                                            </span>
                                        </div>
                                        </Option>
                                        <Option value="geometriya" label="USA">
                                        <div className="demo-option-label-item">
                                            <span role="img" aria-label="USA">
                                            Geometriya
                                            </span>
                                        </div>
                                        </Option>
                                        <Option value="geografiya" label="Japan">
                                        <div className="demo-option-label-item">
                                            <span role="img" aria-label="Japan">
                                            Geografiya
                                            </span>
                                        </div>
                                        </Option>
                                        <Option value="kimyo" label="Korea">
                                        <div className="demo-option-label-item">
                                            <span role="img" aria-label="Korea">
                                            Kimyo
                                            </span>
                                        </div>
                                        </Option>
                                    </Select>
                                  </Form.Group>

                                  <Button variant="primary" className={styles.inputFormBtn} onClick={()=> this.saveTeacher()}>
                                  Saqlash
                                  </Button>
                                  <Button variant="danger" className={styles.inputFormBtn1} onClick={this.hideModal}>
                                                  Bekor qilish
                                  </Button>   
                              </Form>
        </Modal>
            </div>
        )
    }
}
