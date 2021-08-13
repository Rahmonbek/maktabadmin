import { Radio } from 'antd'
import React, { Component } from 'react'
import { getClass, getSubject, getXodim } from '../host/Config'

export default class DarsJadvali extends Component {
  state={
    teachers:[],
    subjects:[],
    class:[],
    jadval:[],
    value:"0"

  }

getInfor=()=>{
  getXodim().then(res=>{this.setState({
    teachers:res.data
  })})
  
  getSubject().then(res=>{this.setState({
    subjects:res.data
  })})
  
  getClass().then(res=>{this.setState({
    class:res.data
  })})
  
}


componentDidMount(){
  this.getInfor()
console.log(this.state.teachers, this.state.class, this.state.subjects)
}
  render() {
    return (
      <div>
      <Radio.Group value={this.state.value} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>    
      </div>
    )
  }
}
