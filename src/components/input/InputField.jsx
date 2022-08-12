import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputField = ({ type, name, placeholder, onChange }) => {
  return (
    <Container>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </Container>
  )
}

InputField.propsTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
InputField.defaultProps = {
  type: 'text',
  placeholder: 'something here....',
}
const Container = styled.div`
  input {
    height: 40px;
    width: 100%;
    padding: 0 10px;
    outline: none;
    border-radius: 0.3rem;
    border: 0.2rem solid transparent;
    &:focus {
      border-color: #131324;
    }
  }
`

export default InputField
