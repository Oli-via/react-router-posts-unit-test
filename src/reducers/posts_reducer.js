/**
 * Created by aliyy on 2017/1/15.
 */
import React from 'react'
import { FETCH_POSTS_INDEX, FETCH_POST, CLEAR_DETAIL } from '../actions/index'

// 要在这里定义state的时候就想好state的结构，一个应用只有一个总的state，需要考虑清楚总state里的元素和数据结构。
// 这里postsIndex是首页的posts列表，postDetail是单个post页面的信息。
const INITIAL_STATE = {all: [], detail: null}

export default (state = INITIAL_STATE, action)=>{  //记得初始化state
  switch (action.type) {
    case FETCH_POSTS_INDEX :
      return {...state, all: action.payload.data} //记得写key，all：。。。
    case FETCH_POST:
      return {...state, detail: action.payload.data}
    case CLEAR_DETAIL:
      return {...state, detail: null}
    default:
      return state
  }
}