# Port-Chops Development Rules

## Styling Guidelines

### 1. No Inline Styles
- **NEVER** use inline `style` attributes in components
- All styling must be done through CSS classes
- Use Tailwind utility classes or scoped CSS classes only

❌ **Bad:**
```vue
<div style="color: red; margin: 10px;">Content</div>
```

✅ **Good:**
```vue
<div class="text-red-600 m-2.5">Content</div>
```

### 2. Tailwind Over Custom CSS
- **PREFER** Tailwind utility classes for all styling needs
- Only write custom CSS when absolutely necessary (complex animations, unique patterns)
- If you must write custom CSS, use the `@apply` directive with Tailwind classes when possible

❌ **Bad:**
```css
.my-button {
  background-color: #0ea5e9;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
}
```

✅ **Good:**
```vue
<button class="bg-ocean-500 px-6 py-2 rounded-lg">Click</button>
```

✅ **Acceptable (when necessary):**
```css
.my-button {
  @apply bg-ocean-500 px-6 py-2 rounded-lg;
}
```

### 3. No Emojis or Icons
- **NEVER** use emoji characters (🎉, 📚, ✅, etc.) in the UI
- **NEVER** use icon fonts or SVG icons in components
- Use text labels only for all UI elements
- Keep the interface clean and professional

❌ **Bad:**
```vue
<div>
  <span>🍽️</span>
  <h3>Recipes</h3>
</div>
```

❌ **Also Bad:**
```vue
<svg class="icon">...</svg>
<i class="fa fa-heart"></i>
```

✅ **Good:**
```vue
<div>
  <h3>Recipes</h3>
</div>
```

## Code Review Checklist

Before committing code, verify:
- [ ] No `style=""` attributes anywhere
- [ ] All styling uses Tailwind classes
- [ ] No emoji characters in templates or content
- [ ] No icon components or SVG icons
- [ ] Custom CSS is minimal and uses `@apply` where possible

## Exceptions

None. These rules apply to all components, pages, and layouts without exception.
