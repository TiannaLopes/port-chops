import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import { ref, useSSRContext } from 'vue';
import { u as useSeoMeta } from './v3-DlNb13KX.mjs';
import './server.mjs';
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

const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Contact Us - Port-Chops Portuguese Learning",
      ogTitle: "Contact Port-Chops",
      description: "Get in touch with Port-Chops. Questions about Portuguese lessons, recipe suggestions, or feedback? We'd love to hear from you.",
      ogDescription: "Contact the Port-Chops team for questions and feedback.",
      ogImage: "/og-contact.jpg"
    });
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const isSubmitting = ref(false);
    const submitMessage = ref("");
    const submitSuccess = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20"><div class="container-custom"><h1 class="text-5xl font-display font-bold mb-4">Contact Us</h1><p class="text-xl text-breezeway-100 max-w-2xl"> Have questions, suggestions, or just want to say ol\xE1? We&#39;d love to hear from you! </p></div></section><section class="container-custom py-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12"><div><h2 class="text-3xl font-display font-bold mb-6">Send us a message</h2><form class="space-y-6"><div><label for="name" class="block text-sm font-medium text-gray-700 mb-2"> Name * </label><input id="name"${ssrRenderAttr("value", form.value.name)} type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition-all" placeholder="Your name"></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email * </label><input id="email"${ssrRenderAttr("value", form.value.email)} type="email" required class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all" placeholder="your.email@example.com"></div><div><label for="subject" class="block text-sm font-medium text-gray-700 mb-2"> Subject * </label><select id="subject" required class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "") : ssrLooseEqual(form.value.subject, "")) ? " selected" : ""}>Select a topic</option><option value="general"${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "general") : ssrLooseEqual(form.value.subject, "general")) ? " selected" : ""}>General Inquiry</option><option value="lesson"${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "lesson") : ssrLooseEqual(form.value.subject, "lesson")) ? " selected" : ""}>Lesson Question</option><option value="recipe"${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "recipe") : ssrLooseEqual(form.value.subject, "recipe")) ? " selected" : ""}>Recipe Suggestion</option><option value="technical"${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "technical") : ssrLooseEqual(form.value.subject, "technical")) ? " selected" : ""}>Technical Issue</option><option value="partnership"${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "partnership") : ssrLooseEqual(form.value.subject, "partnership")) ? " selected" : ""}>Partnership Opportunity</option><option value="feedback"${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "feedback") : ssrLooseEqual(form.value.subject, "feedback")) ? " selected" : ""}>Feedback</option></select></div><div><label for="message" class="block text-sm font-medium text-gray-700 mb-2"> Message * </label><textarea id="message" required rows="6" class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us more...">${ssrInterpolate(form.value.message)}</textarea></div><button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""}>${ssrInterpolate(isSubmitting.value ? "Sending..." : "Send Message")}</button>`);
      if (submitMessage.value) {
        _push(`<p class="${ssrRenderClass([
          "text-center font-semibold",
          submitSuccess.value ? "text-garden-700" : "text-brick-700"
        ])}">${ssrInterpolate(submitMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><div><div class="card p-8 mb-8"><h3 class="text-2xl font-display font-bold mb-6">Get in Touch</h3><div class="space-y-6"><div class="flex items-start gap-4"><div class="w-10 h-10 bg-gradient-to-br from-breezeway-500 to-breezeway-700 rounded-lg flex-shrink-0"></div><div><h4 class="font-semibold mb-1">Email</h4><a href="mailto:hello@port-chops.com" class="text-breezeway-600 hover:text-breezeway-700 transition-colors"> hello@port-chops.com </a></div></div><div class="flex items-start gap-4"><div class="w-10 h-10 bg-gradient-to-br from-butter-400 to-cottage rounded-lg flex-shrink-0"></div><div><h4 class="font-semibold mb-1">Social Media</h4><div class="space-x-3"><a href="#" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">Instagram</a><a href="#" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">YouTube</a><a href="#" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">Facebook</a></div></div></div><div class="flex items-start gap-4"><div class="w-10 h-10 bg-gradient-to-br from-garden to-butter-400 rounded-lg flex-shrink-0"></div><div><h4 class="font-semibold mb-1">Response Time</h4><p class="text-gray-600">We typically respond within 24-48 hours</p></div></div></div></div><div class="card p-8"><h3 class="text-2xl font-display font-bold mb-6">Quick FAQs</h3><div class="space-y-4"><div><h4 class="font-semibold mb-2">Is Port-Chops free?</h4><p class="text-gray-600 text-sm"> Yes! All our lessons, recipes, and resources are completely free to access. </p></div><div><h4 class="font-semibold mb-2">Do you offer one-on-one tutoring?</h4><p class="text-gray-600 text-sm"> We focus on self-study resources, but we can recommend qualified tutors. Contact us for details. </p></div><div><h4 class="font-semibold mb-2">Can I contribute content?</h4><p class="text-gray-600 text-sm"> We love community contributions! Send us your ideas for recipes, cultural notes, or resources. </p></div><div><h4 class="font-semibold mb-2">Is this European or Brazilian Portuguese?</h4><p class="text-gray-600 text-sm"> We focus on European Portuguese (Portugal), though we occasionally note differences with Brazilian Portuguese. </p></div></div></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-w98auObr.mjs.map
