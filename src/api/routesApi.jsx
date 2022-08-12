const host = process.env.REACT_APP_API_URL
const registerRoutes = `${host}/auth/register`
const loginRoutes = `${host}/auth/login`
const avatarRoutes = `${host}/auth/setAvatar`
const allUserRoutes = `${host}/auth/allUser`
const findUserRoutes = `${host}/auth/find`
const sendMessRoutes = `${host}/message/addmsg`
const getMessRoutes = `${host}/message/getmsg`
export {
  host,
  registerRoutes,
  loginRoutes,
  avatarRoutes,
  allUserRoutes,
  findUserRoutes,
  sendMessRoutes,
  getMessRoutes,
}
