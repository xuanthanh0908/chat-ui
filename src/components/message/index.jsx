import React from 'react'
import styled from 'styled-components'

const Message = ({ messages, newArrival }) => {
  const scrollRef = React.useRef()
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }, [newArrival])
  return (
    <Container>
      {messages.length > 1 && (
        <div className="list-messgae" ref={scrollRef}>
          {messages.map((item, index) => (
            <div
              key={index.toString()}
              className={`message ${item.fromSelf ? 'sender' : 'reciever'}`}
            >
              <div className="content">
                <p>{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem 1rem;
  .list-messgae {
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
  }
`
export default Message
