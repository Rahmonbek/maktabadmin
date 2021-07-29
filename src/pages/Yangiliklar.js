import React, { Component } from 'react'
import { createNew, deleteNew, getNews } from '../host/Config'
import { Table, Input, Modal, Button, Space,  } from 'antd';
import Highlighter from 'react-highlight-words';
import {Form} from 'react-bootstrap'
import { SearchOutlined } from '@ant-design/icons';
import { id } from '../host/Host';
export default class Yangiliklar extends Component {
  state={
      news:[],
      searchText: '',
      searchedColumn: '',
      text:'',
      show:false,
      showMatn:false,
      image:''
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
       
    })
    document.getElementById('formBasicimage').value=""
    document.getElementById('formBasictext').value=""
    document.getElementById('formBasictitle').value=""
}
customRequest = (e) => {
  let image = e.target.files[0];
  this.setState({
    image:image
  })
};
createNew=()=>{

let formData = new FormData();
formData.append("image", this.state.image ?? "");
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

console.log(formData.get('school'),formData.get('image'), formData.get('title'),formData.get('text'),)



createNew(formData).then(res=>{
  console.log(res)
  this.getNews()
}).catch(err=>{
  console.log(err)
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
                    return(<img src={image} style={{width:'100%'}}/>)
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
                dataIndex: 'id',
                key: 'id',
                render:(key)=>{
                    return( <Button type="primary" onClick={()=>{this.deleteNew(key)}}>O'zgartirish</Button>
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
    <Form.Label>Yanigilik sarlavhasi</Form.Label><br/>
    <Form.Control  name="title" required type="text" placeholder="Yangilik sarlavhasi" />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Yanigilik rasmi</Form.Label><br/>
    <Form.Control      accept=".jpg, .jpeg, .png"
                      onChange={this.customRequest} name="image" required type="file"/>
    </Form.Group>
    
    <Form.Group controlId="formBasictext" className="mb-3" style={{width:"100%"}}>
    <Form.Label>Yanigilik matni</Form.Label>
    <br/><Form.Control
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
