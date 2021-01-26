class Business {
  constructor({room, media, view, socketBuilder}) {
    this.media = media;
    this.room = room;
    this.view = view;

    this.socketBuilder = socketBuilder
      .setOnUserConnect(this.onUserConnect())
      .setOnUserDisconnect(this.onUserDisconnect())
      .build();
    this.socketBuilder.emit('join-room', this.room, 'teste01');
    this.currentStream = {}
  };

  static initialize(deps) {
    const instance = new Business(deps);
    return instance._init();
  };

  async _init() {
    this.currentStream = await this.media.getCamera();
    this.addVideoStream('test01');
  };

  addVideoStream(userId, stream = this.currentStream){
    this.view.renderVideo({
      userId,
      stream,
      isCurrentId: false,
    })
  }

  onUserConnect = function() {
    return userId => {
      console.log('user connected!', userId);
    }
  }

  onUserDisconnect = function() {
    return userId => {
      console.log('user disconnected!', userId);
    }
  }
}