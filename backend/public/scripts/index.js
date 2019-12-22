navigator.getUserMedia(
    {video: true, audio: true},
    stream => {
        const localVideo = document.getElementById("local-video")
        
        if(localVideo) {
            localVideo.srcObject = stream
        }
    },
    error => {
        console.warn(error.message)
    }
)

const socket = io('http://localhost:5000');



socket.on('update-user-list', function (data) {
    console.log(data);
    // socket.emit('my other event', { my: 'data' });
  });
