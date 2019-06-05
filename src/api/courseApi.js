import { handleResponse } from "./apiUtils";

const COURSES_URL = process.env.REACT_APP_BASE_URL + "/courses";

export function getCourses() {
  return fetch(COURSES_URL).then(handleResponse);
}

export function saveCourse(course) {
  return fetch(COURSES_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  }).then(handleResponse);
}

export function deleteCourse(courseId) {
  return fetch(`${COURSES_URL}/${courseId}`, {
    method: "DELETE"
  }).then(handleResponse);
}

export async function refreshCourses(props, forceReload) {
  if (forceReload || props.courses.length === 0) {
    const courses = await getCourses(); //.catch(err => toast.error(err.message));
    props.setCourses(courses);
  }
}
