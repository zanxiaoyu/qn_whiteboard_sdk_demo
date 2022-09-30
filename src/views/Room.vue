<template>
  <div class="room">
    <input type="text" v-model="bucketId" /><button @click="switchBucket">
      switchBucket
    </button>
    <button @click="join">加入房间</button>
    <button @click="back">返回</button>
    <button @click="clear">清空白板</button>
    <input type="file" ref="file">
    <div id="iframeBox"></div>
  </div>
</template>
<script>
// import QNWhiteBoard from "qnweb-whiteboard";
const path = require("path");
export default {
  data() {
    return {
      client: null,
      instance: null,
      bucketId: "",
    };
  },
  computed: {},
  mounted() {
    this.client = window.whiteboard.controller;
    // this.client = QNWhiteBoard.create()
    this.client.initConfig({
      path: `${path.join(__dirname)}webassembly/whiteboardcanvas.html`,
    });
    // const appId = "a84fbe953cc14e2bbbe0c63c40d5081f";
    // const meetingId = "440a94d486624cd5a2dfce3ed95e1a39";
    // const token = "d08da2a942f20747096c0474c0a49f34";
    // const userId = "9";
    // const url = "https://sdk.efaceboard.cn:8888/Chatboard/meeting/join";
    const bucketId = `f251daaa-69f6-488c-8b72-a1095739047f`;

    this.instance = this.client.createInstance(bucketId);

    this.client.registerRoomEvent({
      onJoinSuccess: (userlist) => console.log("onJoinSuccess", userlist),
      onJoinFailed: () => console.log("onJoinFailed"),
      onRoomStatusChanged: (code) => console.log("onRoomStatusChanged", code),
      onUserJoin: (user) => console.log("onUserJoin", user),
      onUserLeave: (user) => console.log("onUserLeave", user),
      onDocumentListChanged: (documentList) =>
        console.log("onDocumentListChanged", documentList),
      onDocumentPageChanged: (documentId) =>
        console.log("onDocumentPageChanged", documentId),
      onEnterOffline: () => console.log("onEnterOffline"),
      onWidgetActivity: (widget) => console.log("onWidgetActivity", widget),
      webAssemblyOnReady: () => {
        console.log("webAssemblyOnReady");
        // this.client.join_room(url, appId, meetingId, userId, token);
      },
    });

    this.instance.registerWhiteBoardEvent({
      onWhiteBoardOpened: (size) => {
        console.log("onWhiteBoardOpened", size)
        const params = Object.assign(this.preUploadFileConfig, {
          top: 0,
          left: 0,
          width: size.width,
          height: size.height,
        })
        this.client.loadPreUploadFile(params).catch(err=> {
          console.error(err);
        })
      },
      onWhiteBoardOpenFailed: () => console.log("onWhiteBoardOpenFailed"),
      onWhiteBoardClosed: () => console.log("onWhiteBoardClosed"),
    });

    this.$refs.file.addEventListener('change', (e) => {
      console.log(e.target.files[0]);
      this.client.preUpload(e.target.files[0], "440a94d486624cd5a2dfce3ed95e1a39").then(res => {
        console.log(res);
        this.preUploadFileConfig = res
      })
    })
  },
  methods: {
    join() {
      const appId = "a84fbe953cc14e2bbbe0c63c40d5081f";
      const meetingId = "440a94d486624cd5a2dfce3ed95e1a39";
      const token = "d08da2a942f20747096c0474c0a49f34";
      const userId = "9";
      const url = "https://sdk.efaceboard.cn:8888/Chatboard/meeting/join";
      this.client.join_room(url, appId, meetingId, userId, token);
    },
    clear() {
      this.client.clean_document()
    },
    switchBucket() {
      this.instance.switchBucket(this.bucketId);
    },
    back() {
      this.$router.go(-1);
    },
  },
  beforeRouteLeave(to, from, next) {
    this.client.leave_room();
    next();
  },
};
</script>
<style>
#iframeBox {
  width: 800px;
  height: 800px;
}
</style>
