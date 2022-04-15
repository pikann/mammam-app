import {io, Socket} from 'socket.io-client';
import Urls from '../constants/Urls';

const singletonEnforcer = Symbol();

class SocketClient {
  socketClient: Socket | undefined;
  onMessage: (payload: any) => void;
  static socketClientInstance: SocketClient;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Socket client single instance');
    }

    this.onMessage = () => {};
  }

  static get instance() {
    if (!this.socketClientInstance) {
      this.socketClientInstance = new SocketClient(singletonEnforcer);
    }

    return this.socketClientInstance;
  }

  connect(token: string = '') {
    if (this.socketClient) {
      this.disconnect();
    }

    this.socketClient = io(Urls.SOCKET, {
      query: {token},
    });

    this.socketClient.on('connect', () => {
      this.socketClient?.on('message', this.onMessage);
    });
  }

  disconnect() {
    this.socketClient?.disconnect();
    this.socketClient = undefined;
  }

  setOnMessage(func: (payload: any) => void) {
    this.onMessage = func;
  }
}

export default SocketClient.instance;
