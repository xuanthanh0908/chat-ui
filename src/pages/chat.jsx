import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import { host, sendMessRoutes } from '../api/routesApi'
import Welcome from '../components/welcome'
import useUser from '../hooks/useUser'
import ChatDetails from './chat_user'
import ListFriends from './friends'
const Chat = () => {
  const socket = React.useRef()

  const [currentUser] = useUser()
  const navigate = useNavigate()
  const [friendId, setFriend] = React.useState()
  const handleChange = (friendId) => {
    setFriend(friendId)
  }
  React.useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:3004')
      socket.current.emit('add-user', currentUser.userId)
    }
  }, [])
  //
  React.useEffect(() => {
    if (!currentUser) navigate('/login')
  }, [currentUser, navigate])
  const handleSendMsg = async (msg) => {
    try {
      await axios.post(`${sendMessRoutes}`, {
        from: currentUser.userId,
        to: friendId,
        message: msg,
      })
      socket.current.emit('send-msg', {
        to: friendId,
        from: currentUser.userId,
        msg: msg,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <div className="container">
        <ListFriends handleChangefriendId={handleChange} />
        {friendId && (
          <ChatDetails
            handleSendMsg={handleSendMsg}
            reciever={friendId}
            socket={socket}
          />
        )}
        {!friendId && <Welcome />}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
export default Chat
