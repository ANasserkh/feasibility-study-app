<template>
  <v-container>
    <v-row justify="center">
      <v-col md="8">
        <v-card>
          <v-card-text>
            <span class="title">
              <b left class="headline">✋</b>Hello whatever your name is
            </span> and welcome to the prototype
            version of our feasibility app that
            will help you to though steps and tips
            to create complete feasibility study for your
            next project and to start click the button down below 👇
            <v-row justify="center">
              <v-col cols="8">
                <v-form ref="form" lazy-validation v-on:submit.prevent="CreateNewProject()">
                  <v-text-field
                    v-model="projectName"
                    color="orange"
                    label="Project Name"
                    :rules="[v=>!!v || 'Enter project name first' ]"
                
                  ></v-text-field>
                  <v-btn  type="submit" color="orange">🙌 create new feasibility study</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {} from "vuex";
export default {
  data() {
    return {
      projectName: ""
    };
  },
  components: {},
  computed: {
    user() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    async CreateNewProject() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const response = await this.$store.dispatch(
        "project/new",
        this.projectName
      );
      response ? this.$router.push({ path: `project/${response.id}` }) : "";
    }
  }
};
</script>
