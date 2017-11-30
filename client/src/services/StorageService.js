/* global localStorage */
function saveToken (token, path) {
  localStorage.setItem('token', token)
  localStorage.setItem('path', path)
  return { token, path }
}

export { saveToken }
