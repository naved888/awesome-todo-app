<template>
  <div class="q-pa-md q-pt-xl q-gutter-md">
    <span class="label bg-primary q-pa-sm text-white"
      >User id : {{ this.userid }}</span
    >
    <div class="row">
      <q-input v-model="newTodo" class="col-11" label="Add Todo" />
      <q-btn
        round
        color="primary"
        class="col-1"
        @click="addTodo()"
        icon="add"
      />
    </div>
    <q-list bordered separator>
      <q-item
        clickable
        class=""
        v-ripple
        v-for="todo in todos"
        :key="todo.id"
        :active="active"
      >
        <q-item-section class="col-1">
          <q-checkbox v-model="todo.checked" color="cyan"></q-checkbox>
        </q-item-section>
        <q-item-section class="col-10">
          <p
            class="q-pb-xs q-pt-md text-weight-bold text-h6"
            @click="changeChecked(todo.checked, todo.id, todo.userId)"
          >
            {{ todo.todo_topic }}
          </p>
        </q-item-section>

        <q-item-section
          class="col-1"
          avatar
          clickable
          v-ripple
          active-class="my-menu-link"
        >
          <q-icon @click="deleteTodo(todo.id)" name="delete" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "usertodos",
  data() {
    return {
      active: true,
      todos: [],
      todo: [],
      newTodo: "",
      userid: this.$route.params.id,
      id: ""
    };
  },
  async created() {
    const res = await axios.get(
      "http://localhost:3000/todos/?userId=" + this.userid
    );
    this.todos = res.data;
  },
  methods: {
    changeChecked(checkclick, id, userId) {
      checkclick = !checkclick;
      this.todos.map(d => {
        if (d.id == id) {
          d.checked = checkclick;
          this.todo = d;
        }
      });
      const putData = async () => {
        const res = await axios.patch(
          "http://localhost:3000/todos/" + id,
          this.todo
        );
      };
      putData();
    },
    addTodo() {
      if (this.newTodo !== "") {
        const postData = async () => {
          const res = await axios.post(
            "http://localhost:3000/todos/" + this.id,
            {
              userId: parseInt(this.userid),
              todo_topic: this.newTodo,
              checked: false
            }
          );
          if (res.data) {
            this.todos.push(res.data);
          }
          this.newTodo = "";
        };
        postData();
      }
    },
    async deleteTodo(id) {
      const res = await axios.delete(`http://localhost:3000/todos/${id}`);
      if (res.data) {
        this.todos = this.todos.filter(x => {
          if (x.id != id) {
            return x;
          }
        });
      }
    }
  }
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>