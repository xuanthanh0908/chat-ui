export const SavedToken = (key, data) => {
  const jsonStringify = JSON.stringify(data)
  localStorage.setItem(key, jsonStringify)
}
export const getToken = (key) => {
  const token = localStorage.getItem(key)
  return JSON.parse(token)
}
