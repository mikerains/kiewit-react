import React, { Component } from "react";
import { saveCourse, refreshCourses } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// type RouteParams = {
//     userId: string; // must be type string since route params
// }

class ManageCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "",
        authorId: "",
        category: ""
      },
      redirectToCoursesPage: false
    };
  }

  async componentDidMount() {
    await this.refreshCourses();
    if (this.props.props.match.params.slug) {
      const course = this.props.courses.filter(
        c => c.slug === this.props.props.match.params.slug
      );
      this.setState({ course: course[0] });
    }
  }

  async refreshCourses(forceReload) {
    try {
      await refreshCourses(this.props, forceReload);
    } catch (err) {
      toast.error(err.message);
    }
  }

  handleSubmit = event => {
    saveCourse(this.state.course).then(() => {
      this.setState({ redirectToCoursesPage: true });
    });
    event.preventDefault();
  };

  handleChange = event => {
    const newcourse = this.state.course;
    newcourse[event.target.name] = event.target.value;
    this.setState({ course: newcourse });
  };

  //   handleTitleChange = event => {
  //     const newCourse = {
  //       ...this.state.course,
  //       ...{ title: event.target.value }
  //     };
  //     this.setState({ course: newCourse });
  //   };

  render() {
    if (this.state.redirectToCoursesPage) return <Redirect to="courses" />;

    return (
      <>
        <ToastContainer />
        <h1>Manage Course</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.course.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="authorId">Author</label>
            <br />
            <input
              id="authorId"
              name="authorId"
              type="text"
              value={this.state.course.authorId}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <br />
            <input
              id="category"
              name="category"
              type="text"
              value={this.state.course.category}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" value="Save" />
          </div>
        </form>
      </>
    );
  }
}

export default ManageCourse;
