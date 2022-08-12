import Register from '../pages/register'
import Login from '../pages/login'
import Chat from '../pages/chat'
import Avatar from '../pages/avatar'
const allRoutes = [
  {
    id: 1,
    components: Register,
    path: '/register',
  },
  {
    id: 2,
    components: Login,
    path: '/login',
  },
  {
    id: 3,
    components: Chat,
    path: '/',
  },
  {
    id: 4,
    components: Avatar,
    path: '/setAvatar',
  },
]
export { allRoutes }
