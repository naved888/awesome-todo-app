<template>
  <div class="q-pa-md justify-center">
    <mark>admin credential => naved/dxa993</mark>
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input
        v-model="text_user"
        label="username"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-input
        v-model="text_pass"
        type="password"
        label="password"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-btn
        :loading="loading1"
        color="secondary"
        @click="addUser()"
        label="Login"
      />
      <q-btn
        :loading="loading1"
        color="purple"
        to="/registration"
        label="Register"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      text_user: "",
      text_pass: "",
      users: [],
      loading1: false
    };
  },
  async created() {
    const res = await axios.get("http://localhost:3000/users");
    if (res.data) {
      this.users = res.data;
    }
  },
  methods: {
    addUser() {
      if (this.text_user !== "" && this.text_pass !== "") {
        if (this.text_user == "naved" && this.text_pass == "dxa993") {
          this.$router.push("/admintodos/naved");
        } else {
          const data = this.users.filter(x => {
            if (x.name === this.text_user && x.pass === this.text_pass) {
              return x;
            }
          });
          if (data.length > 0) {
            this.$router.push({
              path: "/usertodos/" + data[0].id,
              params: { data }
            });
          } else {
            alert("please enter correct credential");
          }
        }
      }
    }
  }
};
</script>