import React,{useState,useEffect} from 'react'
import styles from '../css/sport.module.css'
import { Container,Row,Col,Button } from 'react-bootstrap'

export default function Alochilar() {
    const [sinflar,setSinflar]=useState(
        [
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
                sinflar1:[
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
                sinflar1:[
                    {
                        ichkisinf:"7-A",
                        oquvchilar:['abdullayev b','muhitdibov b','shokarimov s']
                    },
                    {
                        ichkisinf:"7-b",
                        oquvchilar:['abdullabgryev b','muhitdibov b','shokarimov s']
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
                sinflar1:[
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
                sinflar1:[
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
                sinflar1:[
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
                sinflar1:[
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
                sinflar1:[
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
                sinflar1:[
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
    )
    const [set,setState]=useState('0')
    const [data,setData]=useState([])
    const [ichkisinf,setichkisinf]=useState('0')
    const [data1,setdata1]=useState([])
    const saveDatat2=()=>{
        setdata1([])
        setdata1(sinflar[set].sinflar1[ichkisinf].oquvchilar)
    }
    const saveSet=()=>{
     console.log(set)
     setData([])
     setData(sinflar[set].sinflar1)
     console.log(data)
    }

    useEffect(()=>{
    saveSet()
    saveDatat2()
    },[set,data,data1,ichkisinf])
    
    return (
        <div>
             <Container fluid>
                    <Row>
                        <h1 style={{fontSize:'30px',fontFamily:'"Lobster",cursive'}}>A'lochi o'quvchilar</h1>
                        <Col lg={12} style={{marginTop:'0px'}}>
                            {
                                sinflar.map((item,key)=>{
                                    return(                             
                                     
                                         <Button style={{marginRight:'30px'}} onClick={()=> {setState(`${key}`)}}>{item.sinf}</Button>
                                      
                                                                             
                                    )
                                })
                            }
                        </Col>
                        <Col>
                        {
                              data.map((item,key)=>{
                                return(
                                    <Button onClick={()=>{setichkisinf(`${key}`)}}>{item.ichkisinf}</Button>
                                )
                            })
                        }
                        </Col>
                        <Col lg={12}>
                            {
                                data1.map((item,key)=>{
                                    return(
                                        <p>{item}</p>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Container>
        </div>
    )
}
