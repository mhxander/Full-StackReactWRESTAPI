import React, { Component, Fragment } from 'react';
import Form from './Form';


// Create Update Course Component
export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      user: '',
      courseId: '',
      userId: '',
      errors: []
    }
  }
  

  // Check course details based on ID.  If a course exists, setState is triggered.
  // If user is not Authorized to change that course, user is rerouted to Forbidden.  If no course found, redirected to notfound
  componentDidMount() {
    const { context } = this.props;
    const authUser = this.props.context.authenticatedUser;
    context.data.courseDetail(this.props.match.params.id).then(course => {
      if (course) {
        this.setState({
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
          user: course.user,
          courseId: course.id,
          userId: course.userId
        });
      }
      if (!authUser || authUser.Id !== this.state.user.id){
        this.props.history.push('/forbidden')
      }
      if (!course) {
        this.props.history.push('/notfound')
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push('/error')
    });
  }

  // Renders the Update Course page if Authorized
  render() {
    const { context } = this.props;
    const  {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    errors
    } = this.state;
  
    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      value={title}
                      onChange={this.change} 
                      className="input-title course--title--input" 
                      placeholder="Course title..." />
                  </div>
                  <p>By {context.authenticatedUser.Name}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea 
                      id="description" 
                      name="description" 
                      value={description}
                      onChange={this.change} 
                      placeholder="Course description..."
                      className="course--description" />
                  </div> 
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input 
                          id="estimatedTime" 
                          name="estimatedTime" 
                          type="text"
                          value={estimatedTime} 
                          onChange={this.change} 
                          className="course--time--input"                              
                          placeholder="Hours" />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          value={materialsNeeded}
                          onChange={this.change} 
                          placeholder="List materials..." 
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Fragment>
          )} />
      </div>
    ) 
  }

  // Update state based on Form values.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Allow user to Update a course only if they are the author
  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = context.authenticatedUser;
    const courseId = this.props.match.params.id;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;

    
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    };
    
    context.data.updateCourse(courseId, course, emailAddress, password)
    .then( errors => {
      if (errors.length > 0){
        this.setState({ errors });
      } else if (errors.length === 0) {
        this.props.history.push(`/courses/${courseId}`)
      } else {
        this.props.history.push('/notfound')
      }
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    });
  }
  

  //Redirects users back to the current Course page if the cancel button is clicked.  
  cancel = () => {
    const courseId = this.props.match.params.id;
    this.props.history.push(`/courses/${courseId}`);
  }
}
