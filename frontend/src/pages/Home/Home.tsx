import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import { Redirect } from 'react-router';

interface IState {
  roomName: string,
  redirect: boolean
}

interface IProps {
  roomName: string;
}

// https://itnext.io/how-to-properly-define-state-in-react-components-47544eb4c15d

class Home extends React.Component<IProps, IState> {
  state: IState;
  constructor(props: IProps) {
    super(props)
    this.state = { 
      roomName: this.createRandomRoomNameString(),
      redirect: false,
     }

    this.handleChange = this.handleChange.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.newRandomRoomName = this.newRandomRoomName.bind(this);
  }

  createRandomRoomNameString(): string {
    return [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
  }

  newRandomRoomName():void {
    this.setState({roomName: this.createRandomRoomNameString() })
  }

  handleGo(): void{
    this.setState({redirect: true})
  }

  handleChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({roomName: event.currentTarget.value});
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={`/${this.state.roomName}`} />
    }

    return (
      <form >
        <label>
          Name:
          <input type="text" value={this.state.roomName} onChange={this.handleChange} />
        </label>
        <input type="button" value="Go" onClick={this.handleGo}/>
        <input type="button" value="New Room Name" onClick={this.newRandomRoomName}/>
      </form>
    )
  }
}

export default Home
