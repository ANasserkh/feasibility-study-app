<template>
	<v-app dark>
		<v-app-bar color="accent-4" dark app>
			<v-toolbar-title>Feasibility</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn text color="orange" to="/">Projects</v-btn>
			<v-btn icon>😘</v-btn>
		</v-app-bar>
		<v-content>
			<nuxt />
		</v-content>
	</v-app>
</template>

<script>
export default {};
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