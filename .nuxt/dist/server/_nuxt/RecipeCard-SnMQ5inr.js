import { _ as __nuxt_component_0$1 } from "./nuxt-link-DATV2KkI.js";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {
  __name: "RecipeCard",
  __ssrInlineRender: true,
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card group cursor-pointer" }, _attrs))} data-v-c4167e18><div class="relative overflow-hidden h-48" data-v-c4167e18><img${ssrRenderAttr("src", __props.recipe.image)}${ssrRenderAttr("alt", __props.recipe.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-c4167e18>`);
      if (__props.recipe.difficulty) {
        _push(`<div class="absolute top-4 right-4" data-v-c4167e18><span class="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm" data-v-c4167e18>${ssrInterpolate(__props.recipe.difficulty)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-6" data-v-c4167e18><h3 class="text-xl font-display font-semibold text-breezeway-900 mb-2" data-v-c4167e18>${ssrInterpolate(__props.recipe.title)}</h3>`);
      if (__props.recipe.portugueseName) {
        _push(`<p class="text-breezeway-600 italic mb-2 font-medium" data-v-c4167e18>${ssrInterpolate(__props.recipe.portugueseName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-gray-600 mb-4 line-clamp-2" data-v-c4167e18>${ssrInterpolate(__props.recipe.description)}</p>`);
      if (__props.recipe.cookTime || __props.recipe.servings) {
        _push(`<div class="flex items-center gap-4 text-sm text-gray-600 mb-4 font-medium" data-v-c4167e18>`);
        if (__props.recipe.cookTime) {
          _push(`<span class="flex items-center gap-2" data-v-c4167e18><span class="text-breezeway-600" data-v-c4167e18>Time:</span> ${ssrInterpolate(__props.recipe.cookTime)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.recipe.servings) {
          _push(`<span class="flex items-center gap-2" data-v-c4167e18><span class="text-breezeway-600" data-v-c4167e18>Serves:</span> ${ssrInterpolate(__props.recipe.servings)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/recipes/${__props.recipe.slug || __props.recipe.id}`,
        class: "btn-primary inline-block text-center w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Recipe `);
          } else {
            return [
              createTextVNode(" View Recipe ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecipeCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4167e18"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=RecipeCard-SnMQ5inr.js.map
