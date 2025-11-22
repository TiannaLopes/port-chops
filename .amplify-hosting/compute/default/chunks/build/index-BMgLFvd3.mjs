import { _ as __nuxt_component_0 } from './nuxt-link-805bsWK4.mjs';
import { _ as __nuxt_component_0$1 } from './RecipeCard-DoX61Jaw.mjs';
import { withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeoMeta } from './v3-m3BwmVls.mjs';
import '../../index.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Port-Chops - Learn European Portuguese Free",
      ogTitle: "Learn European Portuguese - Port-Chops",
      description: "Free Portuguese learning platform. Master European Portuguese through authentic recipes, cultural insights, and interactive lessons. Track your progress and achieve fluency.",
      ogDescription: "Learn Portuguese free with interactive lessons, recipes, and cultural immersion.",
      ogImage: "/og-image.jpg",
      twitterCard: "summary_large_image"
    });
    const learningSteps = [
      {
        title: "Create Account",
        description: "Sign up free in 30 seconds. No credit card required. Start learning immediately."
      },
      {
        title: "Follow Lessons",
        description: "Work through structured lessons at your own pace. From basics to advanced Portuguese."
      },
      {
        title: "Track Progress",
        description: "See your improvement over time. Earn points, complete challenges, and stay motivated."
      }
    ];
    const featuredRecipes = [
      {
        id: 1,
        title: "Bacalhau \xE0 Br\xE1s",
        portugueseName: "Salt Cod with Potatoes & Eggs",
        description: "A classic Lisbon dish combining shredded cod, crispy potatoes, and eggs. Learn essential Portuguese cooking vocabulary.",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
        difficulty: "Medium",
        cookTime: "45 min",
        servings: "4 people",
        slug: "bacalhau-a-bras"
      },
      {
        id: 2,
        title: "Past\xE9is de Nata",
        portugueseName: "Portuguese Custard Tarts",
        description: "Iconic Portuguese pastries with flaky crust and creamy custard. A sweet way to practice your Portuguese.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
        difficulty: "Hard",
        cookTime: "1.5 hours",
        servings: "12 tarts",
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
        slug: "caldo-verde"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RecipeCard = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative bg-gradient-to-br from-breezeway-600 via-breezeway-700 to-breezeway-900 text-white py-32 overflow-hidden"><div class="absolute inset-0 opacity-10"><div class="absolute top-20 left-10 w-72 h-72 bg-butter rounded-full blur-3xl"></div><div class="absolute bottom-20 right-10 w-96 h-96 bg-garden rounded-full blur-3xl"></div></div><div class="container-custom relative z-10"><div class="max-w-4xl mx-auto text-center"><div class="inline-block px-4 py-2 bg-breezeway-500 bg-opacity-50 rounded-full mb-6"><span class="text-sm font-semibold tracking-wide">Start Learning Today</span></div><h1 class="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight"> Master European Portuguese </h1><p class="text-xl md:text-2xl text-breezeway-100 mb-10 leading-relaxed"> Learn Portuguese through authentic recipes, cultural immersion, and structured lessons. Track your progress and achieve fluency. </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "btn-primary text-lg px-10 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create Free Account `);
          } else {
            return [
              createTextVNode(" Create Free Account ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "btn-secondary text-lg px-10 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign In `);
          } else {
            return [
              createTextVNode(" Sign In ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-breezeway-200 mt-6 text-sm"> No credit card required. Start learning in 30 seconds. </p></div></div><div class="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full"><path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f2f5f4"></path></svg></div></section><section class="py-12 bg-seasalt-50"><div class="container-custom"><div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"><div><div class="text-4xl font-bold text-breezeway-700 mb-2">50+</div><div class="text-gray-600">Interactive Lessons</div></div><div><div class="text-4xl font-bold text-breezeway-700 mb-2">200+</div><div class="text-gray-600">Vocabulary Words</div></div><div><div class="text-4xl font-bold text-breezeway-700 mb-2">15+</div><div class="text-gray-600">Authentic Recipes</div></div><div><div class="text-4xl font-bold text-breezeway-700 mb-2">100%</div><div class="text-gray-600">Free Forever</div></div></div></div></section><section class="py-20 bg-white"><div class="container-custom"><div class="text-center mb-16"><h2 class="text-5xl font-display font-bold text-gray-900 mb-4"> Your Learning Journey </h2><p class="text-xl text-gray-600 max-w-2xl mx-auto"> Follow our proven path from beginner to confident Portuguese speaker </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-12"><!--[-->`);
      ssrRenderList(learningSteps, (step, index) => {
        _push(`<div class="text-center"><div class="w-20 h-20 bg-gradient-to-br from-breezeway-500 to-breezeway-700 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"><span class="text-3xl font-bold text-white">${ssrInterpolate(index + 1)}</span></div><h3 class="text-2xl font-display font-bold mb-3 text-breezeway-800">${ssrInterpolate(step.title)}</h3><p class="text-gray-600 leading-relaxed">${ssrInterpolate(step.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 bg-seasalt-50"><div class="container-custom"><div class="text-center mb-12"><h2 class="text-4xl font-display font-bold text-gray-900 mb-4"> Learn Through Portuguese Cuisine </h2><p class="text-xl text-gray-600 max-w-2xl mx-auto"> Master vocabulary and cultural insights while cooking authentic dishes </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(featuredRecipes, (recipe) => {
        _push(ssrRenderComponent(_component_RecipeCard, {
          key: recipe.id,
          recipe
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="text-center mt-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Recipes `);
          } else {
            return [
              createTextVNode(" View All Recipes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-24 bg-gradient-to-br from-breezeway-600 via-breezeway-700 to-breezeway-900 text-white relative overflow-hidden"><div class="absolute inset-0 opacity-10"><div class="absolute top-10 right-10 w-96 h-96 bg-butter rounded-full blur-3xl"></div></div><div class="container-custom text-center relative z-10"><h2 class="text-5xl font-display font-bold mb-6"> Start Your Free Learning Journey </h2><p class="text-xl text-breezeway-100 mb-10 max-w-2xl mx-auto leading-relaxed"> Join thousands of learners mastering European Portuguese. Create your free account and start tracking your progress today. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "btn-primary text-lg px-12 py-4 inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get Started Free `);
          } else {
            return [
              createTextVNode(" Get Started Free ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-breezeway-200 mt-6"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-butter-300 hover:text-butter-200 font-semibold underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in here `);
          } else {
            return [
              createTextVNode(" Sign in here ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BMgLFvd3.mjs.map
