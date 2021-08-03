import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Space, Table} from 'antd'
import { getXodim } from '../host/Config'
import Highlighter from 'react-highlight-words';
import ImageDemo from './ImageDemo';
import Form from 'antd/lib/form/Form';

export default class DarsJadvali extends Component {
    state = {
        mutaxassislik:[],
        visible: false,
        selectedFile:null,
        teacher: {},
        edit: null,
        teacher1:{
          name:'',
          tugilgansana:'',
          rasm:'',
          malumot:'',
          mutaxassislik:'',
          qabulsoati:'',
          email:'',
          telefon:''
        },
        teachers: []
    }
      showModal = () => {
        this.setState({
          visible: true,
        })
      }
    
      hideModal = () => {
        this.setState({
          visible: false,
        })
      }
      getXodim=()=>{
        getXodim().then(res=>{this.setState({teachers: res.data});
         }).catch(err=>console.log(err))
      }
      saveTeacher = () => {
        var name = document.getElementById('name').value
        var tugilgansana = document.getElementById('tugilgansana').value
        var rasm = document.getElementById('rasm').value
        var malumot = document.getElementById('malumot').value
        var mutaxassislik = this.state.mutaxassislik
        var qabulsoati= document.getElementById('qabulsoati').value
        var email = document.getElementById('email').value
        var telefon = document.getElementById('telefon').value
        var login = document.getElementById('login').value
        var parol = document.getElementById('parol').value
        var teacher = {
          name,
          tugilgansana,
          rasm,
          malumot,
          mutaxassislik,
          qabulsoati,
          email,
          telefon,
          login,
          parol    
        }
    
        var teachertable = this.state.teachers
    
        if(this.state.edit==null){
            teachertable.push(teacher)
            this.setState({
                teachers:teachertable
            })
            console.log(teachertable)
        }
        else{
            teachertable[this.state.edit] = teacher
            this.setState({
                teacher: {},
                edit: null
            })
        }
        this.setState({
            teachers: teachertable
        })
        this.reset()
        this.hideModal()
    }
    deleteTeacher = (value) => {
      var newteacher=this.state.teachers
      newteacher.splice(value,1)
      this.setState({
        teachers:newteacher
      })
    }
    editTeacher=(id)=>{
     var newteacher=this.state.teachers[id]
     console.log(newteacher)
     this.setState({
       teacher1:newteacher,
       edit:id
     })
     this.showModal()
    }
    reset=()=>{
      document.getElementById('name').value=''
      document.getElementById('tugilgansana').value=''
      document.getElementById('rasm').value=''
      document.getElementById('malumot').value=''
      document.getElementById('mutaxassislik').value=''
      document.getElementById('qabulsoati').value=''
      document.getElementById('email').value=''
      document.getElementById('telefon').value=''
      document.getElementById('login').value=''
      document.getElementById('parol').value=''
      this.setState({
        edit:null
      })
    }
    saveMutaxassislik=(e)=>{
      var newmutax=e;
      this.setState({
        mutaxassislik:newmutax
      })
    }
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    componentDidMount(){
      this.getXodim()
    }
    render() {
      const columns = [
        {
            title: 'Id',
            dataIndex: 'key',
            key: 'key',
            ...this.getColumnSearchProps('key'),
          },
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'image',
            width: '20%',
            render:(image)=>{
                return(<img src={image} style={{width:'100%'}} alt='rasm'/>)
            }
          },
          {
            title: 'Familya',
            dataIndex: 'user',
            key: 'user',
            ...this.getColumnSearchProps('user.last_name'),
            render:(user)=>{return(user.last_name)}
          },
          {
            title: 'Ism',
            dataIndex: 'user',
            key: 'user',
            ...this.getColumnSearchProps('user.first_name'),
            render:(user)=>{return(user.first_name)}
          },
          {
            title: 'Mutaxassislik',
            dataIndex: 'speciality',
            key: 'speciality',
          },
          {
            title: 'Mutaxassislik2',
            dataIndex: 'position',
            key: 'position',
          },
          {
            title: 'Telefon raqam',
            dataIndex: 'phone',
            key: 'phone',
            ...this.getColumnSearchProps('phone'),
          },
          {
            title: 'Ma\'lumot',
            dataIndex: 'description',
            key: 'description',
            ...this.getColumnSearchProps('description'),
          },
          {
            title: 'Login',
            dataIndex: 'user',
            key: 'user',
            ...this.getColumnSearchProps('user.username'),
            render:(user)=>{return(user.username)}
          },
          {
            title: 'Password',
            dataIndex: 'user',
            key: 'user',
            render:(user)=>{return(user.password)}
          },
          {
            title: 'Email',
            dataIndex: 'user',
            key: 'user',
            ...this.getColumnSearchProps('user.email'),
            render:(user)=>{return(user.email)}
          },
          {
            title: 'O\'zgartirish',
            dataIndex: 'key',
            key: 'key',
            render:(key)=>{
                return( <Button type="primary">O'zgartirish</Button>
                )
            }

          },
          {
            title: 'O\'chirish',
            dataIndex: 'id',
            key: 'keyId',
            render:(key)=>{
                return( <Button type="danger">O'chirish</Button>
                )
            }

          },
         
      ];
          return (
            <div>
                <Button type="primary" onClick={this.openModal}>Xodim qo'shish</Button><br/><br/>
              <Table columns={columns} dataSource={this.state.teachers} style={{marginRight: '20px'}} />              
              <Modal
                      title="Tadbir matni"
                      visible={this.state.showMatn}
                      onCancel={this.closeMatn}
                  footer={false}
                    >
                      <p>{this.state.text}</p>
                    </Modal>
                    <Modal
                      title="Tadbir"
                      visible={this.state.show}
                      onCancel={this.closeModal}
                    footer={false}
                    >
          <Form>
          <Form.Group className="mb-3" controlId="formBasictitle"> 
            <Form.Label>Tadbir sarlavhasi</Form.Label><br/>
            <Form.Control defaultValue={this.state.title} name="title" required type="text" placeholder="Tadbir sarlavhasi"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicaddress"> 
                <Form.Label>Tadbir manzili</Form.Label><br/>
                <Form.Control defaultValue={this.state.address} name="address" required type="text" placeholder="Tadbir manzili"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicdate"> 
                <Form.Label>Tadbir sanasi</Form.Label><br/>
                <Form.Control defaultValue={this.state.date} name="date" required type="date" placeholder="mm/dd/yy"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasictime"> 
                <Form.Label>Tadbir vaqti</Form.Label><br/>
                <Form.Control defaultValue={this.state.time} name="time" required type="time"/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicimage">
            <Form.Label>Tadbir rasmi</Form.Label><br/>
            <Form.Control      accept=".jpg, .jpeg, .png"
                              onChange={this.customRequest} name="image" required type="file"/>
            <br/><br/>
            {(this.state.previewImage) ? ImageDemo(this.state.imageUrl) : ''}
            </Form.Group>
            <Form.Group controlId="formBasictext" className="mb-3" style={{width:"100%"}}>
            <Form.Label>Tadbir matni</Form.Label>
            <br/><Form.Control
            defaultValue={this.state.textF}
              as="textarea"
              name="text"
              placeholder="Tadbir matnini yozing"
              style={{ height: '200px'}}
            />
          </Form.Group>
          <br/><br/>
            <Button type="danger" htmlType="button" onClick={this.closeModal}>
                
            Bekor qilish
          </Button>
          <Button type="primary" htmlType="button"
          onClick={this.createEvent}
          >
            Yaratish
          </Button>
          </Form>
        </Modal>
       </div>
        )
    }
}
