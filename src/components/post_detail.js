/**
 * Created by aliyy on 2017/1/16.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchPost, clearDetail } from '../actions/index'
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
  render(){
    if (!this.props.post) {
      return <div>loading...</div>
    }
    return (
      <div>
        <Link className="btn btn-default" to="/">back</Link>
        <h3>Title</h3>
        <div>{this.props.post.title}</div>
        <h4>Content</h4>
        <p> {this.props.post.content}</p>
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
  return bindActionCreators({fetchPost, clearDetail}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)