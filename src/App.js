import React from "react";
import { getCourses, deleteCourse } from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  state = {
    courses: [
      { id: 1, title: "Clean Code" },
      { id: 2, title: "React Fundamentals" }
    ]
  };

  async componentDidMount() {
    await this.refreshCourses();
    //getCourses().then(courses => this.setState({ courses: courses }));
    // const courses = await getCourses();
    // this.setState({ courses });
  }

  async refreshCourses() {
    try {
      const courses = await getCourses(); //.catch(err => toast.error(err.message));
      this.setState({ courses });
    } catch (err) {
      toast.error(err.message);
    }
  }

  async deleteCourse(courseId) {
    try {
      await deleteCourse(courseId);
      await this.refreshCourses();
    } catch (err) {
      toast.error(err.message);
    }
  }

  renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {this.state.courses.map(course => (
            <tr key={course.id}>
              <td>
                <button onClick={() => this.deleteCourse(course.id)}>
                  Delete
                </button>
              </td>
              <td>{course.id}</td>
              <td>{course.title}</td>
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
        {this.renderTable()}
      </>
    );
  }
}

export default App;
