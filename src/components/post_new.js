/**
 * Created by aliyy on 2017/1/16.
 */
import React, {Component, PropTypes} from 'react'
//reduxForm object is nearly identical to the connect function from react-redux library
// we are going to use the reduxForm function to wrap our component PostNew
import { reduxForm} from 'redux-form'
import { createPost } from '../actions/index'
import {Link} from 'react-router'

class PostNew extends Component{
  // how to get access to the context's router property:
  static contextTypes = {
    router: PropTypes.object
  }
  // 以上代码在PostNew类中增加了一个属性，可以使用PostNew.contextTypes得到等号右边的对象
  // react interprets this object whenever an instance of PostNew is created
  // it's going to see that we declared some context types
  // and it's going to see that we want to specifically get access to some property on our context called router
  // react is then going to search all of this component's parents, until it finds a component that has a piece of context called router.
  // in this case, it's going to go back up to our router inside of index file (src/index.js)
  // and this <Router> is going to provide the context for us

  // so this is making us get access to a property called this.context.router inside our component.

  onSubmit(props){
    // 传入的props是表单的具体值
    this.props.createPost(props)
  //  createPost is an action creator that creates a promise. whenever we call an action creator, that creates a promise as a payload.
  //  so the call above (this.props.createPost(props);) would return the same promise
  //  so when the promise is resolved, means our blog post was successfully created
  //  so here is the perfect location to make sure that our navigation occurs.
  //  so what we gonna do is chain on a .then statement here,
  //  and then we'll pass in a function that would be called whenever the promise successfully resolves
      .then(()=>{
      // blog post has been created, navigate the user to the index
      // we navigate by calling this.context.router.push with the new path to navigate to
        this.context.router.push("/")
      })
  }

  render(){
    // reduxForm is injecting some helper for us onto this.props inside this component PostNew
    // so we can get accessed to those props
    const {fields: {title, categories, content}, handleSubmit} = this.props
    // 以上写法等同于 const handleSubmit = this.props.handleSubmit; const title = this.props.fields.title

    return(
      // *** reduxForm的第一个参数object传递到了createPost的入参里，在createPost的action creator中可以直接拿到
      // <form onSubmit={ handleSubmit(this.props.createPost) }>        handleSubmit can optionally pass in an action creator
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>
        {/* 当满足title.touched && title.invalid 这个条件的时候 增加has-error这个class */}
        <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          {/*  {...title} is destructing the object
          pass title object to the form:
           Object
             active:false
             defaultChecked:false
             defaultValue:undefined
             dirty:false
             initialValue:undefined
             invalid:false
             name:"title"
             onBlur:(event)
             onChange:(event)
             onDragStart:(event)
             onDrop:(event)
             onFocus:()
             onUpdate:(event)
             pristine:true
             touched:false
             valid:true
             visited:false
             __proto__:Object
           类似于在input标签上增加属性 onChange={title.onChange}...
          */}
          <div className="text-help control-label">
            {/* 此区域用于显示invalid时的提示信息 */}
            {/*  title.touched是title的属性，判断title的input有没有被touch过，如果不判断，则页面一加载的时候就会有错误提示。 */}
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
    errors.title = "Please enter a title" // 如果errors的属性与fields的内容有相同，则这个form就是invalid，不能被提交
  }
  if (!values.categories){
    errors.categories = "Please enter category"
  }
  if (!values.content){
    errors.content = "Please enter content"
  }
  return errors
}
// reduxForm has exactly the same behavior as connect,
// it can be used to inject our action creators into our component and create a container of our component
// the difference between reduxForm and connect is that reduxForm has one additional argument to it, which is the configuration object

// connect arguments: 1st is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm arguments: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
// 写进去之后，就可以在container里用this.props.createPost调用这个action

export default reduxForm({
//  pass in configurations to reduxForm
  form: 'PostNew',    //name our form
  fields: ["title", 'categories', 'content'], //fields the form is going to contain
  validate,   // 就是validate函数
}, null, { createPost })(PostNew)
// reduxForm is going to handle the state/data side

// when user types something in, will be recorded on the application state:
/*
* state === {
*   form: {
*     PostNew: {
*       title: '...'
*       categories: '...'
*       content: '...'
*     }
*   }
* }
* */