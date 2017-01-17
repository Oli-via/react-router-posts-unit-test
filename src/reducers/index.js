import { combineReducers } from 'redux';
import PostsIndexReducer from './posts_reducer'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  // state: (state = {}) => state   //初始化写法
  posts: PostsIndexReducer,
  form: formReducer,
});

export default rootReducer;