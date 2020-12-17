import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { FormControl, Input, InputLabel, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "./components/Message";
import db from "./firebase";
import FlipMove from "react-flip-move";
import "./App.css";

const App = () => {
  // HOOKS
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    //Corre cuando el componente App carga
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // Aquí Corre el codigo condicionado del cual se encarga ejecutar el useEffect
    // Si está en blanco dentro de [] "las dependencias", este codigo corre una vez cuando la app del componente cargue.
    // Si tenemos una variable como input dentro de [input], esto correrá cada vez que input cambie

    setUsername(prompt("¡Por favor escriba su nombre!"));
  }, []); //Condición

  //// FUNCION ENVIAR MENSAJES
  const sendMessage = (event) => {
    // Toda la logica para enviar el mensaje

    event.preventDefault(); //Prevenir el refresh del submit de enviar mensaje

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //Limpiar el input
    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" />
      <h1>Hey there 😎</h1>
      <h2>Bienvenido {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Escribe un mensaje...</InputLabel>
          <Input
            className="app__input"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            color="primary"
            variant="contained"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => {
          return <Message key={id} username={username} message={message} />;
        })}
      </FlipMove>
    </div>
  );
};

export default App;
