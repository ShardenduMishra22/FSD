# HTML Study Notes

## 1. HTML Tags

### 1.1 Headings

- Defined with `<h1>` to `<h6>`.
- `<h1>` = largest, `<h6>` = smallest.
- Structure:

  ```html
  <h1>Main Title</h1>
  <h2>Sub Title</h2>
  <h3>Section Heading</h3>

```

* Guidelines:

  * Only one `<h1>` per page recommended.
  * Follow logical hierarchy (h1 → h2 → h3…).
  * SEO uses headings to understand page structure.
  * Block-level elements (start on a new line, take full width).

---

### 1.2 Paragraphs

* Defined with `<p>` tag.
* Block-level element.
* Example:

  ```html
  <p>This is a paragraph.</p>
  <p>Another paragraph.</p>
  ```

- Can contain **inline elements** but not block-level elements.
- Browsers add default margin above/below paragraphs.

> **Note:** Placing `<div>` inside `<p>` is invalid, but browsers auto-correct it.

---

### 1.3 Self-closing Tags

- Tags that **don’t need closing**.
- Examples:

  ```html
  <br>       <!-- line break -->
  <hr>       <!-- horizontal line -->
  <img src="image.jpg" alt="desc">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  ```

- Cannot contain content.

---

### 1.4 Lists

#### Ordered List `<ol>`

```html
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
```

#### Unordered List `<ul>`

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>
```

#### List Items `<li>`

- Required inside `<ol>` or `<ul>`.
- `id` or `class` optional (used for CSS/JS targeting).

> React Note: When rendering lists with `.map()` in React, use `key` prop for tracking changes. Not required in plain HTML.

---

### 1.5 Nesting Lists

- Lists can be nested inside `<li>`:

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Spinach</li>
    </ul>
  </li>
</ul>
```

---

### 1.6 Anchor Elements `<a>`

- Defines a hyperlink.
- Attributes:

  - `href` → URL
  - `target` → `_blank` (new tab), `_self` (default)
  - `rel="noopener noreferrer"` → security for `_blank` (prevents access to `window.opener` and blocks referrer header)
- Example:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Example
</a>
```

---

### 1.7 Images `<img>`

- Self-closing tag.
- Attributes:

  - `src` → path to image
  - `alt` → alternate text for accessibility/SEO
  - `width` / `height` → size
  - `title` → optional tooltip on hover
- Example:

```html
<img src="image.jpg" alt="A beautiful view" width="300" height="200" title="View">
```

---

### 1.8 Tables `<table>`

- Organize data in rows and columns.
- Tags:

  - `<table>` → container
  - `<tr>` → row
  - `<th>` → header cell
  - `<td>` → standard cell
- Example:

```html
<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>30</td>
  </tr>
</table>
```

- Attributes `colspan` / `rowspan` can merge cells.

---

### 1.9 Meta Tags `<meta>`

- Provide metadata, placed inside `<head>`.
- Common types:

  ```html
  <!-- Charset -->
  <meta charset="UTF-8">

  <!-- Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Description -->
  <meta name="description" content="This is a sample page">

  <!-- Keywords -->
  <meta name="keywords" content="HTML,CSS,JavaScript">

  <!-- Author -->
  <meta name="author" content="Shardendu Mishra">

  <!-- Refresh / Redirect -->
  <meta http-equiv="refresh" content="30">
  <meta http-equiv="refresh" content="5;url=https://example.com">

  <!-- Robots -->
  <meta name="robots" content="index,follow">

  <!-- Open Graph / Social Media -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="image.jpg">

  <!-- Theme color -->
  <meta name="theme-color" content="#317EFB">
  ```

**UTF-8**: Unicode encoding, supports all languages/emojis.

**Viewport**: Makes page responsive; ensures proper scaling on mobile devices.

---

### 1.10 Block and Inline Elements

- **Block-level**: full width, starts on new line. Can contain inline & block elements.

  - Examples: `<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<ol>`, `<table>`
- **Inline**: only as wide as content, stays in line. Cannot contain block elements.

  - Examples: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`
- CSS can override with `display: block;` or `display: inline;`.

---

### 1.11 Entities

- Special characters written as `&name;` or `&#code;`.
- Examples:

  | Symbol | Entity | Code |
  |--------|--------|------|
  | &      | `&amp;` | `&#38;` |
  | <      | `&lt;`  | `&#60;` |
  | >      | `&gt;`  | `&#62;` |
  | "      | `&quot;`| `&#34;` |
  | '      | `&apos;`| `&#39;` |
  | Non-breaking space | `&nbsp;` | `&#160;` |

---

### 1.12 Media Elements

- **Audio**:

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

- **Video**:

```html
<video width="320" height="240" controls>
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

- Attributes: `controls`, `autoplay`, `loop`, `muted`
- Fallback text displayed if browser doesn’t support.

---

### 1.13 Favicon

- Small icon in browser tab/bookmarks.
- Placed in `<head>`:

```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

- Can be `.ico`, `.png`, `.svg`.

---

### 1.14 File Paths

#### Folder Structure Example

```
project/
│
├─ index.html
├─ about.html
├─ images/
│   ├─ logo.png
│   └─ banner.jpg
├─ css/
│   └─ style.css
└─ js/
    └─ script.js
```

#### 1. Absolute Path

- Full URL:

```html
<img src="https://example.com/images/logo.png">
```

#### 2. Relative Path

- Relative to current HTML file:

```html
<!-- Same folder -->
<img src="logo.png">

<!-- Subfolder -->
<img src="images/logo.png">

<!-- Parent folder -->
<img src="../images/logo.png">
```

#### 3. Root-relative Path

- Relative to project root:

```html
<img src="/images/logo.png">
```

> Absolute = full URL, Relative = relative to current file, Root-relative = from root folder `/`.
