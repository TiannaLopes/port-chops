<template>
  <div class="card h-100">
    <img :src="recipe.image" class="card-img-top" alt="Recipe Image">
    <div class="card-body">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">{{ recipe.description }}</p>
      <a href="#" class="btn btn-primary">View Recipe</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 200px;
}
</style>
