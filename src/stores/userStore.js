import { defineStore } from "pinia";

import { queryFirestore } from "../Services/Requests/firestoreRequests";

export const useUserStore = defineStore("user", {
  state: () => ({
    userID: '',
    Displayname: '',
  }),
  persist: true,
  actions: {
    async setUserInfos(userid) {
      const res = await queryFirestore("users", { where: [['uid', '==', userid]]})
      if (res instanceof Error) {
        console.error("User not found");
        return;
      }
      this.userID = res[0].uid;
      this.Displayname = res[0].displayName;
    },
    resetUserInfos() {
      this.userID = '';
      this.Displayname = '';
    },
  },
})
