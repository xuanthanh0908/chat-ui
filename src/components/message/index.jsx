import React from 'react'
import styled from 'styled-components'

const Message = ({ messages, newArrival }) => {
  console.log(newArrival)
  const scrollRef = React.useRef()
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [messages.length])
  return (
    <Container ref={scrollRef}>
      {messages.length > 1 &&
        messages.map((item, index) => (
          <div
            key={index.toString()}
            className={`message ${item.fromSelf ? 'sender' : 'reciever'}`}
          >
            <div className="content">
              <p>{item.message}</p>
            </div>
          </div>
        ))}
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 1rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .message {
    display: flex;
    align-items: center;
  }
  .sender {
    .content {
      background-color: #9a86f3;
    }
    justify-content: flex-end;
  }
  .reciever {
    .content {
      background-color: #3a374d;
    }
    justify-content: flex-start;
  }
  .content {
    color: white;
    overflow-wrap: break-word;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 400;
  }
`
export default Message
