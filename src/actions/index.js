import axios from 'axios'

const ROOT_URL = `http://reduxblog.herokuapp.com/api`
const KEY = '?key=olivialovesya'

//常量前面不要忘记写export
export const FETCH_POSTS_INDEX = 'FETCH_POSTS_INDEX'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_POST = 'FETCH_POST'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const DELETE_POST = 'DELETE_POST'
export const CLEAR_POSTS = 'CLEAR_POSTS'


export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${KEY}`); //const request要写在函数里面
  return {
    type: FETCH_POSTS_INDEX,
    payload: request
  }
}

export function createPost(props) {
  const postRequest = axios.post(`${ROOT_URL}/posts${KEY}`, props); //直接写props就可以把form表单中的内容提交
  return {
    type: CREATE_POST,
    payload: postRequest
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${KEY}`); //const request要写在函数里面
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL
  }
}

export function clearPosts() {
  return {
    type: CLEAR_POSTS
  }
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${KEY}`)
  return {
    type: DELETE_POST,
    payload: request
  }
}