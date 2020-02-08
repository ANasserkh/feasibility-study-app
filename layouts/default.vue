<template>
  <v-app dark>
    <v-app-bar :collapse="collapse" color="accent-4" dark app>
      <v-app-bar-nav-icon @click="collapse = !collapse"></v-app-bar-nav-icon>

      <v-toolbar-title>Feasibility</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>😍</v-btn>
      <v-btn icon>😘</v-btn>
      <v-btn icon>🥰</v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <!-- <transition>
      <h1 @click="offset = !offset" :class="`display-4 emoji emoji-1 ${offset?'offset':''}`">😍</h1>
    </transition>
    <h1 class="display-3 emoji emoji-2">😍</h1>
    <h1 class="display-2 emoji emoji-3">😍</h1> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      collapse: true,
      offset: false
    };
  }
};
</script>

<style>
.emoji {
  position: fixed;
  transition: 1s all;
}
.offset {
  transform: translate(400px, -400px);
}
.emoji-1 {
  bottom: 0;
  left: 0;
}
.emoji-2 {
  bottom: 0;
  left: 50px;
}
.emoji-3 {
  bottom: 0;
  left: 100px;
}
</style>