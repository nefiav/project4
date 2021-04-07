<template>
<div>
  <h1>Current Reviews</h1>
  <div class="home-item">
    <div class="featured">
      <div class='card-title'>Diversion Eatery</div>
      <div class='card-pic'><img src="diversion.jpg" /></div>
      <div class='short'>Diversion is a delightful restaurant. It is black-owned and has a great vibe.</div>
    </div>
    <div class="featured">
      <div class='card-title'>Padeli's</div>
      <div class='card-pic'><img src="padelis.jpg" /></div>
      <div class='short'>Padeli's is a soooo good. It will make you come back for more.</div>
    </div>
    <div class="featured">
      <div class='card-title'>Red Iguana</div>
      <div class='card-pic'><img src="red.jpg" /></div>
      <div class='short'>Red Iguana hits the spot and fills you up. Not fancy but will satisfy you.</div>
    </div>
    <div class="featured">
      <div class='card-title'>Hong Kong Tea House</div>
      <div class='card-pic'><img src="hongkong.jpg" /></div>
      <div class='short'>This place serves authentic Chinese food. They're the ones with the meats, not Arby's</div>
    </div>
    <div class="featured">
      <div class='card-title'>Crown Burgers</div>
      <div class='card-pic'><img src="crown.jpg" /></div>
      <div class='short'>These burgers will literally clog your arteries. I'm not kidding, the amount of bacon they put in these things is illegal.</div>
    </div>
    <div class="featured">
      <div class='card-title'>Central Standard</div>
      <div class='card-pic'><img src="central.jpg" /></div>
      <div class='short'>Great vibe and the milkshakes will bring EVERYONE to the yard.</div>
    </div>
  </div>

    <h2>Restaurant review suggestions:</h2>
      <div v-for="project in projects" v-bind:key="project.id">
        <div class="suggest">
          <div class="problem">
            <p>"{{project.problem}}"</p>
            <p><i>{{project.name}}</i></p>
            <button @click="deleteItem(project)">Delete</button>

            <button @click="toggleEdit">Edit</button>

            <template v-if="creating">
              <form @submit.prevent="updateItem(project)">
                <input type="text" v-model="name" placeholder="Updated Name">
                <p></p>
                <textarea v-model="problem" placeholder="Updated Suggestion"></textarea>
                <br />
                <button type="submit">Submit Changes</button>
              </form>
            </template>
            <hr>
          </div>
        </div>
      </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      creating: false,
      projects: [],
      project: null,
      problem: '',
      name: '',
    }
  },
  created() {
    this.getProjects();
  },
  computed: {
    },
  methods: {
    toggleEdit() {
      this.creating = !this.creating;
    },
    async getProjects() {
      try {
        const response = await axios.get("/api/projects");
        this.projects = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(project) {
      try {
        await axios.delete(`/api/projects/${project._id}`);
        this.getProjects();
      } catch (error) {
        console.log(error);
      }
    },
    async updateItem(project) {
      try {
        axios.put(`/api/projects/${project._id}`, {
          name: this.name,
          problem: this.problem,
        });
        await this.getProjects();
        this.creating = false;
        window.location.reload(false);
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

form {
  padding: 20px 0;
  margin-top: 30px;
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

/* Form */
input[type=checkbox] {
  transform: scale(1.5);
  margin-right: 10px;
}

input[type=text] {
  font-size: 1em;
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
  margin-bottom: 20px;

}


@media only screen and (min-width: 961px) {


    .home-item {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
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
