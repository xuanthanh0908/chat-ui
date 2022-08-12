import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { findUserRoutes, getMessRoutes } from '../api/routesApi'
import ChatInput from '../components/input/ChatInput'
import Message from '../components/message'
import useUser from '../hooks/useUser'
import { logout } from '../redux/slices/user'
function ChatDetails({ reciever, handleSendMsg, socket }) {
  const [user, setUser] = React.useState()
  const [messages, setMessages] = React.useState([])
  const [arrivalMessage, setArrivalMessage] = React.useState()
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentUser] = useUser()
  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${findUserRoutes}/${reciever}`)
      setUser(res.data)
    }
    fetchUser()
  }, [reciever])
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(`${getMessRoutes}`, {
          from: currentUser.userId,
          to: reciever,
        })
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [reciever])
  // on-msg
  React.useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [])
  React.useEffect(() => {
    setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  //
  const handleLogout = () => {
    dispatch(logout())
    // navigate('/login')
  }

  return (
    <Container>
      {user && (
        <div className="header">
          <img src={`data:image/svg+xml;base64,${user.avatar}`} alt="avatar" />
          <h3>{user.name}</h3>
          <div className="button">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
      <Message messages={messages} newArrival={arrivalMessage} />
      <ChatInput
        handleSendMsg={handleSendMsg}
        messages={messages}
        setMessages={setMessages}
      />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  .header {
    display: flex;
    overflow: hidden;
    align-items: center;
    width: 100%;
    padding: 2rem 2rem;
    img {
      height: 3rem;
    }
    h3 {
      color: white;
      margin-left: 1rem;
    }
    .button {
      flex: 1;
      text-align: right;
      button {
        outline: none;
        border: none;
        padding: 10px;
        background-color: #9a86f3;
        color: white;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
`
export default ChatDetails
