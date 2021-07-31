import React, { Component } from 'react'
import { createNew, deleteNew, editNew, getNews } from '../host/Config'
import { Table, Input, Modal, Button, Space,  } from 'antd';
import Highlighter from 'react-highlight-words';
import {Form} from 'react-bootstrap'
import { SearchOutlined } from '@ant-design/icons';
import { id, url } from '../host/Host';
import axios from 'axios';
import ImageDemo from './ImageDemo';
export default class Yangiliklar extends Component {
  constructor(){
    super();
    this.state={
        news:[],
        searchText: '',
        searchedColumn: '',
        textF:'',
        show:false,
        showMatn:false,
        image: null,
        imageUrl: '',
        edit: null,
        previewImage: true
    }
  }

  matnKorish=(text)=>{
      this.setState({
showMatn:true,
text:text
      })
  }
  openModal=()=>{
    this.setState({
        show:true,
       })  
       console.log(this.state.edit);
  }

  closeMatn=()=>{
      this.setState({
          showMatn:false,
          text:''
      })
  }
  
  closeModal=()=>{
    this.setState({
        show:false,
        image:null,
        imageUrl: null,
        edit:null,
        previewImage: true,   
    })
    document.getElementById('formBasicimage').value=""
    document.getElementById('formBasictext').value=""
    document.getElementById('formBasictitle').value=""
}
editNew=(key)=>{
  console.log(key);
  axios.get(`${url}/new/${id}`).then((res)=>{ 
    document.getElementById('formBasictext').value = res.data[key].text; 
    document.getElementById('formBasictitle').value = res.data[key].title;
    console.log(res.data[key].image)
    this.setState({
      edit: res.data[key].id,
      imageUrl: res.data[key].image
    }) 
  }).catch(err=>console.log(err))
  this.openModal()
}
customRequest = (e) => {
  let image = e.target.files[0];
  this.setState({
    image:image,
    imageUrl: image,
    previewImage: false,
  })
};
createNew=()=>{
let formData = new FormData();

formData.append(
  "title",
  document.getElementById("formBasictitle").value ?? ""
);
formData.append(
  "text",
  document.getElementById("formBasictext").value ?? ""
);
formData.append(
  "school",
  Number(id)
);

if(this.state.edit!==null) {
if(this.state.image!==null){
  formData.append("image", this.state.image ?? "");
}
  
  editNew(formData, this.state.edit).then(res=>{console.log(res); this.getNews()}).catch(err=>{console.log(err);})
} else {
  formData.append("image", this.state.image ?? "");

  createNew(formData).then(res=>{
  console.log(res)
  this.getNews()
}).catch(err=>{
  console.log(err)
})
}
  this.closeModal()
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

  getNews=()=>{
      getNews().then(res=>{
var news=res.data
for(let i=0; i<news.length; i++){
    news[i].key=i+1
}
        this.setState({ 
    news:res.data
})

      }).catch(err=>{
          console.log(err)
      })
  }
deleteNew=(id)=>{
    deleteNew(id).then(res=>{console.log('Ochdi'); this.getNews()}).catch(err=>{console.log('Ochmadi')})
}
  componentDidMount(){
      this.getNews()
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
                    return(<img src={image} style={{width:'100%'}} alt='img'/>)
                }
              },
              {
                title: 'Yangilik nomi',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),
              },
              {
                title: 'Yangilik matni',
                dataIndex: 'text',
                key: 'text',
                render:(text)=>{
                    return( <Button type="primary" onClick={()=>{this.matnKorish(text)}}>Matnni ko'ring</Button>
                    )
                }

              },
              {
                title: 'O\'zgartirish',
                dataIndex: 'key',
                key: 'key',
                render:(key)=>{
                    return( <Button type="primary" onClick={()=>{this.editNew(Number(key)-1)}}>O'zgartirish</Button>
                    )
                }

              },
              {
                title: 'O\'chirish',
                dataIndex: 'id',
                key: 'keyId',
                render:(key)=>{
                    return( <Button type="danger" onClick={()=>{this.deleteNew(key)}}>O'chirish</Button>
                    )
                }

              },
             
          ];
        return (
          <div>
    <br/>

            <Button type="primary" onClick={this.openModal}>Yangilik yaratish</Button><br/><br/>
 <Table columns={columns} dataSource={this.state.news} />              
 <Modal
        title="Yangilik matni"
        visible={this.state.showMatn}
        onCancel={this.closeMatn}
     footer={false}
      >
        <p>{this.state.text}</p>
      </Modal>
      <Modal
        title="Yangilik"
        visible={this.state.show}
        onCancel={this.closeModal}
     footer={false}
      >
        <Form>
        <Form.Group className="mb-3" controlId="formBasictitle"> 
    <Form.Label>Yangilik sarlavhasi</Form.Label><br/>
    <Form.Control defaultValue={this.state.title} name="title" required type="text" placeholder="Yangilik sarlavhasi"/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Yangilik rasmi</Form.Label><br/>
    <Form.Control      accept=".jpg, .jpeg, .png"
                      onChange={this.customRequest} name="image" required type="file"/>
    <br/><br/>
    {(this.state.previewImage) ? ImageDemo(this.state.imageUrl) : ''}
    </Form.Group>
    
    <Form.Group controlId="formBasictext" className="mb-3" style={{width:"100%"}}>
    <Form.Label>Yangilik matni</Form.Label>
    <br/><Form.Control
    defaultValue={this.state.textF}
      as="textarea"
      name="text"
      placeholder="Yangilik matnini yozing"
      style={{ height: '200px'}}
    />
  </Form.Group>
  <br/><br/>
    <Button type="danger" htmlType="button" onClick={this.closeModal}>
        
    Bekor qilish
  </Button>
  <Button type="primary" htmlType="button"
   onClick={this.createNew}
   >
    Yaratish
  </Button>
</Form>
      </Modal>

                 </div>
                 
        )
    }
}
