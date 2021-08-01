import React, { Component } from 'react'
import {Form, Container, Button,Col,Row} from 'react-bootstrap';
import styles from '../css/news.module.css'
import new1 from '../img/new1.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from "mui-datatables";
export default class Tadbirlar extends Component {

  state = {
    selectedFile:null,
    tadbir: {},
    edit: null,
    tadbir1:{},
    tadbirlar: [
        {
            nomi: 'Maktabda so`nggi qo`ng`iroq',
            sana: '04.06.2021',
            rasm: <img src={new1} style={{width:'100px'}}/>,
            matn: 'vvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvvvv',
        },
        {
          nomi: 'Maktabda so`nggi qo`ng`iroq ',
          sana: '04.06.2021',
          rasm: <img src={new1} style={{width:'100px'}}/>,
          matn: 'vvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvvvv',
        },
        {
          nomi: 'Maktabda so`nggi qo`ng`iroq ',
          sana: '04.06.2021',
          rasm: <img src={new1} style={{width:'100px'}}/>,
          matn: 'vvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvvvv',
        },
        {
          nomi: 'Maktabda so`nggi qo`ng`iroq ',
          sana: '04.06.2021',
          rasm: <img src={new1} style={{width:'100px'}}/>,
          matn: 'vvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvvvv',
        },
        {
          nomi: 'Maktabda so`nggi qo`ng`iroq ',
          sana: '04.06.2021',
          rasm: <img src={new1} style={{width:'100px'}}/>,
          matn: 'vvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvvvv',
        }
    ]
}
SaveTadbirTable = () => {
    var nomi = document.getElementById('formBasicNomi').value
    var sana = document.getElementById('formBasicSanasi').value
    var rasm = document.getElementById('formBasicRasmi').value
    var matn = document.getElementById('formBasicMatni').value
    

    var tadbir = {
       nomi,
        sana,
        rasm,
        matn,
        
    }

    var tadbirtable = this.state.tadbirlar

    if(this.state.edit==null){
        tadbirtable.push(tadbir)
    }
    else{
        tadbirtable[this.state.edit] = tadbir
        this.setState({
            tadbir: {},
            edit: null
        })
    }
    this.setState({
        tadbirlar: tadbirtable
    })
    this.reset()
}
reset=()=>{
     document.getElementById('formBasicNomi').value=''
     document.getElementById('formBasicSanasi').value=''
     document.getElementById('formBasicRasmi').value=''
     document.getElementById('formBasicMatni').value=''
}
DeleteYangilikTable = (id) => {
    var tadbirtable = this.state.tadbirlar
    tadbirtable.splice(id, 1)
    this.setState({
        tadbirlar: tadbirtable
    })
}
handleImage=event=>{
this.setState({
  selectedFile:event.target.files
})
console.log(event.target.files[0].name)
}
    render() {
      const columns = [
        {
          name: "nomi",
          label: "Nomi",
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: "sana",
          label: "Sana",
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'rasm',
          label: "Rasm",
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: "matn",
          label: "Matn",
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: "O'zgartirish",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: () => {
              return (
                <a href="#1"><Button className={styles.inputFormBtn1}>
                  O'zgartirish
                </Button></a>
              );
            }
          }
          
        },
      ];
      const options = {
        filterType: 'checkbox',
        responsive: 'scroll',
        onRowClick: (rowData, rowState) => {   
         this.setState({
           tadbir1:{
             nomi:rowData[0],
             sana:rowData[1],
             rasm:rowData[2],
             matn:rowData[3],
           },
           edit:rowState.rowIndex

         }) 
        },
      };
        return (
            <div>
                <Container fluid>               
                  <Row>
                    <Col lg={12}>
                      <h1>Tadbirlar</h1>
                    </Col>
                    <Col lg={12}>
                  <div className={styles.formAdmin} style={{width:'100%',position:'sticky',top:'400px'}} id="1">
                          <h4>Tadbir kiritish</h4>
                              <Form id="formAdmint">
                                  <Form.Group controlId="formBasicNomi">
                                    <Form.Control type="text" placeholder="Tadbir sarlavhasi" defaultValue={this.state.tadbir1.nomi}/>
                                  </Form.Group>
                                  <Form.Group controlId="formBasicSanasi">
                                    <Form.Control type="text" placeholder="Sanasi" defaultValue={this.state.tadbir1.sana}/>
                                  </Form.Group>
                                  <Form.Group controlId="formBasicRasmi">
                                    <Form.Control type="file" placeholder="Rasm kiriting" defaultValue={this.state.tadbir1.rasm} onChange={(e)=>this.handleImage(e)}/>
                                  </Form.Group>
                                  <Form.Group controlId="formBasicMatni">
                                    <Form.Control type="text" placeholder="Matnini kiriting" defaultValue={this.state.tadbir1.matn}/>
                                  </Form.Group>
                                  <a href="#2"><Button variant="primary" className={styles.inputFormBtn} onClick={this.SaveTadbirTable}>
                                  O'zgarishlarni saqlash
                                  </Button></a>
                                  <Button variant="primary" className={styles.inputFormBtn1} onClick={this.reset}>
                                                  Bekor qilish
                                  </Button>   
                              </Form>
                    </div>
                  </Col>
                  <Col lg={12}>
                      <MUIDataTable
                        id="2"
                        title={"Tadbirlar ro'yxati"}
                        data={this.state.tadbirlar}
                        columns={columns}
                        options={options}
                       />
                  </Col>
                  </Row>      
                </Container>
            </div>
        )
    }
}
