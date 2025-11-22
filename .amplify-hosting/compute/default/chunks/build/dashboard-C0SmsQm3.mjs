import { _ as __nuxt_component_0 } from './nuxt-link-805bsWK4.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Dashboard - Port-Chops",
      description: "Your Portuguese learning dashboard",
      robots: "noindex, nofollow"
    });
    const user = ref({
      name: "Jo\xE3o Silva",
      email: "joao@example.com",
      createdAt: "2024-01-15"
    });
    const userStats = ref({
      completedLessons: 12,
      totalPoints: 450,
      currentStreak: 7,
      vocabWords: 85
    });
    const currentLesson = ref({
      category: "Basics",
      title: "Greetings and Introductions",
      description: "Learn essential phrases for meeting people in Portuguese",
      progress: 65
    });
    const recentActivity = ref([
      {
        id: 1,
        title: "Completed: Basic Verbs",
        description: "Learned 15 essential Portuguese verbs",
        time: "2 hours ago",
        points: 50,
        color: "bg-breezeway-500"
      },
      {
        id: 2,
        title: "Recipe Added",
        description: "Saved Past\xE9is de Nata to your favorites",
        time: "5 hours ago",
        points: 10,
        color: "bg-butter-500"
      },
      {
        id: 3,
        title: "Completed: Numbers",
        description: "Mastered counting from 1-100",
        time: "1 day ago",
        points: 40,
        color: "bg-garden-500"
      }
    ]);
    const learningPath = ref([
      { id: 1, level: 1, title: "Beginner", lessons: 10, completed: true, current: false },
      { id: 2, level: 2, title: "Elementary", lessons: 15, completed: false, current: true },
      { id: 3, level: 3, title: "Intermediate", lessons: 20, completed: false, current: false },
      { id: 4, level: 4, title: "Advanced", lessons: 25, completed: false, current: false }
    ]);
    const achievements = ref([
      { id: 1, title: "First Step", earned: true, color: "bg-breezeway-500" },
      { id: 2, title: "10 Lessons", earned: true, color: "bg-butter-500" },
      { id: 3, title: "Week Streak", earned: true, color: "bg-garden-500" },
      { id: 4, title: "100 Words", earned: false, color: "bg-brick-500" },
      { id: 5, title: "Recipe Pro", earned: false, color: "bg-cottage-500" },
      { id: 6, title: "Month Streak", earned: false, color: "bg-seasalt-500" }
    ]);
    const dailyGoal = ref({
      target: 3,
      completed: 2,
      progress: 67
    });
    const userName = computed(() => user.value.name);
    const userEmail = computed(() => user.value.email);
    const userInitials = computed(() => {
      const names = user.value.name.split(" ");
      return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
    });
    const memberSince = computed(() => {
      const date = new Date(user.value.createdAt);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    });
    const circumference = computed(() => 2 * Math.PI * 56);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-seasalt-50 py-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8"><h1 class="text-4xl font-display font-bold text-breezeway-800"> Welcome back, ${ssrInterpolate(userName.value)}! </h1><p class="mt-2 text-gray-600">Continue your Portuguese learning journey</p></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="card p-6 bg-gradient-to-br from-breezeway-500 to-breezeway-600 text-white"><div class="text-3xl font-bold">${ssrInterpolate(userStats.value.completedLessons)}</div><div class="text-breezeway-100 mt-1">Lessons Completed</div></div><div class="card p-6 bg-gradient-to-br from-butter-500 to-cottage-500 text-white"><div class="text-3xl font-bold">${ssrInterpolate(userStats.value.totalPoints)}</div><div class="text-butter-100 mt-1">Points Earned</div></div><div class="card p-6 bg-gradient-to-br from-garden-500 to-garden-600 text-white"><div class="text-3xl font-bold">${ssrInterpolate(userStats.value.currentStreak)}</div><div class="text-garden-100 mt-1">Day Streak</div></div><div class="card p-6 bg-gradient-to-br from-brick-500 to-brick-600 text-white"><div class="text-3xl font-bold">${ssrInterpolate(userStats.value.vocabWords)}</div><div class="text-brick-100 mt-1">Vocabulary Words</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="card p-6"><h2 class="text-2xl font-bold text-breezeway-800 mb-4">Continue Learning</h2>`);
      if (currentLesson.value) {
        _push(`<div class="bg-gradient-to-r from-breezeway-50 to-seasalt-50 p-6 rounded-lg border border-breezeway-200"><div class="flex items-start justify-between"><div class="flex-1"><div class="text-sm font-semibold text-breezeway-600 mb-2">${ssrInterpolate(currentLesson.value.category)}</div><h3 class="text-xl font-bold text-gray-900 mb-2">${ssrInterpolate(currentLesson.value.title)}</h3><p class="text-gray-600 mb-4">${ssrInterpolate(currentLesson.value.description)}</p><div class="mb-4"><div class="flex justify-between text-sm text-gray-600 mb-1"><span>Progress</span><span>${ssrInterpolate(currentLesson.value.progress)}%</span></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-breezeway-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: currentLesson.value.progress + "%" })}"></div></div></div></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/learn",
          class: "btn-primary inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue Lesson `);
            } else {
              return [
                createTextVNode(" Continue Lesson ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="text-center py-8"><p class="text-gray-600 mb-4">You haven&#39;t started any lessons yet!</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/learn",
          class: "btn-primary inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Browse Lessons `);
            } else {
              return [
                createTextVNode(" Browse Lessons ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="card p-6"><h2 class="text-2xl font-bold text-breezeway-800 mb-4">Recent Activity</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(recentActivity.value, (activity) => {
        _push(`<div class="flex items-start gap-4 pb-4 border-b border-seasalt-200 last:border-0"><div class="flex-1"><p class="font-semibold text-gray-900">${ssrInterpolate(activity.title)}</p><p class="text-sm text-gray-600">${ssrInterpolate(activity.description)}</p><p class="text-xs text-gray-500 mt-1">${ssrInterpolate(activity.time)}</p></div><div class="text-right"><div class="text-lg font-bold text-butter-600">+${ssrInterpolate(activity.points)}</div><div class="text-xs text-gray-500">points</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="card p-6"><h2 class="text-2xl font-bold text-breezeway-800 mb-4">Your Learning Path</h2><div class="space-y-3"><!--[-->`);
      ssrRenderList(learningPath.value, (level) => {
        _push(`<div class="flex items-center gap-4"><div class="${ssrRenderClass([level.completed ? "bg-garden-500" : level.current ? "bg-breezeway-600" : "bg-gray-300", "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"])}">${ssrInterpolate(level.level)}</div><div class="flex-1"><div class="flex items-center justify-between"><h3 class="font-semibold text-gray-900">${ssrInterpolate(level.title)}</h3><span class="${ssrRenderClass([level.completed ? "bg-garden-100 text-garden-700" : level.current ? "bg-breezeway-100 text-breezeway-700" : "bg-gray-100 text-gray-600", "text-xs font-semibold px-2 py-1 rounded"])}">${ssrInterpolate(level.completed ? "Completed" : level.current ? "In Progress" : "Locked")}</span></div><p class="text-sm text-gray-600">${ssrInterpolate(level.lessons)} lessons</p></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="space-y-6"><div class="card p-6"><h2 class="text-xl font-bold text-breezeway-800 mb-4">Quick Actions</h2><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/learn",
        class: "block w-full btn-primary text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Browse Lessons `);
          } else {
            return [
              createTextVNode(" Browse Lessons ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes",
        class: "block w-full btn-secondary text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explore Recipes `);
          } else {
            return [
              createTextVNode(" Explore Recipes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "block w-full btn-secondary text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Media Resources `);
          } else {
            return [
              createTextVNode(" Media Resources ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cultural",
        class: "block w-full btn-secondary text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cultural Tips `);
          } else {
            return [
              createTextVNode(" Cultural Tips ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="card p-6"><h2 class="text-xl font-bold text-breezeway-800 mb-4">Achievements</h2><div class="space-y-2"><!--[-->`);
      ssrRenderList(achievements.value, (achievement) => {
        _push(`<div class="${ssrRenderClass([achievement.earned ? "bg-breezeway-50" : "bg-gray-50", "flex items-center justify-between p-2 rounded-lg"])}"><p class="${ssrRenderClass([achievement.earned ? "text-breezeway-900" : "text-gray-400", "text-sm font-semibold"])}">${ssrInterpolate(achievement.title)}</p>`);
        if (achievement.earned) {
          _push(`<span class="text-xs bg-garden-500 text-white px-2 py-1 rounded font-semibold"> Earned </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="card p-6 bg-gradient-to-br from-butter-50 to-cottage-50"><h2 class="text-xl font-bold text-breezeway-800 mb-4">Daily Goal</h2><div class="text-center"><div class="relative w-32 h-32 mx-auto mb-4"><svg class="transform -rotate-90 w-32 h-32"><circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-200"></circle><circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="transparent"${ssrRenderAttr("stroke-dasharray", circumference.value)}${ssrRenderAttr("stroke-dashoffset", circumference.value - dailyGoal.value.progress / 100 * circumference.value)} class="text-breezeway-600 transition-all duration-300"></circle></svg><div class="absolute inset-0 flex items-center justify-center"><div class="text-center"><div class="text-3xl font-bold text-breezeway-800">${ssrInterpolate(dailyGoal.value.progress)}%</div><div class="text-xs text-gray-600">Complete</div></div></div></div><p class="text-sm text-gray-700 mb-2">${ssrInterpolate(dailyGoal.value.completed)} of ${ssrInterpolate(dailyGoal.value.target)} lessons today </p><p class="text-xs text-gray-600"> Keep going! You&#39;re almost there! </p></div></div><div class="card p-6"><h2 class="text-xl font-bold text-breezeway-800 mb-4">Profile</h2><div class="text-center"><div class="w-20 h-20 bg-breezeway-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold">${ssrInterpolate(userInitials.value)}</div><p class="font-semibold text-gray-900">${ssrInterpolate(userName.value)}</p><p class="text-sm text-gray-600">${ssrInterpolate(userEmail.value)}</p><p class="text-xs text-gray-500 mt-2">Member since ${ssrInterpolate(memberSince.value)}</p><div class="mt-4 space-y-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile",
        class: "block w-full btn-secondary text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Edit Profile `);
          } else {
            return [
              createTextVNode(" Edit Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="block w-full text-brick-600 hover:text-brick-700 font-semibold text-sm"> Sign Out </button></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-C0SmsQm3.mjs.map
