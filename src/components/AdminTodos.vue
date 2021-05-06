<template>
  <div>
    <mark class="text-bold">Users List</mark>
    <q-list bordered separator>
      <q-item
        clickable
        class=""
        v-ripple
        v-for="user in usersList"
        :key="user.id"
      >
        <q-item-section>
          <span @click="redirectTodo(user.id)" class="text-bold text-center">{{
            user.name
          }}</span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      usersList: []
    };
  },
  created() {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:3000/users");
      if (res.data) {
        this.usersList = res.data;
      }
    };
    getUsers();
  },
  methods: {
    redirectTodo(userid) {
      this.usersList.map(d => {
        if (d.id == userid) {
          this.$router.push({ path: "/usertodos/" + d.id, params: { d } });
        }
      });
    }
  }
};
</script>