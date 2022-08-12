import React from 'react'
import styled from 'styled-components'
import { allUserRoutes, findUserRoutes } from '../api/routesApi'
import useUser from '../hooks/useUser'
import axios from 'axios'
const ListFriends = ({ handleChangefriendId }) => {
  const [friends, setFriends] = React.useState([])
  const [currentUser] = useUser()
  const [selectUser, setSelectUser] = React.useState()
  const [infoCurrentUser, setInfoCurrentUser] = React.useState()

  const handleChange = (receiver) => {
    handleChangefriendId(receiver)
    setSelectUser(receiver)
  }
  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${findUserRoutes}/${currentUser.userId}`)
        setInfoCurrentUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCurrentUser()
  }, [])
  React.useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get(`${allUserRoutes}/${currentUser.userId}`)
      setFriends(res.data)
    }
    fetchFriends()
  }, [currentUser])
  return (
    <Container>
      <div className="brand">
        <h3>List Friends</h3>
      </div>
      <div className="list-friend">
        {friends.map((item, index) => {
          return (
            <div
              key={index.toString()}
              onClick={() => handleChange(item._id)}
              className={`user ${selectUser === item._id ? 'selected' : ''}`}
            >
              <img
                src={`data:image/svg+xml;base64,${item.avatar}`}
                alt="avatar"
              />
              <h4>{item.username}</h4>
            </div>
          )
        })}
      </div>
      <div className="current-user">
        {infoCurrentUser && (
          <div className="user">
            <img
              src={`data:image/svg+xml;base64,${infoCurrentUser.avatar}`}
              alt="avatar"
            />
            <h3>{infoCurrentUser.username}</h3>
          </div>
        )}
      </div>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  /* border-radius: 1rem 0 0 1rem; */
  background-color: #080420;
  .brand {
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    img {
      height: 6rem;
    }
    h3 {
      color: var(--txt__primaryColor);
      text-transform: uppercase;
    }
  }
  .list-friend {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .user {
      min-height: 4rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      background-color: #ffffff34;
      h4 {
        color: var(--txt__primaryColor);
        text-transform: capitalize;
        text-align: center;
        margin-left: 0.4rem;
      }
      img {
        height: 2.5rem;
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .user {
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      overflow: auto;
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
      h3 {
        color: var(--txt__primaryColor);
        text-transform: capitalize;
        text-align: center;
        margin-left: 0.8rem;
      }
    }
  }
`
export default ListFriends
