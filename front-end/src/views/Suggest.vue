<template>
<div>
<div>
  <h1>Suggest a Restaurant for Review</h1>
  <h3>Tell us your favorite spots and why you love them!</h3>
  <!--<form v-if="creating" @submit.prevent="addSuggest">
    <input v-model="name" placeholder="Name">
    <p></p>
    <textarea v-model="problem"></textarea>
    <br />
    <button type="submit">Submit</button>
  </form>-->
  <form @submit.prevent="addProject" v-if="creating">
      <input type="text" v-model="name" placeholder="Name">
      <p></p>
      <textarea v-model="problem" placeholder="Suggestion"></textarea>
      <br />
      <button type="submit">Submit</button>
  </form>
  <div v-else>
    <p>Thank you for suggesting a restaurant, keep an eye out on our website to see if we choose your suggestion!</p>
    <p><a @click="toggleForm" href="#">Submit another suggestion</a></p>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'suggest',
  data() {
    return {
      creating: true,
      projects: [],
      project: null,
      items: [],
      text: '',
      show: 'all',
      problem: '',
      name: '',
    }
  },
  created() {
    this.getProjects();
  },
  computed: {
    activeItems() {
      return this.items.filter(item => {
        return !item.completed;
      });
    },
  },
  methods: {
  toggleForm() {
    this.creating = !this.creating;
  },
    async addProject() {
      try {
        await axios.post("/api/projects", {
          name: this.name,
          problem: this.problem,
        });
        await this.getProjects();
        this.toggleForm();
      } catch (error) {
        console.log(error);
      }
    },
    async getProjects() {
      try {
        const response = await axios.get("/api/projects");
        this.projects = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    }
}
</script>

<style scoped>
/* List */
ul {
  list-style: none;
}

li {
  background: #fff;
  width: 500px;
  min-height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  display: flex;
  align-items: center;
}

.delete {
  display: none;
  margin-left: auto;
}

li:hover .delete {
  display: block;
}

label {
  width: 400px;
}

.completed {
  text-decoration: line-through;
}

#projects {
  margin-bottom: 20px;
}



button {
  font-family: 'Arvo';
  font-size: 1em;
  border: none;
  background-color: #bbb;
  padding: 5px 10px;
}


button.selected {
  border: 2px solid #000;
}

.home-item{
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.featured {
  font-size: 15px;
  background-color: white;
  text-align: center;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 5px;
}


@media only screen and (min-width: 961px) {


    .home-item {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
    }

    .contact-item {
      flex-direction: row;
      justify-content: space-between;
    }

    .featured, .pick, .contact {
      width: 300px;
    }

    .introduce, .pic {
      padding: 10px;
      width: 300px;
      height: 100%;
    }

  }

</style>
