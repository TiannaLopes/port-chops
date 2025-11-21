import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { ref, computed, useSSRContext } from "vue";
import { a as useSeoMeta } from "./v3-DlNb13KX.js";
import "/home/runner/work/port-chops/port-chops/node_modules/@unhead/vue/dist/index.mjs";
import "../server.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/runner/work/port-chops/port-chops/node_modules/hookable/dist/index.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/unctx/dist/index.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/runner/work/port-chops/port-chops/node_modules/radix3/dist/index.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/defu/dist/defu.mjs";
import "/home/runner/work/port-chops/port-chops/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "media",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Portuguese Media Resources - TV, Books, Podcasts | Port-Chops",
      ogTitle: "Portuguese Media Resources",
      description: "Free Portuguese TV shows, movies, podcasts, YouTube channels, and books. Immerse yourself in European Portuguese with curated content for all levels.",
      ogDescription: "Curated Portuguese media resources for language learners.",
      ogImage: "/og-media.jpg"
    });
    const activeTab = ref("All");
    const tabs = ["All", "TV & Movies", "Podcasts", "YouTube", "Books", "Music"];
    const resources = [
      // TV & Movies
      {
        category: "TV & Movies",
        title: "RTP Play",
        description: "Free streaming service with Portuguese TV shows, news, and documentaries. Great for authentic listening practice.",
        level: "Intermediate",
        tags: ["Free", "Subtitles Available", "Native Content"],
        link: "https://www.rtp.pt/play/",
        linkText: "Watch Now"
      },
      {
        category: "TV & Movies",
        title: "Glória (Netflix)",
        description: "Portuguese spy thriller set during the Cold War. Perfect for intermediate learners with English subtitles available.",
        level: "Intermediate",
        tags: ["Netflix", "Drama", "Historical"],
        link: "https://www.netflix.com/",
        linkText: "View on Netflix"
      },
      {
        category: "TV & Movies",
        title: "3%",
        description: "Brazilian Portuguese sci-fi series. While not European Portuguese, great for comparing dialects.",
        level: "Intermediate",
        tags: ["Netflix", "Sci-Fi", "Brazilian"],
        link: "https://www.netflix.com/",
        linkText: "View on Netflix"
      },
      // Podcasts
      {
        category: "Podcasts",
        title: "Portuguese Lab",
        description: "Podcast specifically for Portuguese learners with slow, clear speech and transcripts.",
        level: "Beginner",
        tags: ["Educational", "Transcripts", "Slow Speed"],
        link: "https://www.portugueselab.com/",
        linkText: "Listen Now"
      },
      {
        category: "Podcasts",
        title: "Fala Português",
        description: "Intermediate-level conversations about Portuguese culture, history, and daily life.",
        level: "Intermediate",
        tags: ["Culture", "Conversation", "Weekly"],
        link: "https://www.falaportugues.com/",
        linkText: "Listen Now"
      },
      {
        category: "Podcasts",
        title: "Rádio Renascença",
        description: "Popular Portuguese radio station with news, talk shows, and entertainment.",
        level: "Advanced",
        tags: ["News", "Current Events", "Native Speed"],
        link: "https://rr.sapo.pt/",
        linkText: "Listen Live"
      },
      // YouTube
      {
        category: "YouTube",
        title: "Portuguese with Leo",
        description: "Comprehensive Portuguese lessons covering grammar, vocabulary, and pronunciation.",
        level: "Beginner",
        tags: ["Lessons", "Grammar", "Free"],
        link: "https://www.youtube.com/",
        linkText: "Watch Channel"
      },
      {
        category: "YouTube",
        title: "Talk the Streets",
        description: "Street interviews with native Portuguese speakers. Real conversations, authentic accents.",
        level: "Intermediate",
        tags: ["Street Interviews", "Authentic", "Subtitles"],
        link: "https://www.youtube.com/",
        linkText: "Watch Channel"
      },
      {
        category: "YouTube",
        title: "Portuguese with Carla",
        description: "Cultural insights, travel tips, and language lessons from a native Portuguese teacher.",
        level: "Beginner",
        tags: ["Culture", "Travel", "Lessons"],
        link: "https://www.youtube.com/",
        linkText: "Watch Channel"
      },
      // Books
      {
        category: "Books",
        title: "O Príncipe com Orelhas de Burro",
        description: "Portuguese fairy tale perfect for beginners. Simple language with cultural significance.",
        level: "Beginner",
        tags: ["Fairy Tale", "Children's Book", "Classic"],
        link: "#",
        linkText: "Find Book"
      },
      {
        category: "Books",
        title: "Memorial do Convento",
        description: "José Saramago's masterpiece about 18th century Portugal. For advanced learners.",
        level: "Advanced",
        tags: ["Literature", "Historical", "Nobel Prize"],
        link: "#",
        linkText: "Find Book"
      },
      {
        category: "Books",
        title: "Portuguese Short Stories for Beginners",
        description: "Collection of graded readers with vocabulary support and comprehension questions.",
        level: "Beginner",
        tags: ["Graded Reader", "Vocabulary", "Educational"],
        link: "#",
        linkText: "Find Book"
      },
      // Music
      {
        category: "Music",
        title: "Fado Playlist",
        description: "Traditional Portuguese music genre. Listen to Amália Rodrigues, Mariza, and modern fado artists.",
        level: "All Levels",
        tags: ["Traditional", "Cultural", "Spotify"],
        link: "https://open.spotify.com/",
        linkText: "Listen on Spotify"
      },
      {
        category: "Music",
        title: "Top 50 Portugal",
        description: "Current Portuguese pop hits. Learn modern slang and contemporary expressions.",
        level: "Intermediate",
        tags: ["Pop", "Modern", "Charts"],
        link: "https://open.spotify.com/",
        linkText: "Listen on Spotify"
      }
    ];
    const filteredResources = computed(() => {
      if (activeTab.value === "All") {
        return resources;
      }
      return resources.filter((r) => r.category === activeTab.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20"><div class="container-custom"><h1 class="text-5xl font-display font-bold mb-4">Media Resources</h1><p class="text-xl text-breezeway-100 max-w-2xl"> Immerse yourself in authentic Portuguese content. Curated TV shows, movies, podcasts, books, and YouTube channels for every learning level. </p></div></section><section class="container-custom py-8"><div class="flex flex-wrap gap-4"><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([
          "px-6 py-3 rounded-lg font-semibold transition-all duration-200",
          activeTab.value === tab ? "bg-breezeway-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-seasalt-100 shadow-sm"
        ])}">${ssrInterpolate(tab)}</button>`);
      });
      _push(`<!--]--></div></section><section class="container-custom pb-16"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(filteredResources.value, (resource) => {
        _push(`<div class="card p-6"><div class="flex items-start justify-between mb-4"><div class="w-12 h-12 bg-gradient-to-br from-butter-400 to-cottage rounded-xl flex-shrink-0"></div><span class="${ssrRenderClass([
          "px-3 py-1 rounded-full text-sm font-semibold",
          resource.level === "Beginner" ? "bg-garden-100 text-garden-800" : resource.level === "Intermediate" ? "bg-butter-100 text-butter-800" : "bg-brick-100 text-brick-800"
        ])}">${ssrInterpolate(resource.level)}</span></div><h3 class="text-xl font-display font-bold mb-3 text-breezeway-800">${ssrInterpolate(resource.title)}</h3><p class="text-gray-600 mb-4">${ssrInterpolate(resource.description)}</p><div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
        ssrRenderList(resource.tags, (tag) => {
          _push(`<span class="text-xs bg-seasalt-100 text-breezeway-700 px-3 py-1 rounded-full font-medium">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><a${ssrRenderAttr("href", resource.link)} target="_blank" rel="noopener noreferrer" class="btn-primary inline-block text-center w-full">${ssrInterpolate(resource.linkText)}</a></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=media-ebG_9M7G.js.map
