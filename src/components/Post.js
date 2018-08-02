import React, { Component } from 'react';
import fire from '../fire';
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire
      .database()
      .ref('messages')
      .orderByKey()
      .limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }

  addMessage(event) {
    event.preventDefault();
    fire
      .database()
      .ref('messages')
      .push(this.inputEl.value);
    this.inputEl.value = '';
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   alert('you clicked the button');
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={el => (this.inputEl = el)} />
          <input type="submit" />
          <ul>
            {/* Render the list of messages */
            this.state.messages.map(message => (
              <li key={message.id}>{message.text}</li>
            ))}
          </ul>
        </form>
        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor="photo">Take a photo</label>
          <input name="photo" type="file" accept="image/*" capture />
          <button type="submit">Upload</button>
        </form>
        <img src="" /> */}
      </div>
    );
  }
}
