import React from 'react';
import VideoStream from '../../components/VideoStream/VideoStream';
import socketIOClient from "socket.io-client";
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<any>{}

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
    this.socket = socketIOClient(`${endpoint}`, {
      query: {
        room: this.props.match.params.roomname
      }
    })
    this.handleSocket(this.socket)
  }
  
  componentWillUnmount() {
    if (this.socket) {
      this.socket.close()
    }
  }

  componentDidUpdate() {
    console.log('participants', this.state.participants)
  }

  handleSocket(socket: SocketIOClient.Socket) {    
    socket.on('participant-joined', (participant: string) => {

      console.log('participant-joined')
      this.setState({participants: [...this.state.participants, participant]})
    })

    socket.on('participant-left', (msg: string) => {
      console.log('participant-left')
      this.setState({participants: [...this.state.participants.filter(participant => participant !== msg)]})
    })

    socket.on('join-room', (participantsList: any) => {
      // convert sockets keyval object to array
      const participantsArr = Object.keys(participantsList)

      console.log('update-user-list', participantsArr)
      this.setState({participants: participantsArr})
    })


  }

  

  render() {
    return( 
      <VideoStream stream={this.state.localStream}/>
    )
  }
}

export default ConferenceRoom
