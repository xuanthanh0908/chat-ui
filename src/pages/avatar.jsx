import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { images } from '../constants/images'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Buffer } from 'buffer'
import axios from 'axios'
import { toastoptions } from '../constants/toast'
import { avatarRoutes } from '../api/routesApi'
import useUser from '../hooks/useUser'

const Avatar = () => {
  const navigate = useNavigate()
  const ApiAvatar = 'https://api.multiavatar.com/456789'
  const [currentUser] = useUser()
  const [avatar, setAvatar] = React.useState([])
  const [selectedAvatar, setSelectedAvatar] = React.useState()
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {}, [])
  React.useEffect(() => {
    const FetchImages = async () => {
      const data = []
      setLoading(true)
      for (let i = 0; i < 4; i++) {
        const rdImages = await axios.get(
          `${ApiAvatar}/${Math.round(Math.random() * 10000)}`,
        )
        const buffer = new Buffer(rdImages.data)
        data.push(buffer.toString('base64'))
      }
      setAvatar(data)
      setLoading(false)
    }
    FetchImages()
  }, [])
  React.useEffect(() => {
    if (!currentUser) navigate('/login')
  }, [currentUser])
  const setProfilePicture = async () => {
    try {
      if (!currentUser) return toast.error('Not found user !!', toastoptions)
      if (selectedAvatar == null) {
        return toast.error('Please select your avatar !!', toastoptions)
      }
      await axios.post(`${avatarRoutes}/${currentUser.userId}`, {
        avatar: avatar[selectedAvatar],
      })
      toast.success('Your avatar has been added !!', toastoptions)
      setTimeout(() => {
        navigate('/')
      }, 4000)
    } catch (error) {
      toast.error('Something went wrong !!', toastoptions)
    }
  }
  return (
    <Container>
      {loading ? (
        <img className="loader" src={images.loader} alt="loading" />
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture !!</h1>
          </div>
          <div className="avatars">
            {avatar.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    onClick={() => setSelectedAvatar(index)}
                    src={`data:image/svg+xml;base64,${item}`}
                    alt="avatar"
                  />
                </div>
              )
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg__primaryColor);
  .loader {
    max-inline-size: 100%;
  }
  .avatars {
    display: flex;
    gap: 2rem;
    margin-top: 20px;
    .avatar {
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border-color: var(--bg__primaryBoldColor);
    }
  }
  .submit-btn {
    margin-top: 20px;
    outline: none;
    border: none;
    height: 40px;
    min-width: 100px;
    padding: 10px;
    border-radius: 10px;
    color: var(--txt__primaryColor);
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    background-color: var(--bg__secondaryColor);
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: var(--bg_hoverColor);
    }
  }
`
export default Avatar
