<template>
  <div id="app">
    <NavbarComponent />
    <div class="container">
      <RecipeList :recipes="recipes" />
    </div>
    <FooterComponent />

    <!-- Subscription Popup -->
    <div
      v-if="showPopup"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Subscribe for Recipes</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closePopup"></button>
          </div>
          <div class="modal-body">
            <p>Stay updated with the latest recipes. Enter your email below:</p>
            <input type="email" class="form-control" placeholder="Your email address" v-model="email" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closePopup">Close</button>
            <button type="button" class="btn btn-primary" @click="subscribe">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import RecipeList from './components/RecipeList.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent,
    RecipeList,
  },
  data() {
    return {
      recipes: [
        {
          id: 1,
          title: 'Cacio e Pepe',
          description: 'A classic Roman pasta with pecorino cheese and black pepper.',
          image: 'https://via.placeholder.com/300x200',
        },
        {
          id: 2,
          title: 'Spaghetti Squash',
          description: 'A healthy alternative to pasta with a fun texture.',
          image: 'https://via.placeholder.com/300x200',
        },
        {
          id: 3,
          title: 'Dumpling Soup',
          description: 'A comforting soup perfect for winter nights.',
          image: 'https://via.placeholder.com/300x200',
        },
      ],
      showPopup: true,
      email: '',
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
    subscribe() {
      if (this.email) {
        alert(`Thank you for subscribing with: ${this.email}`);
        this.email = '';
        this.closePopup();
      } else {
        alert('Please enter a valid email address.');
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
  margin: 0;
  font-family: Arial, sans-serif;
}
.modal-content {
  border-radius: 10px;
  overflow: hidden;
}
</style>