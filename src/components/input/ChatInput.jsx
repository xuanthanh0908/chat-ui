import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import styled from 'styled-components'
const ChatInput = ({ handleSendMsg, messages, setMessages }) => {
  const [showEmoji, setShowEmoji] = React.useState(false)
  const [emoji, setEmoji] = React.useState()
  const [input, setInput] = React.useState('')
  const handleShowEmojiPicker = () => {
    setShowEmoji(!showEmoji)
  }
  const handleEmojiClick = (e, emoji) => {
    let msg = input
    msg += emoji.emoji
    setInput(msg)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    handleSendMsg(input)
    const msg = [...messages]
    msg.push({ fromSelf: true, message: input })
    setMessages(msg)
    setInput('')
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleShowEmojiPicker} />
          {showEmoji && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="type something here...."
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  padding: 0 2rem;
  background-color: #080429;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080429;
        box-shadow: 0 10px 10px #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080429;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .emoji-group::before {
          background-color: #080429;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff39;
    border-radius: 1rem;

    input {
      width: 100%;
      height: 60%;
      outline: none;
      border: 0.4rem solid transparent;
      background-color: transparent;
      color: white;
      font-size: 1rem;
      padding-left: 1rem;
      border-radius: 1rem;
      &::selection {
        background-color: #9186f3;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 1rem;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: #9186f3;
      svg {
        color: white;
        font-size: 1.2rem;
      }
    }
  }
`
export default ChatInput
