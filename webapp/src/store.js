import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "project-template",
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    todos: [
      {
        id: 1,
        done: false,
        title: "Test Todo1"
      },
      {
        id: 2,
        done: false,
        title: "Test Todo2"
      }
    ]
  },
  mutations: {
    addToDo(state, todo) {
      state.todos = [...state.todos, {...todo, done: false, id: state.todos.length+1}];
    },

    removeToDo(state, todo) {
      var index = 0 
      while (index < state.todos.length) {
        if(state.todos[index].id == todo.id) {
            break
        }
        index = index + 1
      }
      state.todos.splice(index, 1)
 

    },

    tickToDo(state, todo) {
      // debugger;
      var index = 0 
      while (index < state.todos.length) {
        if(state.todos[index].id == todo.id) {
            break
        }
        index = index + 1
      }
      debugger
      state.todos[index].done = !state.todos[index].done;
      state.todos[1].done = true
      



      
      // state.todos = state.todos.map((td) => {
      //   if (td.id == todo.id) {
      //     return {...td, done: !td.done}
      //   }
      //   return td;
      // })
    }
  },
  actions: {
    addToDo({ commit }, toDo) {
      // debugger;
      commit("addToDo", toDo);
    },

    removeToDo({ commit }, toDo) {
      debugger
      commit("removeToDo", toDo)
    },

    tickToDo({ commit }, toDo) {
      commit("tickToDo", toDo)
    }


  }
});
