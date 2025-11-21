import { _ as __nuxt_component_0 } from './nuxt-link-DATV2KkI.mjs';
import { ref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeoMeta } from './v3-DlNb13KX.mjs';
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
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Sign Up - Port-Chops",
      description: "Create a free Port-Chops account and start learning Portuguese today.",
      robots: "noindex, nofollow"
    });
    const form = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false
    });
    const isLoading = ref(false);
    const error = ref("");
    const success = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-seasalt-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full"><div class="text-center mb-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-4xl font-display font-bold text-breezeway-700"${_scopeId}>Port-Chops</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-4xl font-display font-bold text-breezeway-700" }, "Port-Chops")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="mt-2 text-gray-600">Start your Portuguese learning journey</p></div><div class="card p-8"><h2 class="text-2xl font-bold text-center mb-6 text-breezeway-800">Create Your Account</h2><form class="space-y-6"><div><label for="name" class="block text-sm font-semibold text-gray-700 mb-2"> Full Name </label><input id="name"${ssrRenderAttr("value", form.value.name)} type="text" required autocomplete="name" class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all" placeholder="Jo\xE3o Silva"></div><div><label for="email" class="block text-sm font-semibold text-gray-700 mb-2"> Email Address </label><input id="email"${ssrRenderAttr("value", form.value.email)} type="email" required autocomplete="email" class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all" placeholder="you@example.com"></div><div><label for="password" class="block text-sm font-semibold text-gray-700 mb-2"> Password </label><input id="password"${ssrRenderAttr("value", form.value.password)} type="password" required autocomplete="new-password" class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"><p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p></div><div><label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2"> Confirm Password </label><input id="confirmPassword"${ssrRenderAttr("value", form.value.confirmPassword)} type="password" required autocomplete="new-password" class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"></div><div><label class="flex items-start"><input${ssrIncludeBooleanAttr(Array.isArray(form.value.agreedToTerms) ? ssrLooseContain(form.value.agreedToTerms, null) : form.value.agreedToTerms) ? " checked" : ""} type="checkbox" required class="w-4 h-4 text-breezeway-600 border-gray-300 rounded focus:ring-breezeway-500 mt-1"><span class="ml-2 text-sm text-gray-600"> I agree to the `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "text-breezeway-600 hover:text-breezeway-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Service`);
          } else {
            return [
              createTextVNode("Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` and `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "text-breezeway-600 hover:text-breezeway-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></label></div>`);
      if (error.value) {
        _push(`<div class="bg-brick-50 border border-brick-200 text-brick-700 px-4 py-3 rounded-lg text-sm">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (success.value) {
        _push(`<div class="bg-garden-50 border border-garden-200 text-garden-700 px-4 py-3 rounded-lg text-sm">${ssrInterpolate(success.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="w-full btn-primary"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}>${ssrInterpolate(isLoading.value ? "Creating account..." : "Create Account")}</button></form><div class="mt-6"><div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-seasalt-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">Or sign up with</span></div></div><div class="mt-6 grid grid-cols-2 gap-3"><button type="button" class="w-full btn-secondary"> Google </button><button type="button" class="w-full btn-secondary"> Facebook </button></div></div><div class="mt-6 text-center"><p class="text-gray-600"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-breezeway-600 hover:text-breezeway-700 font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in `);
          } else {
            return [
              createTextVNode(" Sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="mt-6 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-600 hover:text-gray-800 text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Back to home `);
          } else {
            return [
              createTextVNode(" \u2190 Back to home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-C0zBey7-.mjs.map
