<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <div class="d-flex flex-row-reverse">
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ on }">
              <v-btn color="orange mb-2" v-on="on">New Project</v-btn>
            </template> 
            <v-card>
              <v-form ref="form" lazy-validation v-on:submit.prevent="CreateNewProject()">
                <v-card-title class="headline" primary-title>New Project</v-card-title>

                <v-card-text>
                  Welcome to the prototype version of our
                  feasibility app that will help you to though
                  steps and tips to create complete
                  feasibility study for your next project and
                  to start click the button down below 👇
                  <v-text-field
                    v-model="projectName"
                    color="orange"
                    label="Project Name"
                    :rules="[
                                            v =>
                                                !!v ||
                                                'Enter project name first'
                                        ]"
                  ></v-text-field>
                  <v-text-field v-model="projectDesc" color="orange" label="Project Description"></v-text-field>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog = false">Cancle</v-btn>
                  <v-btn color="orange" text type="submit">Create</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </div>

        <v-card tile v-if="!haveProjects">
          <v-card-title>PROJECTS</v-card-title>
          <v-card-text class="text-center">
            <img src="~assets/inbox.svg" width="100" class="mb-3" />
            <p>You don't have any project yet!</p>
          </v-card-text>
        </v-card>

        <v-card v-else tile>
          <v-card-title>PROJECTS</v-card-title>
          <v-list two-line>
            <template v-for="(project,index) in projects">
              <v-list-item :key="project.id" nuxt :to="`/project/${project.id}/incomeProgram`">
                <v-list-item-content>
                  <v-list-item-title>{{project.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{project.desc}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index < projects.length -1" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "~/db/index";

export default {
  data() {
    return {
      projectName: "",
      projectDesc: "",
      dialog: false,
      projects: []
    };
  },
  components: {},
  computed: {
    user() {
      return this.$store.state.user.userInfo;
    },
    haveProjects() {
      return this.projects.length !== 0;
    }
  },
  async created() {
    this.projects = await this.$store.dispatch("project/getAll");
    this.projects.sort(this.compareProjects).reverse();
  },
  methods: {
    async CreateNewProject() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const response = await this.$store.dispatch("project/new", {
        name: this.projectName,
        desc: this.projectDesc ? this.projectDesc : "No description!",
        date: Date.now()
      });

      response
        ? this.$router.push({
            path: `project/${response}/incomeProgram`
          })
        : "";
    },
    compareProjects(pA, pB) {
      if (pA.date < pB.date) {
        return -1;
      }

      if (pA.date > pB.date) {
        return 1;
      }

      return 0;
    }
  }
};
</script>
