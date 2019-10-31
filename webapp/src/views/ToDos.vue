<template>
  <div class="todos">

    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">Category 1</h5>
      </div>
    </div>


    <div class="columns is-centered">
      <div class="column is-half">
        <template v-for="todo in todos">
          <div v-if="todo.category == 1" :key="todo.id">
            <ToDo :key="todo.id" :todo="todo" />
          </div>
        </template>
      </div>
    </div>


    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">Category 2</h5>
      </div>
    </div>


    <div class="columns is-centered">
      <div class="column is-half">
        <template v-for="todo in todos">
          <div v-if="todo.category == 2" :key="todo.id">
            <ToDo :key="todo.id" :todo="todo" />
          </div>
        </template>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">Category 3</h5>
      </div>
    </div>


    <div class="columns is-centered">
      <div class="column is-half">
        <template v-for="todo in todos">
          <div v-if="todo.category == 3" :key="todo.id">
            <ToDo :key="todo.id" :todo="todo" />
          </div>
        </template>
      </div>
    </div>


    <section class="newTodo columns is-centered">
      <div class="column is-half">
        <h5 class="title is-5">New ToDo</h5>
        <form v-on:submit.prevent="onSubmit">
          <b-field label="Title">
            <b-input v-model="newTodo.title" />
          </b-field>
          <b-field label="Category">
            <b-select placeholder="Select a Category">
                <option value= "cat1" key="cat1">
                  cat 1
                </option>
                <option value= "cat2" key="cat2">
                  cat 2
                </option>
                <option value= "cat3" key="cat3">
                  cat 3
                </option>
            </b-select>
          </b-field>
          <b-field>
            <div class="control is-block">
              <input type="submit" class="button is-link" value="Submit" />
            </div>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import ToDo from "@/components/ToDo.vue";
export default {
  name: "ToDos",
  data: function() {
    return {
      newTodo: {
        title: null
      }
    };
  },
  computed: {
    todos() {
      debugger
      return this.$store.state.todos;
    }
  },
  components: {
    ToDo
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("addToDo", this.newTodo).then(() => {
        this.newTodo.title = null;
      });
    }
  },
  mounted: function() {
    this.$store.dispatch("loadToDos").catch(() => {
      // if we are not logged in redirect home
      this.$router.push("/");
    })
  }
};
</script>
<style lang="scss" scoped></style>
