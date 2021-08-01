import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import React, { Component } from 'react'



export default class Sinf1 extends Component {

    state = {

        show: false,
        person: {},
        edit: null,

        schedules: [
            {
                dushanba: 'Matematika',
                seshanba: 'Fizika',
                chorshanba: 'Informatika',
                payshanba: 'Ona tili',
                juma: 'Jismoniy tarbiya',
                shanba: 'Ingliz tili',
            },
            {
                dushanba: 'Matematika',
                seshanba: 'Fizika',
                chorshanba: 'Informatika',
                payshanba: 'Ona tili',
                juma: 'Jismoniy tarbiya',
                shanba: 'Ingliz tili',
            },
            {
                dushanba: 'Matematika',
                seshanba: 'Fizika',
                chorshanba: 'Informatika',
                payshanba: 'Ona tili',
                juma: 'Jismoniy tarbiya',
                shanba: 'Ingliz tili',
            },
            {
                dushanba: 'Matematika',
                seshanba: 'Fizika',
                chorshanba: 'Informatika',
                payshanba: 'Ona tili',
                juma: 'Jismoniy tarbiya',
                shanba: 'Ingliz tili',
            },
            {
                dushanba: 'Matematika',
                seshanba: 'Fizika',
                chorshanba: 'Informatika',
                payshanba: 'Ona tili',
                juma: 'Jismoniy tarbiya',
                shanba: 'Ingliz tili',   
            }
        ]
    }


    OpenModal = () => {
        this.setState({
            show: true
        })
    }
    CloseModal = () => {
        this.setState({
            show: false,
            person: {}
        })
    }
    SaveTimetable = () => {
        var dushanba = document.getElementById('formBasicDushanba').value
        var seshanba = document.getElementById('formBasicSeshanba').value
        var chorshanba = document.getElementById('formBasicChorshanba').value
        var payshanba = document.getElementById('formBasicPayshanba').value
        var juma = document.getElementById('formBasicJuma').value
        var shanba = document.getElementById('formBasicShanba').value

        var schedule = {
            dushanba,
            seshanba,
            chorshanba,
            payshanba,
            juma,
            shanba
        }

        var timetable = this.state.schedules

        if(this.state.edit==null){
            timetable.push(schedule)
        }
        else{
            timetable[this.state.edit] = schedule
            this.setState({
                person: {},
                edit: null
            })
        }
        this.setState({
            schedules: timetable
        })
        this.CloseModal()
    }
    DeleteTimetable = (id) => {
        var timetable = this.state.schedules
        timetable.splice(id, 1)
        this.setState({
            schedules: timetable
        })
    }
    EditTimetable = (id) => {
        this.setState({
            person: this.state.schedules[id],
            edit: id
        })
        this.OpenModal()
    }


    render() {
        const { schedules, show } = this.state
        return (
            <div>

                    <Modal show={show} onHide={this.CloseModal}>
                        <Modal.Header closeButton closeLabel="">
                        <Modal.Title>Xona qo'shish</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicDushanba">
                                    <Form.Label>Dushanba</Form.Label>
                                    <Form.Control defaultValue={this.state.person.dushanba} type="text" placeholder="Fanni kiriting" />
                                </Form.Group>
                                <Form.Group controlId="formBasicSeshanba">
                                    <Form.Label>Seshanba</Form.Label>
                                    <Form.Control defaultValue={this.state.person.seshanba} type="text" placeholder="Fanni kiriting" />
                                </Form.Group>
                                <Form.Group controlId="formBasicChorshanba">
                                    <Form.Label>Chorshanba</Form.Label>
                                    <Form.Control defaultValue={this.state.person.chorshanba} type="text" placeholder="Fanni kiriting" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPayshanba">
                                    <Form.Label>Payshanba</Form.Label>
                                    <Form.Control defaultValue={this.state.person.payshanba} type="text" placeholder="Fanni kiriting" />
                                </Form.Group>
                                <Form.Group controlId="formBasicJuma">
                                    <Form.Label>Juma</Form.Label>
                                    <Form.Control defaultValue={this.state.person.juma} type="text" placeholder="Fanni kiriting" />
                                </Form.Group>
                                <Form.Group controlId="formBasicShanba">
                                    <Form.Label>Shanba</Form.Label>
                                    <Form.Control defaultValue={this.state.person.shanba} type="text" placeholder="Fanni kiriting" />
                                </Form.Group>
                                
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.CloseModal}>
                            Yopish
                        </Button>
                        <Button variant="primary" onClick={this.SaveTimetable}>
                            O'zgarishlarni saqlash
                        </Button>
                        </Modal.Footer>
                    </Modal>


                <br/>
                <Container>
                    <Button onClick={this.OpenModal} variant="warning">Qo'shish</Button>
                    <br/>
                    <br/>
                    <Table responsive striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>Vaqt</th>
                                <th>Dushanba</th>
                                <th>Seshanba</th>
                                <th>Chorshanba</th>
                                <th>Payshanba</th>
                                <th>Juma</th>
                                <th>Shanba</th>
                                <th>O'zgartirish</th>
                                <th>O'chirish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                schedules && Array.isArray(schedules)?schedules.map((item, key) => {
                                    return(
                                        <tr>
                                            <td>{key+1}</td>
                                            <td>{item.dushanba}</td>
                                            <td>{item.seshanba}</td>
                                            <td>{item.chorshanba}</td>
                                            <td>{item.payshanba}</td>
                                            <td>{item.juma}</td>
                                            <td>{item.shanba}</td>
                                            <td><Button variant="success" onClick={()=>{this.EditTimetable(key)}}>O'zgartirish</Button></td>
                                            <td><Button variant="danger" onClick={()=>{this.DeleteTimetable(key)}}>O'chirish</Button></td>
                                        </tr>
                                    )
                                }):''
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}
