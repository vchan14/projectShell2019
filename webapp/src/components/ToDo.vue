<template>
  <div class="todo">
    <b-checkbox v-model="todo.done" />
    <span class="todo-title">
      {{ todo.title }}
    </span>
    <button v-on:click="deleteToDo(todo)"> Delete </button>



  </div>
</template>

<script>
export default {
  name: "ToDo",
  props: {
    todo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    deleteToDo (todo) {
        debugger
        this.$store.dispatch('removeToDo', todo)    }
  }

};
</script>
