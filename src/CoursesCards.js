import React from "react";
import { getCourses, deleteCourse, refreshCourses } from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class CoursesCards extends React.Component {
  //courses = null;
  // constructor(props) {
  //   super(props);
  //   this.courses = props.courses;
  //   this.setCourses = props.setCourses;
  // }

  async componentDidMount() {
    await this.refreshCourses();
    //getCourses().then(courses => this.setState({ courses: courses }));
    // const courses = await getCourses();
    // this.setState({ courses });
  }

  async refreshCourses(forceReload) {
    try {
      await refreshCourses(this.props, forceReload);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async deleteCourse(courseId) {
    try {
      await deleteCourse(courseId);
      await this.refreshCourses(true);
    } catch (err) {
      toast.error(err.message);
    }
  }

  renderTable() {
    return (
      <>
        {this.props.courses.map(course => (
          <div
            key={course.id}
            style={{
              border: "1px solid black",
              display: "inline-block",
              height: "200px",
              width: "200px",
              margin: "10px"
            }}
          >
            <button onClick={() => this.deleteCourse(course.id)}>Delete</button>
            <div>Course id: {course.id}</div>
            <div>
              Title: <Link to={"course/" + course.slug}>{course.title}</Link>
            </div>
            <div>Category: {course.category}</div>
          </div>
        ))}
      </>
    );
  }

  render() {
    return (
      <>
        <ToastContainer />
        <h1>Courses</h1>
        <div>{this.renderTable()}</div>
      </>
    );
  }
}

export default CoursesCards;
