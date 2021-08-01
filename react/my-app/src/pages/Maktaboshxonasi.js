import React,{Component} from 'react'
import styles from '../css/maktaboshxonasi.module.css'
import {Container,Row,Col} from 'react-bootstrap'
import {Form,Button} from 'react-bootstrap'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'
export default class Sport extends Component {

    state={
        edit:null,
        taom1:{},
       taomlar:[
        {
        kun:'dushanba',
        taom:['kartoshka fri','goshtsay','salat']
        },
        {
            kun:'seshanba',
            taom:['kartoshka fri','goshtsay','salat']
        }
    ]
  }
  saveTaom=()=>{
      var kun=document.getElementById('kun').value
      var taom=document.getElementById('taom').value.split(',')
      var menyu={
          kun,
          taom
      }
      var newtaom=this.state.taomlar
      if(this.state.edit===null){
          newtaom.push(menyu)
          this.setState({
              taomlar:newtaom
          })
      } else{
          newtaom[this.state.edit]=menyu
          this.setState({
              edit:null
          })
      }
      this.reset()
  }
  deleteTaom=(id)=>{
      var taom=this.state.taomlar;
      taom.splice(id,1);
      this.setState({
          taomlar:taom
      })
  }
  editTaom=(id)=>{
      var taom=this.state.taomlar[id];
      this.setState({
          taom1:taom,
          edit:id
      })
  }
  reset=()=>{
      document.getElementById('kun').value=''
      document.getElementById('taom').value=''
  }
   render(){
    return (
        <div>
            <h1 className={styles.topM}>Maktab oshxonasi</h1>
              <Container fluid>
                  <Row>
                  <Col lg={12} style={{marginTop:'30px'}}>
                        <div>
        <div className={styles.formAdmin}>
                                  <h4>Dars jadvalini kiritish</h4>
                              <Form id="formAdmin">
            <Form.Group controlId="kun">
              <Form.Control type="text" placeholder="Hafta kunini kiritning" defaultValue={this.state.taom1.kun}/>
            </Form.Group>
            <Form.Group controlId="taom">
              <Form.Control type="text" placeholder="Kunni kiriting" defaultValue={this.state.taom1.taom}/>
            </Form.Group>
            <a href="#2"><Button variant="primary" className={styles.inputFormBtn} onClick={this.saveTaom}>
            O'zgarishlarni saqlash
            </Button></a>
            <Button variant="primary" className={styles.inputFormBtn1} onClick={this.reset}>
                            Bekor qilish
            </Button>
            </Form>
                                  </div>
                                  </div>
                                  </Col>
                                  {
                                      this.state.taomlar.map((item,key)=>{
                                       return(
                                        <Col xl={3} lg={4} md={6} sm={6} className={styles.containerKonkurslar}>
                                        <div className={styles.cardsKonkurslar}>
                                            <h2>{item.kun}</h2>
                                            <p>Taomnoma:</p>
                                            {
                                                item.taom.map(item=>{
                                                   return(
                                                    <p>{item}</p>
                                                   )
                                                })
                                            }
                              
                                            <span><AiOutlineEdit style={{marginRight:'5px',color:'green',fontSize:'20px'}} onClick={()=> this.editTaom(key)}/></span>
                                           
                                            <span><AiOutlineDelete style={{color:'red',fontSize:'20px'}} onClick={()=> this.deleteTaom(key)}/></span>
                                        </div>
                                    </Col>
                                       )
                                      })
                                  }
                  </Row>
              </Container>
        </div>
    )
}
}