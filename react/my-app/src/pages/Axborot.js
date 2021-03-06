import React, { Component } from 'react'
import styles from '../css/sport.module.css'
import { Container, Row, Col, Button,Form} from 'react-bootstrap'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'

import { Modal } from "antd"
export default class Musiqa extends Component {
    state = {
        musiqa1:{},
        edit:null,
        musiqalar:[
        {
            title: "Android",
            day:'Dush-chor-juma',
            time:'12:30 dan 14:30 gacha ',
            location:"1-sport zal",
        },
        {
            title: "Web developer",
            day:'Sesh-pay-shanba',
            time:'11:30 dan 13:30 gacha ',
            location:"1-sport zal",
        },
        {
            title: "Ios",
            day:'Dush-chor-juma',
            time:'11:30 dan 14:30 gacha ',
            location:"2-sport zal",
        },
        
    ],
        teachers: [
            {
                rasm: "https://randomuser.me/api/portraits/men/3.jpg",
                name: 'Zohidova Odina',
                lavozim: 'Full Web developer',
                matn: "O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
                email: 'odina@gmail.com',
                telefon: '+99923623565'

            },
            {
                rasm: "https://randomuser.me/api/portraits/men/3.jpg",
                name: 'Raximov Asilbek',
                lavozim: 'Android developer',
                matn: "O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
                email: 'raximob@gmail.com',
                telefon: '+99956523565'

            },
            {
                rasm: "https://randomuser.me/api/portraits/men/3.jpg",
                name: 'Asadova Mohinur',
                lavozim: 'Javascript developer',
                matn: "O'zbekiston Respublikasi chempioni,Yoshlar orasida yetakchi murabbiy",
                email: 'mohinur@gmail.com',
                telefon: '+99956523565'

            },
        ],
        teacher1:{
            rasm:'',
            name:'',
            lavozim:'',
            matn:'',
            email:'',
            telefon:''
        },
        edit1:null,
    }
    saveMusiqa=()=>{
        var title=document.getElementById('title').value
        var day=document.getElementById('day').value
        var time=document.getElementById('time').value
        var location=document.getElementById('location').value
        var musiqa={
            title,
            day,
            time,
            location,
        }
        var newmusiqa=this.state.musiqalar;
       if(this.state.edit===null){
        newmusiqa.push(musiqa);
        this.setState({
            musiqalar:newmusiqa
        })
       }else{
           newmusiqa[this.state.edit]=musiqa
           this.setState({
             edit:null
           })
       }
        this.reset()
    }
    deleteMusiqa=(id)=>{
        var newmusiqa=this.state.musiqalar;
        newmusiqa.splice(id,1)
        this.setState({
            musiqalar:newmusiqa
        })
    
    }
   editMusiqa=(id)=>{
       this.setState({
           musiqa1:this.state.musiqalar[id],
           edit:id
       })
   }
    reset=()=>{
      document.getElementById('title').value=''
      document.getElementById('day').value=''
      document.getElementById('time').value=''
      document.getElementById('location').value=''
      this.setState({
        edit:null
      })
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
        var murabbiy={
            rasm,
            name,
            lavozim,
            matn,
            email,
            telefon
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
    render() {
        return (
            <div>
                <Container fluid>

                    <Row>
                    <h1  style={{fontSize:'30px',fontFamily:'"Lobster",cursive',display:'inline-block',marginRight:'30px'}}>Axborot texnologiyalari <Button onClick={this.showModal} style={{marginLeft:'30px',backgroundColor:'#187CC0',border:'none'}}>Qo'shish</Button></h1>
                        {
                            this.state.teachers.map((item, key) => {
                                return (
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
                                                    <p style={{ marginTop: '-40px', fontWeight: '900' }}>{item.email}</p>
                                                    <p style={{ marginTop: '-40px', fontWeight: '900' }}>{item.telefon}</p>
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

                        <Col lg={12} style={{ marginTop: '30px' }}>
                        <div>
        <div className={styles.formAdmin}>
                                  <h4>Dars jadvalini kiritish</h4>
                              <Form id="formAdmin">
            <Form.Group controlId="title">
              <Form.Control className="formInput" type="text" placeholder="Musiqa turini kiritning" defaultValue={this.state.musiqa1.fullname}/>
            </Form.Group>
            <Form.Group controlId="day">
              <Form.Control className="formInput" type="text" placeholder="Kunni kiriting" defaultValue={this.state.musiqa1.day}/>
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Control className="formInput" type="text" placeholder="Vaqtni kiriting" defaultValue={this.state.musiqa1.time}/>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Control className="formInput" type="text" placeholder="Dars o'tiladigan joyni kiriting" defaultValue={this.state.musiqa1.location}/>
            </Form.Group>
            <a href="#2"><Button variant="primary" className={styles.inputFormBtn} onClick={this.saveMusiqa}>
            O'zgarishlarni saqlash
            </Button></a>
            <Button variant="primary" className={styles.inputFormBtn1} onClick={this.reset}>
                            Bekor qilish
            </Button>

      
        </Form>
                                  </div>
                                <Container fluid style={{padding:'0'}}>
                                  <Row>
                                  {
                                      this.state.musiqalar.map((item,key)=>{
                                       return(
                                        <Col xl={4} lg={6} md={6} sm={6} className={styles.containerKonkurslar}>
                                        <div className={styles.cardsKonkurslar}>
                                            <h2>{item.title}</h2>
                                            <span>Dars kunlari:</span>
                                            <p>{item.day}</p>
                                            <span>Dars vaqti:</span>
                                            <p>{item.time}</p>
                                            <span>Dars o'tiladigan joy:</span>
                                            <p>{item.location}</p>
                              
                                            <span><AiOutlineEdit style={{marginRight:'5px',color:'green',fontSize:'20px'}} onClick={()=> this.editMusiqa(key)}/></span>
                                           
                                            <span><AiOutlineDelete style={{color:'red',fontSize:'20px'}} onClick={()=> this.deleteMusiqa(key)}/></span>
                                        </div>
                                    </Col>
                                       )
                                      })
                                  }
                                  </Row>
                                </Container>
        </div>

                        </Col>
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
              <Form.Control className="formInput" type="file" placeholder="Rasm" defaultValue={this.state.teacher1.rasm}/>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Control className="formInput" type="text" placeholder="F.I.O" defaultValue={this.state.teacher1.name}/>
            </Form.Group>
            <Form.Group controlId="lavozim">
              <Form.Control className="formInput" type="text" placeholder="Lavozimini kiriting" defaultValue={this.state.teacher1.lavozim}/>
            </Form.Group>
            <Form.Group controlId="matn">
              <Form.Control className="formInput" type="text" placeholder="Murabbiy haqida ma'lumot" defaultValue={this.state.teacher1.matn}/>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control className="formInput" type="email" placeholder="E-mail kiriting" defaultValue={this.state.teacher1.email}/>
            </Form.Group>
            <Form.Group controlId="telefon">
              <Form.Control className="formInput" type="text" placeholder="Telefon kiriting" defaultValue={this.state.teacher1.telefon}/>
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
