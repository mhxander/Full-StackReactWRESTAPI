import React, { Component, Fragment } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';

// Create the Course Detail Component
export default class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      user: '',
      authenticatedUser: '',
      courseId: ''
    }
  }
  
  // Get details of each course based on ID, gathering info to be included in state.
  async componentDidMount() {
    const { context } = this.props;
    const { id } = this.props.match.params;
    context.data.courseDetail(id)
    .then(response => {
      this.setState({
        title: response.title,
        description: response.description,
        estimatedTime: response.estimatedTime,
        materialsNeeded: response.materialsNeeded,
        user: response.user,
        authenticatedUser: context.authenticatedUser,
        courseId: id
      })
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push("/error");
    });
  }


  //Renders the Details page and checks for Authorized user.  If authorized, Update and Delete buttons will appear
  render() {
    const {
      title,
      courseId,
      authenticatedUser,
      user
    } = this.state

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            <span>
                {authenticatedUser ? ( authenticatedUser.emailAddress === user.emailAddress ? (
                    <Fragment>
                      <Link
                        className="button"
                        to={`/courses/${courseId}/update`}>
                        Update Course
                      </Link>
                      <Link
                        className="button"
                        onClick={this.deleteCourse}
                        to={`/courses/delete/${courseId}`}>
                        Delete Course
                      </Link>
                    </Fragment>
                  ) : (
                    <hr />
                  )
                ) : (
                  <hr />
                )}
              </span>
              <a className="button button-secondary" href="/">Return to List</a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
            <div className="course--description">
              <Markdown source={this.state.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <Markdown source={this.state.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Allow user to delete a course if they are authorized
  deleteCourse = () => {
    const { context } = this.props;
    const courseId = this.props.match.params.id;

    if (context.authenticatedUser) {
      const { emailAddress, password } = context.authenticatedUser;
      context.data.deleteCourse(courseId, emailAddress, password)
      .then(errors => {
        if (errors && errors.length > 0){
          this.setState({ errors });
        } else {
          this.props.history.push('/')
        } 
        })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
    } else {
      this.props.history.push('/forbidden')
    }
  } 
} 