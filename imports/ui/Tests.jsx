import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import Messages from '../api/messages';

export default class Tests extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: '',
      messages: [],
      showPicker: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.autoTracker = Tracker.autorun(() => {
      Meteor.subscribe('messages.new');
      this.setState({ messages: Messages.find({ }).fetch() });
    });
  }

  componentWillUnmount() {
    this.autoTracker.stop();
  }

  onSubmit(event) {
    event.preventDefault();

    Meteor.call('messages.insert', this.state.message, (error, response) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <button onClick={ () => this.setState({ showPicker: true }) }>🙂</button>
        {this.state.showPicker && <Picker native={ true } title="Only native" emoji='point_up' onSelect={(emoji) => this.setState({message: this.state.message + emoji.native, showPicker: false})}/> }
        <form onSubmit={this.onSubmit}>
          <input type="text" value={ this.state.message } onChange={(event) => this.setState({message: event.target.value})} placeholder="Your message" />
          <button>Send</button>
        </form>
        <ul>
          { this.state.messages.map(message => <li key={ message._id }>{message.messageBody}</li>) }
        </ul>


      </div>
      );
  }
}
