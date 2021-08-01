import React, { Component } from 'react'
import styles from '../css/sport.module.css'
import { Container,Row,Col,Button,Form } from 'react-bootstrap'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'
import { Modal, Space } from 'antd';
export default class Xavfsizlik extends Component {
    state={
        teachers:[
            {
                rasm: "https://randomuser.me/api/portraits/men/3.jpg",
                name:'Zohidova Odina',
                lavozim:'Qorovul',
                matn:"O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
                email:'odina@gmail.com',
                telefon:'+99923623565',
                vaqt:'1-smena 8:30 dan 13:30 gacha'


            },
            {
                rasm: "https://randomuser.me/api/portraits/men/3.jpg",
                name:'Raximov Asilbek',
                lavozim:'Militsiya xodimi',
                matn:"O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
                email:'raximob@gmail.com',
                telefon:'+99956523565',
                vaqt:'1-smena 8:30 dan 13:30 gacha'


            },
        ],
        teacher1:{
            rasm:'',
            name:'',
            lavozim:'',
            matn:'',
            email:'',
            telefon:'',
            vaqt:''
        },
        edit1:null,
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      hideModal = () => {
        this.setState({
          visible: false,
        });
      };
      saveTeacher1=()=>{
        var rasm=document.getElementById('rasm').value
        var name=document.getElementById('name').value
        var lavozim=document.getElementById('lavozim').value
        var matn=document.getElementById('matn').value
        var email=document.getElementById('email').value
        var telefon=document.getElementById('telefon').value
        var vaqt=document.getElementById('vaqt').value
    
        var murabbiy={
            rasm,
            name,
            lavozim,
            matn,
            email,
            telefon,
            vaqt
        }
        var newmurabbiy=this.state.teachers;
        if(this.state.edit1===null){
          newmurabbiy.push(murabbiy)
          this.setState({
              teachers:newmurabbiy
          })
        }else{
           newmurabbiy[this.state.edit1]=murabbiy
           this.setState({
               edit1:null
           })
        }
        this.hideModal()
      }
      editTeacher1=(id)=>{
        this.setState({
            teacher1:this.state.teachers[id],
            edit1:id
        })
        this.showModal()
      }
      deleteTeacher1=(id)=>{
        var newmurabbiy=this.state.teachers;
        newmurabbiy.splice(id,1)
        this.setState({
            teachers:newmurabbiy
        })
      }
      reset=()=>{
        document.getElementById('rasm').value=''
        document.getElementById('name').value=''
        document.getElementById('lavozim').value=''
        document.getElementById('email').value=''
        document.getElementById('telefon').value=''
        document.getElementById('vaqt').value=''
        this.setState({
          edit:null
        })
      }
    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                    <h1  style={{fontSize:'30px',fontFamily:'"Lobster",cursive',display:'inline-block',marginRight:'30px'}}>Xavfsizlik <Button onClick={this.showModal} style={{marginLeft:'30px',backgroundColor:'#187CC0',border:'none'}}>Qo'shish</Button></h1>
                        {
                            this.state.teachers.map((item,key)=>{
                                return(
                                    <Col lg={4} md={12} sm={12}>
                            <div className={styles.card}>
                            <div className={styles.card, styles.cardone}>
                                <header>
                                <div className={styles.avatar}>
                                    <img src={item.rasm} alt="Jhon Doe" />
                                </div>
                                </header>

                                <h3 className={styles.headerName}>{item.name}</h3>
                                <div className={styles.desc}>
                                <Button className={styles.btncard}>{item.lavozim}</Button>
                                <p>{item.matn}</p>
                                <p style={{marginTop:'-40px',fontWeight:'900'}}>{item.email}</p>
                                <p style={{marginTop:'-40px',fontWeight:'900'}}>{item.telefon}</p>
                                <p style={{marginTop:'-40px',fontWeight:'900'}}>{item.vaqt}</p>

                                </div>

                                <footer className={styles.footer} style={{marginTop:'-40px',fontWeight:'900'}}>
                                <AiOutlineEdit style={{color:'green',fontSize:'20px'}} onClick={()=> this.editTeacher1(key)}/>
                                <AiOutlineDelete style={{color:'red',fontSize:'20px',marginLeft:'5px'}} onClick={()=> this.deleteTeacher1(key)}/>
                                
                                </footer>
                            </div>

                            </div>
                        </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
                <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          footer={false}
        >
           <Form id="formAdmin">
            <Form.Group controlId="rasm">
              <Form.Control type="file" placeholder="Rasm" defaultValue={this.state.teacher1.rasm}/>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Control type="text" placeholder="F.I.O" defaultValue={this.state.teacher1.name}/>
            </Form.Group>
            <Form.Group controlId="lavozim">
              <Form.Control type="text" placeholder="Lavozimini kiriting" defaultValue={this.state.teacher1.lavozim}/>
            </Form.Group>
            <Form.Group controlId="matn">
              <Form.Control type="text" placeholder="Murabbiy haqida ma'lumot" defaultValue={this.state.teacher1.matn}/>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="E-mail kiriting" defaultValue={this.state.teacher1.email}/>
            </Form.Group>
            <Form.Group controlId="telefon">
              <Form.Control type="text" placeholder="Telefon kiriting" defaultValue={this.state.teacher1.telefon}/>
            </Form.Group>
            <Form.Group controlId="vaqt">
              <Form.Control type="text" placeholder="Telefon kiriting" defaultValue={this.state.teacher1.vaqt}/>
            </Form.Group>
            <a href="#2"><Button variant="primary" className={styles.inputFormBtn} onClick={this.saveTeacher1}>
            O'zgarishlarni saqlash
            </Button></a>
            <Button variant="primary" className={styles.inputFormBtn1} onClick={this.hideModal}>
                            Bekor qilish
            </Button>

      
        </Form>
        </Modal>
            </div>
        )
    }
}
