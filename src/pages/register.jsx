import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { images } from '../constants/images'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoutes } from '../api/routesApi'
import { toastoptions } from '../constants/toast'
import InputField from '../components/input/InputField'
import useUser from '../hooks/useUser'
const Register = () => {
  const navigate = useNavigate()
  const [currentUser] = useUser()
  const [input, setInput] = React.useState({
    username: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  })
  React.useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      const { confirmPassword, ...rest } = input
      try {
        await axios.post(registerRoutes, {
          ...rest,
        })
        toast.success('Account has been created !!', toastoptions)
        setTimeout(() => {
          navigate('/setAvatar')
        }, 3000)
      } catch (error) {
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
    const { username, email, password, confirmPassword } = input
    if (password !== confirmPassword) {
      toast.error('Password and confirm password must be same', toastoptions)
      return false
    } else if (username.length < 3) {
      toast.error('User Name should be greater than 3 characters', toastoptions)
      return false
    } else if (password.length < 8) {
      toast.error('Password should be greater than 8 characters', toastoptions)
      return false
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) ||
      email === ''
    ) {
      toast.error('Email inValid', toastoptions)
    }
    return true
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <h1>Regiter</h1>
            {/* <img className="logo" src={images.logo} alt="logo" /> */}
          </div>
          <InputField
            type={'text'}
            name="username"
            placeholder={'Username'}
            onChange={handleChange}
          />
          <InputField
            type={'text'}
            name="name"
            placeholder={'name'}
            onChange={handleChange}
          />
          <InputField
            type={'email'}
            name="email"
            placeholder={'Email'}
            onChange={handleChange}
          />
          <InputField
            type={'password'}
            name="password"
            placeholder={'Password'}
            onChange={handleChange}
          />
          <InputField
            type={'password'}
            name="confirmPassword"
            placeholder={'confirm Password'}
            onChange={handleChange}
          />
          <button type={'submit'}>Create User</button>
          <span className="txtPrimary">
            Already have an acount? <Link to="/login">Login</Link>
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
  /* background-color: var(--bg__primaryBoldColor);
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
    color: var(--txt__primaryColor);
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
    /* background-color: var(--bg__primaryColor); */
    background-color: #080420;

    padding: 3rem;
    button {
      outline: none;
      border: none;
      height: 40px;
      width: 100%;
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
    span {
      color: var(--txt__primaryColor);
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
export default Register
