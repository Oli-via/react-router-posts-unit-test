/**
 * Created by aliyy on 2017/1/16.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions/index'
import { bindActionCreators} from 'redux'
import { Link } from 'react-router'

class PostDetail extends Component{
  componentWillMount(){
    // 调用action creator的方法是*****this.props.*****
    this.props.fetchPost({id: this.props.params.id})
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
    post: state.postDetail.detail // ！！！这里要注意调用的数据！！！
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchPost}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)