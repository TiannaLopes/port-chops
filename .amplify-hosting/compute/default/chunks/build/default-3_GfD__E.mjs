import { _ as __nuxt_component_0 } from './nuxt-link-DATV2KkI.mjs';
import { mergeProps, ref, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderTeleport, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../../index.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$3 = {
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const navigation = [
      { name: "Home", href: "/" },
      { name: "Learn Portuguese", href: "/learn" },
      { name: "Recipes", href: "/recipes" },
      { name: "Media Resources", href: "/media" },
      { name: "Cultural Notes", href: "/cultural" },
      { name: "Contact Us", href: "/contact" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-white shadow-sm sticky top-0 z-50" }, _attrs))}><div class="container-custom"><div class="flex items-center justify-between h-16">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-2xl font-display font-bold text-breezeway-700"${_scopeId}>Port-Chops</span>`);
          } else {
            return [
              createVNode("span", { class: "text-2xl font-display font-bold text-breezeway-700" }, "Port-Chops")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center space-x-8"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.name,
          to: item.href,
          class: "text-gray-700 hover:text-breezeway-600 font-medium transition-colors",
          "active-class": "text-breezeway-600 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><button class="md:hidden p-2 rounded-lg hover:bg-seasalt-100 transition-colors" aria-label="Toggle menu"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
      }
      _push(`</svg></button></div><div class="md:hidden py-4 border-t border-seasalt-200" style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.name,
          to: item.href,
          onClick: ($event) => mobileMenuOpen.value = false,
          class: "block py-2 text-gray-700 hover:text-breezeway-600 font-medium transition-colors",
          "active-class": "text-breezeway-600 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></nav>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-breezeway-900 text-white mt-16" }, _attrs))}><div class="container-custom py-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div class="col-span-1 md:col-span-2"><h3 class="text-2xl font-display font-bold mb-4">Port-Chops</h3><p class="text-breezeway-200 mb-4"> Learn European Portuguese through authentic recipes, cultural insights, and immersive media resources. Your journey to fluency starts here. </p></div><div><h4 class="font-semibold mb-4">Quick Links</h4><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/learn",
        class: "text-breezeway-200 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`&gt; Lessons `);
          } else {
            return [
              createTextVNode("> Lessons ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes",
        class: "text-breezeway-200 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Recipes `);
          } else {
            return [
              createTextVNode(" Recipes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "text-breezeway-200 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Media `);
          } else {
            return [
              createTextVNode(" Media ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cultural",
        class: "text-breezeway-200 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Culture `);
          } else {
            return [
              createTextVNode(" Culture ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="font-semibold mb-4">Connect</h4><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-breezeway-200 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact Us `);
          } else {
            return [
              createTextVNode(" Contact Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="#newsletter" class="text-breezeway-200 hover:text-white transition-colors"> Newsletter </a></li></ul></div></div><div class="border-t border-breezeway-800 mt-8 pt-8 text-center text-breezeway-300"><p>\xA9 ${ssrInterpolate(unref(currentYear))} Port-Chops. All rights reserved.</p></div></div></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "NewsletterPopup",
  __ssrInlineRender: true,
  setup(__props) {
    const showPopup = ref(false);
    const dismissed = ref(false);
    const email = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (showPopup.value && !dismissed.value) {
          _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-960f8b76><div class="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl" data-v-960f8b76><button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close" data-v-960f8b76><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-960f8b76><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-960f8b76></path></svg></button><div class="text-center" data-v-960f8b76><div class="w-20 h-20 bg-gradient-to-br from-breezeway-500 to-breezeway-700 rounded-full mx-auto mb-6 flex items-center justify-center" data-v-960f8b76><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-960f8b76><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-960f8b76></path></svg></div><h3 class="text-2xl font-display font-bold text-gray-900 mb-2" data-v-960f8b76> Join Our Community </h3><p class="text-gray-600 mb-6" data-v-960f8b76> Get weekly Portuguese lessons, recipes, and cultural tips delivered to your inbox. </p><form class="space-y-4" data-v-960f8b76><input${ssrRenderAttr("value", email.value)} type="email" placeholder="Your email address" required class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all" data-v-960f8b76><button type="submit" class="w-full btn-primary" data-v-960f8b76> Subscribe Now </button></form><p class="text-sm text-gray-500 mt-4" data-v-960f8b76> No spam. Unsubscribe anytime. </p></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NewsletterPopup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-960f8b76"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = _sfc_main$3;
      const _component_Footer = _sfc_main$2;
      const _component_NewsletterPopup = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NavBar, null, null, _parent));
      _push(`<main class="flex-grow">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(ssrRenderComponent(_component_NewsletterPopup, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-3_GfD__E.mjs.map
