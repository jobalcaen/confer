import React from 'react';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import './VideoStream.scss'


// interface IState {
//   roomName: string,
//   redirect: boolean
// }

interface IProps {
    stream?: MediaStream
}

// https://itnext.io/how-to-properly-define-state-in-react-components-47544eb4c15d

class VideoStream extends React.Component<IProps, {}> {

  videoRef = React.createRef<HTMLVideoElement>()
  constructor(props: IProps) {
    super(props)
  }

  componentDidUpdate() {
    console.log('did update', this.props)
    if (this.props.stream) {
      this.setVideoSrcObj(this.props.stream)
    }
  }

  setVideoSrcObj(stream: MediaStream) {
    if (this.videoRef.current) {
      this.videoRef.current.srcObject = stream
    }
  }

  componentDidMount() {
    console.log('did mount', this.props)

  }

  render() {
      return (
        <video 
          autoPlay
          ref={this.videoRef}
          className="stream"
        />
      )
  
  }
}

export default VideoStream
