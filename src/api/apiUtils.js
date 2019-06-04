export function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok");
}

export function handleError(err) {
  console.log(err);
  throw new Error(err);
}
