import { defineStore } from "pinia";

import { signIn, signUp, logoutUser } from "../Services/Auth/auth";
import { addData } from "../Services/Requests/firestoreRequests";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    error: null,
  }),
  persist: true,
  actions: {
    async handleSignIn(email, password) {
      if (email === '' || password === '') {
        this.error = "please enter a valid email and password"
      } else {
          const userInfo = await signIn(email, password);
          if (userInfo.res === "error") {
            this.error = userInfo.content
          } else {
          this.user = userInfo.content;
          this.error = null;
          }
      }
    },
    async handleSignUp(email, password, displayName) {
      if (email === '' || password === '' || displayName === '') {
        this.error = "please enter a name, email and password"
        return;
      }
      try {
        const userInfo = await signUp(email, password);
        this.user = userInfo;
        this.error = null;
        try {
          const res = await addData('users',
            {
              uid: userInfo.uid,
              displayName: displayName,
              email: email,
              createdAt: new Date()
            }
          )

        } catch (err) {
          this.error = err.message;
        }
      } catch (error) {
        this.error = error.message;
      }

    },
    async handleLogoutUser() {
      const res = await logoutUser();
      if (res === true) {
        this.user = null;
        this.error = null;
      } else {
        this.error = "Failed to log out"
      }
    }
  }
});
