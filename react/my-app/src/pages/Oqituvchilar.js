import React, { Component } from 'react'
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import { createXodim, deleteXodim, getSpec,editXodim, getXodim, patchXodim } from '../host/Config'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import style from '../css/xodim.module.css'
import styles from '../css/modalStyle.css'
import clsx from 'clsx';
import Modal from 'antd/lib/modal/Modal';
import ImageDemo from './ImageDemo';
import { Input, Select, Form} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import { url } from '../host/Host';
import { Option } from 'antd/lib/mentions';

export default class Oqituvchilar extends Component {
    state = {
        mutaxassislik:[],
        visible: false,
        selectedFile:null,
        teacher: {},
        edit: null,
        previewImage: false,
        teachers: [],
        expanded: [],
        options: [],
        image: null,
    }
    openModal = () => {
      this.setState({
        visible: true,
      })
    }
    hideModal = () => {
        this.setState({
          visible: false,
        })
        this.reset()
    }
      getSpec=()=>{
        getSpec().then(res=>{this.setState({options: res.data}); console.log(res.data)}).catch(err=>console.log(err))
      }
      getXodim=()=>{
        getXodim().then(res=>{return this.setState({teachers: res.data})
         }).catch(err=>console.log(err))
      }
      editXodim=(id)=>{
        axios.get(`${url}/staff/`).then(res=>{
          this.setState({
            edit: res.data[id].id
          })
          document.getElementById('firstname').value = res.data[id].user.first_name
          document.getElementById('lastname').value = res.data[id].user.last_name
          document.getElementById('username').value = res.data[id].user.username
          document.getElementById('email').value = res.data[id].user.email
          document.getElementById('password').value = res.data[id].user.password
          document.getElementsById('confirmPassword').style.display='none'
          document.getElementById('phone').value = res.data[id].phone
          document.getElementById('description').value = res.data[id].description
          document.getElementById('position').value = res.data[id].position
        }).catch(err=>console.log(err))
        this.openModal()
       }
      saveXodim = () => {
        var firstname = document.getElementById('firstname').value
        var lastname = document.getElementById('lastname').value
        var image = this.state.image
        var username = document.getElementById('username').value
        var email = document.getElementById('email').value
        var password= document.getElementById('password').value
        var confirmPassword = document.getElementById('confirmPassword').value
        var phone = document.getElementById('phone').value
        var description = document.getElementById('description').value
        var position = document.getElementById('position').value
       var speciality=[1,2,3]
        if(confirmPassword!==password) {
          return document.querySelector('.red').style.color = 'red'
        }
        var teacher = {
          user: {
            first_name: firstname,
            last_name: lastname,
            username: username,
            password: password,
            email: email
          },
          phone: phone,
          speciality: speciality,
          image: this.state.image,
          description: description
        }
        let formData = new FormData()
     
        formData.append(
          'position',
         position ?? ''
        )
        // formData.append(
        //   'first_name',
        //  firstname ?? ''
        // )
        // formData.append(
        //   'last_name',
        //  lastname ?? ''
        // )
        // formData.append(
        //   'username',
        //  username ?? ''
        // )
        // formData.append(
        //   'password',
        //  password ?? ''
        // )
        // formData.append(
        //   'email',
        //  email ?? ''
        // )
        formData.append(
          'image',
          this.state.image ?? ''
        )
        formData.append(
          'phone',
         phone ?? ''
        )
        // formData.append(
        //   'speciality',
        //  speciality ?? ''
        // )
        formData.append(
          'description',
         description ?? ''
        )
        if(this.state.edit!==null) {
          editXodim(formData, this.state.edit).then(res=>{
            
            this.getXodim();
          }).catch(err=>console.log(err))
        } else {
          createXodim(formData).then(res=>{
          patchXodim({speciality:speciality, user:teacher.user}, res.data.id).then(res1=>{
            this.getXodim()
         
          }).catch(err1=>{console.log(err1)})  
             }).catch(err=>{console.log(err)})
        }
        this.hideModal()
    }
    deleteXodim = (id) => {
      deleteXodim(id).then(res=>{this.getXodim()}).catch(err=>console.log(err))
    }
    reset=()=>{
      document.getElementById('firstname').value = ''
      document.getElementById('lastname').value = ''
      document.getElementById('username').value = ''
      document.getElementById('email').value = ''
      document.getElementById('password').value = ''
      document.getElementById('confirmPassword').value = ''
      document.getElementById('phone').value = ''
      document.getElementById('description').value = ''
      document.getElementById('position').value = ''
      document.getElementById('confirmPassword').style.display = 'block'
      this.setState({
        edit:null,
        image: null
      })
    }
    customRequest = (e) => {
      console.log(e)
      let image = e.target.files[0]
      this.setState({
        image: image
      })
    }
    handleExpandClick = (id) => {
      var a= this.state.expanded
        a[id]=!a[id]
        this.setState({expanded:a})
    };
    saveMutaxassislik=(e)=>{
      var newmutax=e;
      this.setState({
        mutaxassislik:newmutax
      })
    }
    handleChange = (selectedOption) => {
      this.setState({selectedOption})
    }
    componentDidMount(){
      this.getXodim()
      this.getSpec()
    }
    render() {
      const selectedOption = this.state.selectedOption
          return (
            <div>
                <Container fluid><br/><br/>
                    <Button type="primary" onClick={()=>{this.openModal()}}>Xodim qo'shish</Button>
                        <Row>
                              {
                                  this.state.teachers!==null ? this.state.teachers.map((item, key)=>{
                                      return(<Col lg={4} md={6} sm={12} style={{marginTop:'20px'}}>
                                          <Card className={style.root}>
                                              <CardHeader title='Xodim'/>
                                                {item.image!==null ? 
                                                  <CardMedia
                                                    className={style.media}
                                                    image={item.image}
                                                    title={item.user.last_name + ' ' + item.user.first_name} /> : '' } 
                                                      <CardContent>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                          <p><b>Familyasi: </b>{item.user.last_name}</p>
                                                          <p><b>Ismi: </b>{item.user.first_name}</p>
                                                          <p><b>Login: </b>{item.user.username}</p>
                                                          <p><b>Password: </b>{item.user.password}</p>
                                                          <p><b>Mutaxassislik: </b>{item.speciality.map(item1=>{return (item1)})}</p>
                                                          <p><b>Sohasi: </b>{item.position}</p>
                                                          <p><b>Telefon raqami: </b>{item.phone}</p>
                                                          <p><b>Email: </b>{item.user.email}</p>
                                                        </Typography>
                                                      </CardContent>
                                                      <CardActions disableSpacing style={{display:'flex', justifyContent:'space-around'}}>
                                                          <OverlayTrigger
                                                          placement="bottom"
                                                          overlay={<Tooltip id="button-tooltip-2"    style={{marginTop:'15px'}}>O'zgartirish</Tooltip>} >
                                                            {({ ref, ...triggerHandler }) => (
                                                          <Button
                                                              onClick={()=>{this.editXodim(key)}}
                                                            variant="blue"
                                                            {...triggerHandler}
                                                            className="d-inline-flex align-items-center"
                                                          >
                                                            <Image
                                                              ref={ref}
                                                              
                                                            />
                                                          
                                                          <IconButton >
                                                            <BorderColorIcon />
                                                          </IconButton> 
                                                          </Button>
                                                        )}
                                                      </OverlayTrigger>
                                                          
                                                      <OverlayTrigger
                                                        
                                                        placement="bottom"
                                                        overlay={<Tooltip id="button-tooltip-2"    style={{marginTop:'15px'}}>O'chirish</Tooltip>}
                                                      >
                                                        {({ ref, ...triggerHandler }) => (
                                                          <Button
                                                            onClick={()=>{this.deleteXodim(item.id)}}
                                                            variant="#f70707d9"
                                                            {...triggerHandler}
                                                            className="d-inline-flex align-items-center"
                                                          >
                                                            <Image
                                                              ref={ref}
                                                              
                                                            />
                                                          
                                                          <IconButton >
                                                            <DeleteIcon />
                                                          </IconButton> 
                                                          </Button>
                                                        )}
                                                      </OverlayTrigger>
                                                        
                                                            <OverlayTrigger
                                                        
                                                  placement="bottom"
                                                  overlay={<Tooltip id="button-tooltip-2"    style={{marginTop:'15px'}}>Xodim haqida batafsil ma'lumot</Tooltip>}
                                                >
                                                  {({ ref, ...triggerHandler }) => (
                                              <Button
                                                variant="#F2F2F2"
                                                {...triggerHandler}
                                                className="d-inline-flex align-items-center" >
                                                  <Image ref={ref} />
                                                  <IconButton 
                                                    className={clsx(styles.expand, {
                                                      [styles.expandOpen]: this.state.expanded[key],
                                                    })}
                                                    onClick={()=>{this.handleExpandClick(key)}}
                                                    aria-expanded={this.state.expanded[key]}
                                                    aria-label="show more" >
                                                    <ExpandMoreIcon />
                                                  </IconButton>
                                              </Button>
                                            )}
                                        </OverlayTrigger>
                                    </CardActions>
                                  <Collapse in={this.state.expanded[key]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                      <Typography paragraph style={{fontSize:'16px'}}>
                                        <p>Qo'shimcha ma'lumot</p>
                                        <p>{item.description}</p>
                                      </Typography>
                                    </CardContent>
                                  </Collapse>
                                </Card>
                              </Col>)
                          }) : ''
                      }
                  </Row>
                </Container>
                <Modal title="Xodim" width="50%" visible={this.state.visible} footer={false} onCancel={()=>{this.hideModal()}}>
                <Form>
                  <Form.Item 
                  className="mb-3" 
                  label="Familya"
                  name="lastname"
                  rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <Input placeholder="Familya"/> 
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="firstname"
                    label="Ism"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                    > 
                      <Input placeholder="Ism"/>
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="image"
                    label="Rasm"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <Input onChange={this.customRequest} type="file" required={false} style={{marginBottom: '20px'}} accept="image/jpg, image/jpeg, image/png"/>
                      {(this.state.previewImage) ? ImageDemo(this.state.imageUrl) : ''}
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="username"
                    label="Login"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  > 
                    <Input placeholder='Login'/>
                  </Form.Item>

                  <Form.Item 
                    className="mb-3 red" 
                    name="password"
                    label="Parol"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <Input type='password' placeholder='Parol'/> 
                  </Form.Item>

                  <Form.Item 
                    className="mb-3 red" 
                    name="confirmPassword"
                    label="Parol tekshirish"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  > 
                    <Input placeholder="Parol tekshirish" type="password"/>
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="email"
                    label="Email"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <Input type="email" placeholder="Email"/> 
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="position"
                    label="Soha"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <Input placeholder="Soha"/> 
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="speciality"
                    label="Mutaxassislik"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                      <Select
                          mode='multiple'
                          style={{width:'100%'}}
                          onChange={this.handleChange}
                          optionLabelProp="label"
                        >
                      {
                        this.state.options!==null ? this.state.options.map((item)=>{
                         
                          return (<Option value={item.id}  label={item.name}>{item.name}</Option>)
                        }) : ''
                      }</Select>
                  </Form.Item>

                  <Form.Item 
                    className="mb-3" 
                    name="phone"
                    label="Telefon raqam"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <Input placeholder="Telefon raqam"/> 
                  </Form.Item>


                  <Form.Item 
                    name="description" 
                    className="mb-3" 
                    style={{width:"100%"}}
                    label="Qo'shimcha ma'lumot"
                    rules={[{ required: false, message: 'Bu joyni to\'ldirish majburiy!' }]}
                  >
                    <TextArea
                      placeholder="Qo'shimcha ma'lumot"
                      style={{ height: '200px'}}
                    >
                    </TextArea>
                </Form.Item>
                <br/>
                <Button variant="danger" htmlType="button" style={{marginRight: '20px'}} onClick={()=>{this.hideModal()}}>
                    Bekor qilish
                </Button>
                <Button variant="primary" htmlType="button" onClick={()=>{this.saveXodim()}}>
                    Yaratish
                </Button>
              </Form>
            </Modal>
            </div>
        )
    }
}
