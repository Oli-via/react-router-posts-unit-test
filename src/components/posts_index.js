/**
 * Created by aliyy on 2017/1/15.
 */
import React, {Component} from 'react'
import { connect} from 'react-redux'
// import { bindActionCreators} from 'redux'
import { fetchPosts } from '../actions/index'
import { Link } from 'react-router'

class PostsIndex extends Component{
  componentWillMount(){
    this.props.fetchPosts();  // 触发了一个action
  }
  renderPosts(){
    if (!this.props.posts){
      return 'loading...'
    }
    else {
      // 这里要写return！！！不写的话只执行 不会渲染！！！
      return this.props.posts.map((post) => {
        // 这里也要写return！！！
        return (
          <Link className='list-group-item' key={post.id} to={`/post/${post.id}`}>
            <span className="pull-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        )

      })
    }
  }
  render(){
    return (
      <div>
        <div className="text-right">
           <Link to="/post/new" className="btn btn-primary">{/*className是加在Link上的 不是加在button按钮上*/}
             add a post
           </Link>
        </div>
        <h3>Posts</h3>
        <div className="list-group">
          {this.renderPosts()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) { // 这里的state是全局的state，是reducer产生的。
  return {posts: state.postsIndex.all} // 这里的state.posts是root reducer里产生的。
                                            // 这里的.all是reducers/posts_index.js 里产生的，在return的新的state里定义的
//  ComponentWillMount触发了fetchPosts这个action creator，发送了一个ajax请求，返回的数据在reducer-posts_index.js里，放在了state的all属性里。
}

/*function mapDispatchToProps(dispatch) {
  //bindActionCreators is to give access to this.pops.fetchPosts.
  return bindActionCreators({fetchPosts}, dispatch)
}*/
// 以上方法可以简写为以下的形式，就不需要引入bindActionCreators，仍然可以give access to this.pops.fetchPosts
export default connect(mapStateToProps, {fetchPosts})(PostsIndex)
// export default connect(null, mapDispatchToProps)(PostsIndex)