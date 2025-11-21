import { _ as __nuxt_component_0 } from "./RecipeCard-SnMQ5inr.js";
import { ref, computed, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as useSeoMeta } from "./v3-DlNb13KX.js";
import "./nuxt-link-DATV2KkI.js";
import "/home/runner/work/port-chops/port-chops/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/runner/work/port-chops/port-chops/node_modules/hookable/dist/index.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/unctx/dist/index.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/runner/work/port-chops/port-chops/node_modules/radix3/dist/index.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/defu/dist/defu.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "recipes",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Portuguese Recipes - Learn Through Authentic Cuisine | Port-Chops",
      ogTitle: "Authentic Portuguese Recipes",
      description: "Explore traditional Portuguese recipes like Bacalhau, Pastéis de Nata, and Caldo Verde. Learn cooking vocabulary and cultural insights with each dish.",
      ogDescription: "Authentic Portuguese recipes with language learning integrated into every dish.",
      ogImage: "/og-recipes.jpg"
    });
    const selectedFilter = ref("All Recipes");
    const filters = ["All Recipes", "Appetizers", "Main Dishes", "Soups", "Desserts", "Beginner Friendly"];
    const recipes = [
      {
        id: 1,
        title: "Bacalhau à Brás",
        portugueseName: "Salt Cod with Potatoes & Eggs",
        description: "A classic Lisbon dish combining shredded cod, crispy potatoes, and eggs. Learn essential Portuguese cooking vocabulary.",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
        difficulty: "Medium",
        cookTime: "45 min",
        servings: "4 people",
        category: "Main Dishes",
        slug: "bacalhau-a-bras"
      },
      {
        id: 2,
        title: "Pastéis de Nata",
        portugueseName: "Portuguese Custard Tarts",
        description: "Iconic Portuguese pastries with flaky crust and creamy custard. A sweet way to practice your Portuguese.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
        difficulty: "Hard",
        cookTime: "1.5 hours",
        servings: "12 tarts",
        category: "Desserts",
        slug: "pasteis-de-nata"
      },
      {
        id: 3,
        title: "Caldo Verde",
        portugueseName: "Portuguese Green Soup",
        description: "Comforting kale and potato soup with chorizo. Perfect for learning food-related Portuguese phrases.",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
        difficulty: "Easy",
        cookTime: "30 min",
        servings: "6 people",
        category: "Soups",
        slug: "caldo-verde"
      },
      {
        id: 4,
        title: "Francesinha",
        portugueseName: "Porto-Style Sandwich",
        description: "A hearty Porto sandwich with meat, cheese, and beer sauce. Learn ordering phrases for restaurants.",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop",
        difficulty: "Medium",
        cookTime: "40 min",
        servings: "2 people",
        category: "Main Dishes",
        slug: "francesinha"
      },
      {
        id: 5,
        title: "Pão de Ló",
        portugueseName: "Portuguese Sponge Cake",
        description: "Light and airy sponge cake from Ovar. Practice baking vocabulary in Portuguese.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
        difficulty: "Medium",
        cookTime: "50 min",
        servings: "8 slices",
        category: "Desserts",
        slug: "pao-de-lo"
      },
      {
        id: 6,
        title: "Ameijoas à Bulhão Pato",
        portugueseName: "Clams in Garlic Sauce",
        description: "Simple but flavorful clam dish. Learn seafood vocabulary and ordering at Portuguese restaurants.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
        difficulty: "Easy",
        cookTime: "15 min",
        servings: "4 people",
        category: "Appetizers",
        slug: "ameijoas-bulhao-pato"
      }
    ];
    const filteredRecipes = computed(() => {
      if (selectedFilter.value === "All Recipes") {
        return recipes;
      }
      if (selectedFilter.value === "Beginner Friendly") {
        return recipes.filter((r) => r.difficulty === "Easy");
      }
      return recipes.filter((r) => r.category === selectedFilter.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecipeCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20"><div class="container-custom"><h1 class="text-5xl font-display font-bold mb-4">Portuguese Recipes</h1><p class="text-xl text-breezeway-100 max-w-2xl"> Discover authentic Portuguese cuisine while learning the language. Each recipe includes pronunciation guides, cultural notes, and essential vocabulary. </p></div></section><section class="container-custom py-8"><div class="flex flex-wrap gap-4"><!--[-->`);
      ssrRenderList(filters, (filter) => {
        _push(`<button class="${ssrRenderClass([
          "px-6 py-3 rounded-lg font-semibold transition-all duration-200",
          selectedFilter.value === filter ? "bg-breezeway-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-seasalt-100 shadow-sm"
        ])}">${ssrInterpolate(filter)}</button>`);
      });
      _push(`<!--]--></div></section><section class="container-custom pb-16"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(filteredRecipes.value, (recipe) => {
        _push(ssrRenderComponent(_component_RecipeCard, {
          key: recipe.id,
          recipe
        }, null, _parent));
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=recipes-DPR7--Ji.js.map
