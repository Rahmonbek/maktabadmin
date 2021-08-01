import React, { Component } from 'react';
import styles from '../css/Top.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {Container,Row,Col} from 'react-bootstrap'
import {FiSearch,FiChevronDown, FiPauseCircle} from "react-icons/fi";
import school1 from '../img/user.png'
class Top extends Component {
    state={
        isOpen:false
    }
    openDiv=()=>{
       if(!this.state.isOpen){
           this.setState({
               isOpen:true
           })
           console.log(this.state.isOpen)
       }else{
           this.setState({
               isOpen:false
           })
           console.log(this.state.isOpen)

       }
    }
    render() {
        return (
            <div>
                <Container fluid className={styles.top}>
                    <Row>
                        <Col sm={6} xs={6} className={styles.heading}>
                            <h1>Star admin</h1>
                        </Col>
                        <Col lg={8} md={8} sm={3} xs={3} className={styles.search}>
                            <input type="text" placeholder="Qidirish..."/>
                            <button type="submit"><FiSearch/></button>
                        </Col>
                        <Col lg={4} md={4} sm={3} xs={3} className={styles.language}>
                            <span>Uzb</span>
                            <span style={{color:'#1A86D0'}}>|</span> 
                            <span>Рус</span>
                            <img src={school1} />
                            <FiChevronDown  style={{marginRight:'-100px',fontSize:'20px',color:'#1A86D0',cursor:'pointer'}}/>
                            {/* <div className={styles.divOpen} style={{display: this.state.isOpen ? 'block' : 'none'}}>
                           <h1>Chiqib ketish</h1>
                        </div> */}
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Top;