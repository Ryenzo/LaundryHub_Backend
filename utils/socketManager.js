// Socket.io Manager for LaundryHub Real-Time Updates
// Handles Socket.io connections, room management, and event emissions

let io = null;

/**
 * Initialize Socket.io instance
 * @param {SocketIO.Server} socketIoInstance - The Socket.io server instance
 */
export const initializeSocket = (socketIoInstance) => {
    io = socketIoInstance;
    console.log('✅ Socket.io Manager initialized');
};

/**
 * Get the Socket.io instance
 * @returns {SocketIO.Server} The Socket.io server instance
 */
export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io has not been initialized. Call initializeSocket() first.');
    }
    return io;
};

/**
 * Emit event to a specific user's room
 * @param {string} firebaseUid - User's Firebase UID
 * @param {string} event - Event name
 * @param {Object} data - Data to send
 */
export const emitToUser = (firebaseUid, event, data) => {
    if (!io) {
        console.warn('⚠️ Socket.io not initialized, cannot emit to user');
        return;
    }
    const roomName = `user_${firebaseUid}`;
    io.to(roomName).emit(event, data);
    console.log(`📤 Emitted '${event}' to user room: ${roomName}`);
};

/**
 * Emit event to a specific shop's admin room
 * @param {string} shopId - Shop ID
 * @param {string} event - Event name
 * @param {Object} data - Data to send
 */
export const emitToShop = (shopId, event, data) => {
    if (!io) {
        console.warn('⚠️ Socket.io not initialized, cannot emit to shop');
        return;
    }
    const roomName = `shop_${shopId}`;
    io.to(roomName).emit(event, data);
    console.log(`📤 Emitted '${event}' to shop room: ${roomName}`);
};

/**
 * Emit event to all connected admins (broadcast)
 * @param {string} event - Event name
 * @param {Object} data - Data to send
 */
export const emitToAllAdmins = (event, data) => {
    if (!io) {
        console.warn('⚠️ Socket.io not initialized, cannot emit to all admins');
        return;
    }
    io.to('admins').emit(event, data);
    console.log(`📤 Broadcasted '${event}' to all admins`);
};

/**
 * Handle Socket.io connection events
 * @param {Socket} socket - The connected socket
 */
export const handleConnection = (socket) => {
    console.log(`🔌 New socket connection: ${socket.id}`);

    // Join user room when user connects
    socket.on('join_user_room', (firebaseUid) => {
        const roomName = `user_${firebaseUid}`;
        socket.join(roomName);
        console.log(`👤 User ${firebaseUid} joined room: ${roomName}`);
        socket.emit('joined_room', { room: roomName, type: 'user' });
    });

    // Join shop admin room when admin connects
    socket.on('join_shop_room', (shopId) => {
        const roomName = `shop_${shopId}`;
        socket.join(roomName);
        socket.join('admins'); // Also join general admins room
        console.log(`🏪 Admin joined shop room: ${roomName}`);
        socket.emit('joined_room', { room: roomName, type: 'shop' });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
    });

    // Ping/pong for connection health check
    socket.on('ping', () => {
        socket.emit('pong');
    });
};
