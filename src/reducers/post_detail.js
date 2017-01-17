/**
 * Created by aliyy on 2017/1/15.
 */
import React from 'react'
import { FETCH_POST  } from '../actions/index'

export default (state = {}, action)=>{  //记得初始化state
  switch (action.type) {
    case FETCH_POST:
      return {...state, detail: action.payload.data}
    default:
      return state
  }
}