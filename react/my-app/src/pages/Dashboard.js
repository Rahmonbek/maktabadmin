import React, { Component } from 'react'
import styles from '../css/Dashboard.module.css'
import {Container,Row,Col} from 'react-bootstrap'
import {Bar,Doughnut} from 'react-chartjs-2';
export default class Dashboard extends Component {

  state={ data:{ 
          labels: ['2011', '2012', '2014',
           '2016', '2018','2020','2021'],
          datasets: [
          {
            label: "O'quvchilar yil hisobida",
            backgroundColor: '#64B5F6',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [1380, 1559, 2180, 1081, 1056,827,1300]
            }
         ]
        },
        data1 : {
            labels: ['Matematika', 'Rus tili', 'Adabiyot',
                     'Ingliz tili', 'Fizika'],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: [
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                  '#00A6B4',
                  '#6800B4'
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
                ],
                data: [13, 5, 7, 16, 9]
              }
            ]
          },
          data3 : {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
              {
                label: '# 2 baholilar',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: '# 3 va 4 baholilar',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: 'rgb(54, 162, 235)',
              },
              {
                label: '# 5 baholilar',
                data: [3, 10, 13, 15, 22, 30],
                backgroundColor: 'rgb(75, 192, 192)',
              },
            ],
          }
  }
    render() {
        const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
        return (
            <div>
              <Container fluid>
                  <Row>
                      <h1 style={{fontSize:'30px',fontFamily:'"Lobster",cursive'}}>Dashboard</h1>
                      <Col lg={4}>
                      <div className={styles.numbercardcontent1}>
                <h1 className={styles.numbercardnumber}>12897</h1>
                <div className={styles.numbercarddollars}>2011-yildan</div>
                <div className={styles.numbercarddivider}></div>
                <div className={styles.numbercardprogresswrapper}>
                    <div className={styles.tagline ,styles.numbercardcurrency}>Umumiy o'quvchilar soni</div>
                    <div className={styles.numbercardprogress}>100%</div>
                </div>
            </div>
                      </Col>
                      <Col lg={4}>
                      <div className={styles.numbercardcontent1} style={{backgroundColor: '#7fcec5',
backgroundImage: 'linear-gradient(315deg, #7fcec5 0%, #14557b 74%)'
}}>
                <h1 className={styles.numbercardnumber}>1205</h1>
                <div className={styles.numbercarddollars}>2021-yil</div>
                <div className={styles.numbercarddivider}></div>
                <div className={styles.numbercardprogresswrapper}>
                    <div className={styles.tagline ,styles.numbercardcurrency}>Bir akademik yil uchun</div>
                    <div className={styles.numbercardprogress}>9.4%</div>
                </div>
            </div>
                      </Col>
                      <Col lg={4}>
                      <div className={styles.numbercardcontent1} style={{backgroundColor: '#182b3a',
backgroundImage: 'linear-gradient(315deg, #182b3a 0%, #20a4f3 74%)'
}}>
                <h1 className={styles.numbercardnumber}>8056</h1>
                <div className={styles.numbercarddollars}>2011-yildan</div>
                <div className={styles.numbercarddivider}></div>
                <div className={styles.numbercardprogresswrapper}>
                    <div className={styles.tagline ,styles.numbercardcurrency}>Iqtidorli o'quvchilar</div>
                    <div className={styles.numbercardprogress}>62.4%</div>
                </div>
            </div>
                      </Col>
                      <Col lg={8} style={{marginTop:'30px'}}>
                          <h1 style={{fontSize:'30px',fontFamily:'"Lobster",cursive'}}>Umumiy o'quvchilar yil hisobida</h1>
                          <Bar
                            data={this.state.data}
                            options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                      </Col>
                      <Col lg={4} style={{marginTop:'30px'}}>
                          <h1 style={{fontSize:'30px',fontFamily:'"Lobster",cursive'}}>O'qituvchilar</h1>
                          <Doughnut
                            data={this.state.data1}
                            options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                      </Col>
                      <Col lg={8} style={{marginTop:'30px'}}>
                      <h1 style={{fontSize:'30px',fontFamily:'"Lobster",cursive'}}>O'quvchilar salohiyati</h1>
                      <Bar data={this.state.data3} options={this.options} />
                      </Col>
                  </Row>
              </Container>
            </div>
        )
    }
}
