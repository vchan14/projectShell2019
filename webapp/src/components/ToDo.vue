<template>
 <!-- v-model="todo.done"  -->
  <div class="todo">
    <input type="checkbox" @change="checkToDo(todo)" />
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
        this.$store.dispatch('removeToDo', todo)    
    },

    checkToDo (todo) {
        this.$store.dispatch('tickToDo', todo)
    }
  
  }

};
</script>
