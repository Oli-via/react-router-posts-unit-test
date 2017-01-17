/**
 * Created by aliyy on 2017/1/15.
 */
import React from 'react';
import App from './components/app';
import { Route, IndexRoute } from 'react-router'  //{ Route }花括号
import PostsIndex from './components/posts_index'
import PostNew from './components/post_new'
import PostDetail from './components/post_detail'

export default (
  //下面的component={App}, 不是等于{<App/>}错错错
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex}/>
    <Route path='post/new' component={PostNew}/>
    <Route path='post/:id' component={PostDetail} />
  </Route>
)