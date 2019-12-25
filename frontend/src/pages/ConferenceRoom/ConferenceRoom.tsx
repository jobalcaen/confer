import React, { Ref } from 'react';
import {
  Typography,
} from '@material-ui/core';
import VideoStream from '../../components/VideoStream/VideoStream';

interface IProps {
  room: string
}

interface IState {
  localStream: MediaStream | undefined,
  participants: string[],
}

class ConferenceRoom extends React.Component<IProps, IState> {
  state: IState;
  constructor(props: IProps) {
    super(props)
    this.state = {
      localStream: undefined,
      participants: [],
    }
  }

  async getVideoStream(constraints?: MediaStreamConstraints) {
    let stream = null
    const defaultConstraints = {video: true, audio: true}

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints ? constraints : defaultConstraints)
      this.setState({localStream: stream})
      /* use the stream */
    } catch(err) {
      /* handle the error */
      console.log('navigator.mediaDevices.getUserMedia failed with: ',err)
    }
  }

  componentDidMount() {
    const defaultConstraints = {video: true, audio: true}
    this.getVideoStream(defaultConstraints)    
  }
  
  componentDidUpdate() {
    // const defaultConstraints = {video: true, audio: true}
    // // this.getVideoStream(defaultConstraints)
  }

  render() {
    // console.log('this props', this.props)
    
    // console.log('this state', this.state)
    return( 
      <VideoStream stream={this.state.localStream}/>
    )
  }
}

export default ConferenceRoom
