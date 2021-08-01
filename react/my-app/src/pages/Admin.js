import React, { Component } from 'react'
import styles from '../css/admin.module.css'
import {Form,Button,Table} from 'react-bootstrap'
import { Select } from 'antd';
import {Container,Row,Col} from 'react-bootstrap'

export default class Admin extends Component {
    state={
        group1:{},
        group:{},
        edit:null,
        edit1:null,
        teacher1:{},
        teacher:[],
        fan:'',
        ustoz:[],
        toplam:[
            {
                fan1:'',
                ustoz1:[]
            }
        ],
        toplam1:{},
        groups:[
            {
              sinf:'9-B',
              rahbar:'Toshmatov Botir',
              dars:[
                  {
                      fan1:'matematika',
                      ustoz1:['zohidova','umarov']
                  },
                  {
                    fan1:'biologiya',
                    ustoz1:['zohidova','umarov']
                },
              ]
            }
        ]

    }
    saveFan=()=>{
        console.log(this.state.fan,this.state.ustoz)
        var newtoplam=this.state.toplam
        newtoplam.push({
            fan1:this.state.fan,
            ustoz1:this.state.ustoz
        })
        this.setState({
            toplam:newtoplam
        })
        // this.setState({
        //     toplam1:{
        //         fan1:this.state.fan,
        //         ustoz1:this.state.ustoz
        //     }
        // }) 
        // console.log(this.state.toplam1)
        // var newtoplam=this.state.toplam
        // newtoplam.push(this.state.toplam1)
        // this.setState({
        //     toplam:newtoplam,
        //     fan:[],
        //     ustoz:[]
        // })
      }
     saveGroup=()=>{ 
         
          var sinf=document.getElementById('formSinf').value
          var rahbar=document.getElementById('formRahbar').value
          var dars=this.state.toplam
          dars.splice(0,1)
          console.log(dars)
          var group4={
            sinf,
            rahbar,
            dars
          }
          console.log(group4)
          var newgroup=this.state.groups
          newgroup.push(group4)
          this.setState({
              groups:newgroup
          })

          console.log(this.state.groups)

         
      }
       reset1=()=>{
          document.getElementById('formSinf').value=''
          document.getElementById('formRahbar').value=''
          this.setState({
            edit1:null
        })
          
        } 
        setfan=(values)=>{
            var fan1=values
            this.setState({
                fan:fan1
            })
            console.log(this.state.fan)
        }
        setUstoz=(values)=>{
            var ustoz1=values
            this.setState({
                ustoz:ustoz1
            })
            console.log(this.state.ustoz)

        }
    render() {
const { Option } = Select;
        return (
            <div>
                <Container fluid>
                  <Row>
                      <Col lg={12} id="1">
                          <h1 style={{fontSize:'30px',marginLeft:'10px'}} className={styles.adminTop}>Xush kelibsiz Admin !</h1>
                          <Row>
                              <Col lg={12}>
                              <div className={styles.formAdmin} style={{width:'90%'}}>
                                  <h4>Sinf kiritish</h4>
                              <Form>
            <Form.Group controlId="formSinf">
              <Form.Control type="text" placeholder='9-"B"' defaultValue={this.state.group1.sinf}/>
            </Form.Group>
            <Form.Group controlId="formRahbar">
              <Form.Control type="text" placeholder="Rahbarini kiriting" defaultValue={this.state.group1.rahbar}/>
            </Form.Group>
            <Form.Group style={{display: 'inline-block',width:'80%'}}>
            <Select
    showSearch
    style={{ width: '25%',display: 'inline-block',marginRight:'20px'}}
    placeholder="Fanni tanlang"
    optionFilterProp="children"
    onChange={this.setfan}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="matematika">Matematika</Option>
    <Option value="fizika">Fizika</Option>
    <Option value="kimyo">Kimyo</Option>
    <Option value="rus tili">Rus tili</Option>
    <Option value="ingliz tili">Ingliz tili</Option>

  </Select>
                  <Select
    mode="multiple"
    style={{ width: '70%',display: 'inline-block' }}
    placeholder="Uztozni tanlang"
    defaultValue={['Zohidova O.']}
    onChange={this.setUstoz}
    optionLabelProp="label"
  >
    <Option value="Abdukarimov Sh." label="Abdukarimov Sh.">
      <div className="demo-option-label-item">
        <span role="img" aria-label="China">
          Abdukarimov Sh.
        </span>
      </div>
    </Option>
    <Option value="Xoshimova N." label="Xoshimova N.">
      <div className="demo-option-label-item">
        <span role="img" aria-label="USA">
          Xoshimova N.
        </span>
      </div>
    </Option>
    <Option value="Raximova B." label="Raximova B.">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Japan">
          Raximova B.
        </span>
      </div>
    </Option>
    <Option value="Toshmatov T." label="Toshmatov T.">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Toshmatov T.">
          Toshmatov T.
        </span>
      </div>
    </Option>
  </Select>
            </Form.Group>
            <Button variant="primary" className={styles.inputFormBtn} onClick={this.saveFan} style={{display:'inline-block',width:'10%'}}>
            Qo'shish
            </Button>
            <Button variant="primary" className={styles.inputFormBtn} onClick={this.saveGroup}>
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
                      <Table style={{backgroundColor:'white',border:'none', boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',borderRadius:'5px'}} >
                        <thead style={{borderBottom:'none'}}>
                            <tr style={{borderBottom:'none'}}>
                            <th>#</th>
                            <th>Sinf</th>
                            <th>Raxbar</th>
                            <th>Dars</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>                      
                            </tr>
                        </thead>
                        <tbody style={{border:'none'}}>
                         {
                             this.state.groups.map((item,key)=>{
                              return(
                                <tr>
                                <td>{key+1}</td>
                                <td>{item.sinf}</td>
                                <td>{item.rahbar}</td>
                                <td>
                                {
                                    item.dars.map((item2,key2)=>{
                                        return(
                                            <p>{item2.fan1}-{item2.ustoz1},</p>
                                        
                                    )})
                                }
                                </td>
                                <td><Button style={{backgroundColor:'#187CC0',padding:'3px 10px',fontSize:'17px',border:'none'}}>O'zgartirish</Button></td>
                                <td><Button style={{backgroundColor:'#187CC0',padding:'3px 10px',fontSize:'17px',border:'none'}}>O'chirish</Button></td>
                                
                                </tr>
                              )
                             })
                         }
                        </tbody>
                        </Table>
                  </Col>
                    </Row>               
                </Container>
            </div>
        )
    }
}
