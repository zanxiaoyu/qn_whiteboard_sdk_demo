<template>
  <div class="room">
    <h1>room</h1>
    <button @click="switchBucket">switchBucket</button>
    <div id="iframeBox"></div>
  </div>
</template>
<script>
  import QNWhiteBoard from "qnweb-whiteboard";
  export default {
    data() {
      return {
        client: null,
        instance: null
      }
    },
    computed: {
    },
    mounted() {
      // this.client = window.whiteboard.controller
      this.client = QNWhiteBoard.create()
      this.client.initConfig({
        path: 'https://test4.xbbedu.cn:8071/MeetingServer/test/webassembly/whiteboardcanvas.html'
      })
      const appId = '7738fd99dbd546afa64d640be2bb4afe'
      const meetingId = 'c16454f95d3f44e6b286c8362fde97fd'
      const token = '215f954eee187fd96b45acb57649ada4'
      const userId = '9'
      // const url = 'https://sdk.efaceboard.cn:8888/Chatboard/meeting/join'
      const bucketId = `2ba1a21c-5f9f-48d1-bf04-03faff584441`


      this.instance = this.client.createInstance(bucketId)

      this.client.registerRoomEvent({
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
          this.client.joinRoom(appId, meetingId, userId, token)
        }
      })

      this.instance.registerWhiteBoardEvent({
        onWhiteBoardOpened: (size) => console.log("onWhiteBoardOpened", size),
        onWhiteBoardOpenFailed: () => console.log('onWhiteBoardOpenFailed'),
        onWhiteBoardClosed: () => console.log('onWhiteBoardClosed'),
      })
    },
    methods: {
      switchBucket() {
        this.instance.switchBucket('c5b4d380-21d7-43af-8859-64639d801f73')
      }
    },
    beforeRouteLeave(to,from , next) {
      this.client.leave_room()
      next()
    }
  }
</script>
<style>
  #iframeBox {
    width: 800px;
    height: 800px;
  }
</style>
