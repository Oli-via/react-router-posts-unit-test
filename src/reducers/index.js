import { combineReducers } from 'redux';
import PostsIndexReducer from './posts_index'
import {reducer as formReducer} from 'redux-form'
import PostDetailReducer from './post_detail'

const rootReducer = combineReducers({
  // state: (state = {}) => state   //初始化写法
  postsIndex: PostsIndexReducer,
  form: formReducer,
  postDetail: PostDetailReducer
});

export default rootReducer;