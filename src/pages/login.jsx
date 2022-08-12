import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { images } from '../constants/images'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoutes } from '../api/routesApi'
import InputField from '../components/input/InputField'
import { toastoptions } from '../constants/toast'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/user'
import useUser from '../hooks/useUser'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentUser] = useUser()
  const [input, setInput] = React.useState({
    username: '',
    password: '',
  })
  React.useEffect(() => {
    if (currentUser) navigate('/')
  }, [navigate, currentUser])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      try {
        dispatch(loginStart())
        const res = await axios.post(loginRoutes, input)
        dispatch(loginSuccess(res.data))
        // if (res.status !== 200) {
        //   toast.error('User name or password wrong !!', toastoptions)
        //   process.exit(1)
        // }
        navigate('/')
      } catch (error) {
        dispatch(loginFailure())
        toast.error('Something went wrong, please try later !!', toastoptions)
      }
    }
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }
  const handleValidation = () => {
    const { username, password } = input
    if (username.length < 3) {
      toast.error('User Name should be greater than 3 characters', toastoptions)
      return false
    } else if (password.length < 8) {
      toast.error('Password should be greater than 8 characters', toastoptions)
      return false
    }
    return true
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <h1>Login</h1>
            {/* <img className="logo" src={images.logo} alt="logo" /> */}
          </div>
          <InputField
            type={'text'}
            name="username"
            placeholder={'Username'}
            onChange={handleChange}
          />

          <InputField
            type={'password'}
            name="password"
            placeholder={'Password'}
            onChange={handleChange}
          />
          <button type={'submit'}>Login</button>
          <span className="txtPrimary">
            Create an Account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #54bab9;
   */
  background-color: #131324;

  .brand {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  h1 {
    color: white;
    text-transform: uppercase;
    text-rendering: optimizeSpeed;
  }
  .logo {
    height: 6rem;
    width: 6rem;
    background-color: transparent;
    object-fit: contain;
  }
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    border-radius: 2rem;
    background-color: #080420;

    padding: 3rem;
    button {
      outline: none;
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 10px;
      color: white;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      background-color: #ec9b3b;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #eeac5b;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #646fd4;
        text-transform: capitalize;
        font-weight: bold;
        text-transform: uppercase;
        text-rendering: optimizeSpeed;
      }
    }
  }
`
export default Login
