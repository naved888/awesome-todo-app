<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        type="email"
        label="email *"
        suffix="@gmail.com"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="name"
        label="username *"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="pass"
        label="password *"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type your password'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      pass: null,
      email: null,
      users: [],
      accept: false
    };
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
        this.$router.push({ path: "/" });
      }
      const putData = async () => {
        const res = axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          pass: this.pass
        });
      };
      putData();
    },

    onReset() {
      this.name = null;
      this.email = null;
      this.pass = null;
      this.accept = false;
    }
  }
};
</script>