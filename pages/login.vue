<template>
    <v-container class="login-background" style="height:100%;">
        <v-row justify="center" align="center" style="height:100%">
            <v-col md="6" cols="9">
                <v-card shaped class="pa-3">
                    <v-card-title>
                        <div>
                            <h1 class="display-3">Hello There!</h1>
                            <p class="body-1 mx-1">
                                Do You Want Set Your Ass On Fire Question Mark?!
                                <br />login in now Bitch
                            </p>
                        </div>
                    </v-card-title>
                    <v-card-text class="px-5">
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                color="orange"
                                label="Email"
                                type="email"
                                :rules="[v => !!v || '* required']"
                                v-model="loginData.email"
                            ></v-text-field>
                            <v-text-field
                                color="orange"
                                label="Password"
                                type="password"
                                :rules="[v => !!v || '* required']"
                                v-model="loginData.password"
                            ></v-text-field>
                            <v-row justify="end" class="mx-2 mt-5">
                                <div>
                                    <a class="grey--text mx-2"
                                        >I`m an idiot! I forgot my password</a
                                    >
                                    <v-btn
                                        @click="login()"
                                        elevation="5"
                                        rounded
                                        color="orange"
                                        >login</v-btn
                                    >
                                </div>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    layout: null,
    data() {
        return {
            loginData: {}
        };
    },
    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                const response = await this.$store.dispatch(
                    "user/login",
                    this.loginData
                );

                response ? this.$router.push({ path: "/" }) : "";
            }
        }
    }
};
</script>

<style>
.login-background {
    background-image: url("~assets/login-man.png");
    background-position: center center;
    background-size: cover;
}
</style>
