# CSS Study Notes

## 1. CSS Selectors

### 1.1 Type Selector

- Targets all elements of a given type.

```css
p { color: red; }
````

### 1.2 Class Selector

- Targets elements with a specific class.

```css
.highlight { background-color: yellow; }
```

```html
<p class="highlight">This is highlighted.</p>
```

### 1.3 ID Selector

- Targets element with specific ID.

```css
#main-title { font-size: 24px; }
```

```html
<h1 id="main-title">Heading</h1>
```

### 1.4 Group Selector

- Apply same style to multiple elements.

```css
h1, h2, h3 { font-family: Arial, sans-serif; }
```

### 1.5 Descendant Selector

```css
div p { color: blue; }
```

### 1.6 Child Selector

```css
div > p { font-weight: bold; }
```

### 1.7 Attribute Selector

```css
a[href^="https"] { color: green; }
```

### 1.8 Pseudo-classes

```css
a:hover { color: red; }
p:first-child { font-weight: bold; }
```

### 1.9 Pseudo-elements

```css
p::first-line { font-weight: bold; }
p::before { content: "Note: "; color: red; }
```

### 1.10 Universal Selector

```css
* { margin: 0; padding: 0; }
```

### 1.11 Sibling Selectors

```css
h1 + p { color: blue; } /* adjacent sibling */
h1 ~ p { color: green; } /* general sibling */
```

### 1.12 Negation Selector

```css
p:not(.highlight) { color: gray; }
```

---

## 2. CSS Cascade

### 2.1 Order of Importance

1. Inline styles → highest
2. IDs
3. Classes, attributes, pseudo-classes
4. Type selectors
5. Universal selector → lowest

### 2.2 Specificity

- Inline: 1000
- ID: 100
- Class/attribute/pseudo-class: 10
- Element/pseudo-element: 1

### 2.3 !important

```css
p { color: blue !important; }
```

### 2.4 Source Order

- If specificity is equal, **last defined rule wins**.

---

## 3. CSS Box Model

### Components

1. **Content** – text, image, media
2. **Padding** – space between content & border
3. **Border** – wraps around padding + content
4. **Margin** – outside space separating elements

### Example

```css
div {
    width: 200px;
    padding: 10px;
    border: 5px solid black;
    margin: 20px;
    box-sizing: border-box; /* includes padding + border in width */
}
```

- Total width = content + padding + border + margin
- `box-sizing: border-box` makes layout easier.

---

## 4. CSS Positioning

| Position | Description                                                |
| -------- | ---------------------------------------------------------- |
| static   | Default, normal flow                                       |
| relative | Moves relative to original position                        |
| absolute | Positioned relative to nearest positioned ancestor         |
| fixed    | Positioned relative to viewport, stays on screen           |
| sticky   | Behaves like relative until a scroll threshold, then fixed |

---

## 5. CSS Float

- Floats elements left/right; text wraps around them.

```css
img { float: left; margin: 10px; }
```

- Clearing floats:

```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

---

## 6. CSS Responsiveness

### 6.1 Media Queries

```css
@media (max-width: 768px) {
    body { font-size: 14px; }
}
```

### 6.2 Flexbox

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
```

### 6.3 CSS Grid

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

### 6.4 External Frameworks

- Bootstrap, Tailwind CSS, Foundation

```html
<div class="row">
    <div class="col-md-6">Half width</div>
    <div class="col-md-6">Half width</div>
</div>
```

---

## 7. CSS Units

### Absolute Units

- `px`, `pt`, `cm`, `mm`

### Relative Units

- `%` → parent size
- `em` → parent font-size
- `rem` → root font-size

### Viewport Units

- `vw` → 1% of viewport width
- `vh` → 1% of viewport height
- `vmin`, `vmax` → 1% of smaller/larger side

### Fraction Unit (Grid)

- `fr` → fraction of remaining space

```css
grid-template-columns: 1fr 2fr 1fr; /* 3 columns: 1 part, 2 parts, 1 part */
```