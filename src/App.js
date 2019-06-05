import React, { useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Courses from "./Courses";
import { Route } from "react-router-dom";
import ManageCourse from "./ManageCourse";
import CoursesCards from "./CoursesCards";

const App = () => {
  const [courses, setCourses] = useState([]);

  return (
    <>
      <Nav />
      <Route exact path="/" component={Home} />
      <Route
        path="/courses"
        render={() => <Courses courses={courses} setCourses={setCourses} />}
      />
      {/* <Route path="/courses2" render={() => <Courses mystate="2" />} /> */}
      <Route
        path="/course/:slug?"
        render={props => (
          <ManageCourse
            courses={courses}
            setCourses={setCourses}
            props={props}
          />
        )}
      />
    </>
  );
};

export default App;
