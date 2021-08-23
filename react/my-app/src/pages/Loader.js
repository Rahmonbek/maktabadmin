import React, { Component } from 'react'
import style from '../css/Loader.module.css'
export default class Loader extends Component {
  render() {
    return (
      <div style={{backgroundColor:'white',width:'80vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <div class={style.boxcon}>
    <div class={style.box1}>
    </div>
      <h1 style={{color:'black'}}>Kuting..</h1>
    <div class={style.box2}>
    </div>
    </div>
      </div>
    )
  }
}
