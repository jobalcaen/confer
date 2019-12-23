import React from 'react';
import {
  Typography,
} from '@material-ui/core';

interface IProps {
  room: string
}


interface IState {
  participants: string[]
}
class ConferenceRoom extends React.Component<IProps, IState> {
  state: IState;
  constructor(props: IProps) {
    super(props)
    this.state = {
      participants: []
    }
  }

  render() {


    return (
      <div>room name</div>
    )
  }
}

export default ConferenceRoom
