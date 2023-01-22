import './App.css';
import './normal.css';
import { useState } from 'react'
function App() {
  const [input, setInput] = useState('')
  const [ chatLog, setChatLog ] = useState([])
const clearChat = ()=>{
  setChatLog([
    {
      user: 'eu',
      message: 'Bem vindo!'
    }
  ])
}
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let chatLogNew = [...chatLog,{ user: 'eu', message: `${input}`}]
    setInput('')
    setChatLog(chatLogNew)
    const messages = chatLogNew.map((message)=>message.message)
        .join("\n")
    const response = await fetch('http://localhost:3080/',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    })
    const data = await response.json()
    setChatLog([...chatLogNew,{ user: 'gpt', message: `${data.message}`}])
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Nova conversa
        </div>
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Copiar
        </div>
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Editar
        </div>
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Guardar
        </div>
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Compartilhar
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index)=>(
            <ChatMessage key={index} message={message}/>
          ))
        }
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit} >
            <input  
              className="chat-input-textarea"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  );
}
const ChatMessage = ({message})=>{
  return(
    <div className={`chat-message`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && 'chatgpt'}`}>
          {message.user === 'gpt'}
        </div>
        <div className={`chat-message ${message.user === "gpt" ? 'chatgpt' : ''}`}>
            {message.message}
        </div>
      </div>
    </div>
  )
}
export default App;

