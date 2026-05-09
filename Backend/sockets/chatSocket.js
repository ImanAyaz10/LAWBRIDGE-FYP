const chatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        socket.on('sendMessage', (data) => {
            // Handle real-time messages
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = chatSocket;
