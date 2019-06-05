import React from "react";
import PropTypes from "prop-types";
import { deleteCourse, refreshCourses } from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { coursePropType } from "./PropTypes";

class Courses extends React.Component {
  static propTypes = {
    loadCourses: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(coursePropType).isRequired
  };
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
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {this.props.courses.map(course => (
            <tr key={course.id}>
              <td>
                <button onClick={() => this.deleteCourse(course.id)}>
                  Delete
                </button>
              </td>
              <td>{course.id}</td>
              <td>
                <Link to={"course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        <ToastContainer />
        <h1>Courses</h1>
        State:{this.props.mystate}
        {this.renderTable()}
      </>
    );
  }
}

export default Courses;
