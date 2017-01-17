import React, {Component, PropTypes} from 'react'
import { reduxForm} from 'redux-form'
import { createPost } from '../actions/index'
import {Link} from 'react-router'
import _ from 'lodash'

// const FIELDS = ["title", 'categories', 'content']
// 下面是表单的字段配置
const FIELDS = {
  title : {
    type: 'input',
    label: 'Title for Post',
    // 也可以增加validate方法，在function validate(values)中使用
    validate: () => {}
  },
  categories : {
    type: 'input',
    label: 'Enter some categories for this post'
  },
  content : {
    type: 'textarea',
    label: 'Post Contents'
  }
}

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

  renderField(fieldConfig, field) {
    // the fieldHelper is the object provided by reduxForm
    // i get one field helper for each field that i declare, down in the redux form configuration helper
    const fieldHelper = this.props.fields[field]
    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-error' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
        <div className="text-help control-label">
          { fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    )
  }


  render(){
    // const {fields: {title, categories, content}, handleSubmit} = this.props
    const { handleSubmit } = this.props

    return(
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        {/*<div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
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
        </div>*/}
        <button type="submit" className="btn btn-success">Save</button>
        <Link to="/" className="btn btn-default">Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {}
  // if (!values.title){
  //   errors.title = "Please enter a title"
  // }
  // if (!values.categories){
  //   errors.categories = "Please enter category"
  // }
  // if (!values.content){
  //   errors.content = "Please enter content"
  // }

  // type is the configuration object
  // field is going to be the actual field name itself, like the title, categories and content
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `enter a ${field}`
    }
  })
  return errors
}

export default reduxForm({
  form: 'PostNew',
  fields: _.keys(FIELDS),
  // lodash will help to return an array of all the different keys on the fields configuration object
  // which will end up being title categories and content, an array of strings.
  validate,
}, null, { createPost })(PostNew)