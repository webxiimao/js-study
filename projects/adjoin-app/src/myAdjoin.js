import React, { useState, useMemo } from 'react';
import "./adjoin.css"


class Adjoin {
  constructor(vertex){
    //获取的集合
    this.vertex = vertex
    //五向图数据列表
    this.adjoinArray = []
    this.quantity = 0
    this.init()
  }

  init(){
    this.quantity = this.vertex.length
    this.adjoinArray = Array.from({length: Math.pow(this.quantity, 2)})
  }

  /**
   * 设置节点
   * @param {*} id 左侧节点名
   * @param {*} params 需要设置的集合
   */
  setVertexOptions(id, params){
    const leftIndex = this.vertex.indexOf(id)
    //对每个spec的节点 在无向图中选中
    params.forEach(item => {
      const rightIndex = this.vertex.indexOf(item)
      this.adjoinArray[this._getAdjoinArrayIndex(leftIndex, rightIndex)] = 1
    })
  }
  /**
   * 根据图形描述的index 获取在adjoinArray的index
   * @param {*} leftIndex 左边y轴及竖直的index
   * @param {*} rightIndex 右边x轴及水平的index
   */
  _getAdjoinArrayIndex(leftIndex, rightIndex){
    return this.quantity * leftIndex + rightIndex
  }
}


class ShopAdjoin extends Adjoin {
  constructor(data, commoditySpecs){
    super(commoditySpecs.reduce((total, current) => {
      return [
        ...total,
        ...current.list
      ]
    },[]))
    this.specs = data.map(d => d.specs)
    this.commoditySpecs = commoditySpecs
    //规格创建
    this.initCommodity()
    this.initSimilar()
  }

  initCommodity(){
    //[ '紫色', '套餐一', '64G' ]
    this.specs.forEach(spec => {
      this.applyCommodity(spec)
    })
    
  }

  applyCommodity(params){
    params.forEach(item => {
      this.setVertexOptions(item, params)
    })
  }

  //设置相邻的节点
  initSimilar(){
    
  }
}

export default function MyAdjoin({ data, commoditySpecs }){
  const shopAdjoin = new ShopAdjoin(data, commoditySpecs)
  return (
    <React.Fragment>
      myadjoin
    </React.Fragment>
  )
}