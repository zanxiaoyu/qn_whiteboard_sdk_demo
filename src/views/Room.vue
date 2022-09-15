<template>
  <div class="room">
    <h1>room</h1>
    <div id="iframeBox"></div>
  </div>
</template>
<script>
  import QNWhiteBoard from "qnweb-whiteboard";
  export default {
    mounted() {
      const client = QNWhiteBoard.create()
      client.initConfig({
        path: 'https://test4.xbbedu.cn:8071/MeetingServer/test/webassembly/whiteboardcanvas.html'
      })
      const appId = '7738fd99dbd546afa64d640be2bb4afe'
      const meetingId = 'c16454f95d3f44e6b286c8362fde97fd'
      const token = '215f954eee187fd96b45acb57649ada4'
      const userId = '9'
      const bucketId = `2ba1a21c-5f9f-48d1-bf04-03faff584441`

      const instance = client.createInstance(bucketId)
      console.log(instance);

      client.registerRoomEvent({
        onJoinSuccess: (userlist) => console.log('onJoinSuccess', userlist),
        onJoinFailed: () => console.log('onJoinFailed'),
        onRoomStatusChanged: (code) => console.log('onRoomStatusChanged', code),
        onUserJoin: (user) => console.log('onUserJoin', user),
        onUserLeave: (user) => console.log('onUserLeave', user),
        onDocumentListChanged: (documentList) =>
          console.log('onDocumentListChanged', documentList),
        onDocumentPageChanged: (documentId) =>
          console.log('onDocumentPageChanged', documentId),
        onEnterOffline: () => console.log('onEnterOffline'),
        onWidgetActivity: (widget) => console.log('onWidgetActivity', widget),
        webAssemblyOnReady: () => {
          console.log('webAssemblyOnReady')
          client.joinRoom(appId, meetingId, userId, token)
        }
      })

      instance.registerWhiteBoardEvent({
        onWhiteBoardOpened: (size) => console.log("onWhiteBoardOpened", size),
        onWhiteBoardOpenFailed: () => console.log('onWhiteBoardOpenFailed'),
        onWhiteBoardClosed: () => console.log('onWhiteBoardClosed'),
      })
    }
  }
</script>
<style>
  #iframeBox {
    width: 800px;
    height: 800px;
  }
</style>
