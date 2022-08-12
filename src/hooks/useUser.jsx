import { useSelector } from 'react-redux'

const useUser = () => {
  const currentUser = useSelector((m) => m.user.currentUser)

  return [currentUser]
}

export default useUser
