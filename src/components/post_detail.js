/**
 * Created by aliyy on 2017/1/16.
 */
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { fetchPost, clearDetail, deletePost } from '../actions/index'
import { bindActionCreators} from 'redux'
import { Link } from 'react-router'

class PostDetail extends Component{
  componentWillMount(){
    // 调用action creator的方法是*****this.props.*****
    this.props.fetchPost(this.props.params.id)
  }
  componentWillUnmount(){
    this.props.clearDetail()
  }
  static contextTypes = {
    router: PropTypes.object
  }
  deletePost(){
    this.props.deletePost(this.props.params.id)
      .then(()=>{
      this.context.router.push("/")
    })
  }
  render(){
    if (!this.props.post) {
      return <div>loading...</div>
    }
    return (
      <div>
        <h3>Title：{this.props.post.title}</h3>
        <h5>Categories：{this.props.post.categories}</h5>
        <p>{this.props.post.content}</p>
        <div>
          <Link className="btn btn-success" to="/">back</Link>
          <button className="ml20 btn btn-default" to="/" onClick={this.deletePost.bind(this)}>delete</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) { //！！！这里要传入state！！！
  return {
    post: state.posts.detail // ！！！这里要注意调用的数据！！！state.posts的posts是root reducer产生的，detail是处理action.type的reducer产生的
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchPost, clearDetail, deletePost}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)