<template>
  <div class="container my-5">
    <div class="row g-4">
      <div class="col-md-4" v-for="recipe in recipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
  name: 'RecipeList',
  components: {
    RecipeCard,
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.g-4 {
  gap: 1.5rem;
}
</style>
