import React from 'react';
import VideoStream from '../../components/VideoStream/VideoStream';
import socketIOClient from "socket.io-client";

interface IProps {
  room: string
}

interface IState {
  localStream: MediaStream | undefined,
  participants: string[],
  endpoint: string
}

class ConferenceRoom extends React.Component<IProps, IState> {
  state: IState;
  socket?: SocketIOClient.Socket
  constructor(props: IProps) {
    super(props)
    this.state = {
      localStream: undefined,
      participants: [],
      endpoint: "http://127.0.0.1:5000",
    }
  }

  async getLocalVideoStream(constraints?: MediaStreamConstraints) {
    let stream = null
    const defaultConstraints = {video: true, audio: true}

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints ? constraints : defaultConstraints)
      this.setState({localStream: stream})
    } catch(err) {
      console.log('navigator.mediaDevices.getUserMedia failed with: ',err)
    }
  }

  componentDidMount() {
    this.getLocalVideoStream()
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint)
    this.handleSocket(this.socket)
  }
  
  componentWillUnmount() {
    console.log('leaving ', this.socket)
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  componentDidUpdate() {

  }

  handleSocket(socket: SocketIOClient.Socket) {
    console.log('handle socket ', socket)

    socket.on('update-user-list', (participantsList: any) => {
      this.setState({participants: participantsList})
    }

    )
  }

  

  render() {

    return( 
      <VideoStream stream={this.state.localStream}/>
    )
  }
}

export default ConferenceRoom
