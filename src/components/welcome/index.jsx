import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { findUserRoutes } from '../../api/routesApi'
import { images } from '../../constants/images'
import useUser from '../../hooks/useUser'
const Welcome = () => {
  const [currentUser] = useUser()
  const [user, setUser] = React.useState()
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${findUserRoutes}/${currentUser.userId}`)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [currentUser])
  return (
    user && (
      <Container>
        <img src={images.robot} alt="Logo" />
        <h1>
          Welcome, <span>{user.username}</span>{' '}
        </h1>
        <h3>Please select a chat to start Message !!</h3>
      </Container>
    )
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`
export default Welcome
