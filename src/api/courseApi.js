import { handleResponse } from "./apiUtils";

export function getCourses() {
  return fetch("http://localhost:3001/courses").then(handleResponse);
}

export function deleteCourse(courseId) {
  return fetch(`http://localhost:3001/courses/${courseId}`, {
    method: "DELETE"
  }).then(handleResponse);
}
