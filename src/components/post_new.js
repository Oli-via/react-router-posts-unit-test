import React, {Component, PropTypes} from 'react'
import { reduxForm} from 'redux-form'
import { createPost } from '../actions/index'
import {Link} from 'react-router'

const FIELDS = ["title", 'categories', 'content']

class PostNew extends Component{
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props){
    this.props.createPost(props)
      .then(()=>{
        this.context.router.push("/")
      })
  }

  render(){
    const {fields: {title, categories, content}, handleSubmit} = this.props

    return(
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help control-label">
            { title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help control-label">
            { categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-error' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
          <div className="text-help control-label">
            { content.touched ? content.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <Link to="/" className="btn btn-default">Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {}
  if (!values.title){
    errors.title = "Please enter a title"
  }
  if (!values.categories){
    errors.categories = "Please enter category"
  }
  if (!values.content){
    errors.content = "Please enter content"
  }
  return errors
}

export default reduxForm({
  form: 'PostNew',
  fields: FIELDS,
  validate,
}, null, { createPost })(PostNew)