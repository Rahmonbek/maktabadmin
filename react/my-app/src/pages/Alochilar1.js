import React, { Component } from 'react'
import styles from '../css/sport.module.css'
import { Container,Row,Col,Button } from 'react-bootstrap'
export default class Alochilar extends Component {
    state={
        sinflar:[
            {
                sinf:'9',
                sinflar1:[
                    {
                        ichkisinf:"9-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"9-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"9-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"9-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"9-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'8',
                sinflar:[
                    {
                        ichkisinf:"8-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"8-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"8-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"8-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"8-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'7',
                sinflar:[
                    {
                        ichkisinf:"7-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"7-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"7-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"7-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"7-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'6',
                sinflar:[
                    {
                        ichkisinf:"6-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"6-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"6-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"6-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"6-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'5',
                sinflar:[
                    {
                        ichkisinf:"5-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"5-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"5-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"5-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"5-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'4',
                sinflar:[
                    {
                        ichkisinf:"4-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"4-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"4-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"4-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"4-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'3',
                sinflar:[
                    {
                        ichkisinf:"3-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"3-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"3-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"3-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"3-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'2',
                sinflar:[
                    {
                        ichkisinf:"2-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"2-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"2-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"2-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"2-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            },
            {
                sinf:'1',
                sinflar:[
                    {
                        ichkisinf:"1-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"1-b",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"1-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"1-d",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"1-g",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    }
                ]
            }
        ],
        set:0
    }
    setSinf=(id)=>{
        console.log(id)
        this.setState({
            set:id,
        })

    }
    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <h1 style={{fontSize:'30px',fontFamily:'"Lobster",cursive'}}>A'lochi o'quvchilar</h1>
                        <Col lg={12} style={{marginTop:'0px'}}>
                            {
                                this.state.sinflar.map((item,key)=>{
                                    return(
                                        <Col lg={2}>
                                            <Button style={{marginRight:'30px'}} onClick={()=>this.setSinf(key)}>{item.sinf}</Button>
                                            {
                                                item.map((item2,key2)=>{
                                                    <p>{item2.sinflar1}</p>
                                                })
                                            }
                                        </Col>
                                       
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
