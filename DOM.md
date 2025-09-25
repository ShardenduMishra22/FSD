# DOM Manipulation - Study Notes

## 1. Injecting JavaScript

Ways to add JavaScript to an HTML document:

### Inline

```html
<button onclick="alert('Hello')">Click Me</button>
````

### Internal

```html
<script>
  console.log('Hello World');
</script>
```

### External

```html
<script src="script.js"></script>
```

---

## 2. Manipulating CSS with JavaScript

### Changing Styles Directly

```html
<div id="myDiv">Hello</div>
<script>
  const div = document.getElementById('myDiv');
  div.style.color = 'red';          // Change text color
  div.style.background = 'yellow';  // Change background
</script>
```

### Adding / Removing Classes

```js
div.classList.add('active');        // Add class
div.classList.remove('active');     // Remove class
div.classList.toggle('highlight');  // Toggle class
```

---

## 3. Using jQuery

### Selecting Elements

```js
$('#myDiv');    // Select by ID
$('.class');    // Select by class
$('p');         // Select all <p> elements
```

### Changing Content

```js
$('#content').text('New Text');         // Change text
$('#content').html('<b>Bold Text</b>'); // Insert HTML
$('#input').val('Value');               // Set input value
```

### Adding / Removing Elements

```js
$('#list').append('<li>Item 3</li>');   // Add at end
$('#list').prepend('<li>Item 0</li>');  // Add at start
$('#list li:first').remove();           // Remove first element
```

### Event Handling

```js
$('#btn').click(function() {
  alert('Button clicked!');
});

$('#btn').hover(
  function(){ $(this).css('color', 'red'); },   // Mouse enter
  function(){ $(this).css('color', 'black'); }  // Mouse leave
);
```

### Showing / Hiding / Animating

```js
$('#box').toggle();         // Show / hide
$('#box').fadeIn(500);      // Fade in
$('#box').fadeOut(500);     // Fade out
$('#box').slideUp(500);     // Slide up
$('#box').slideDown(500);   // Slide down
```

### CSS Manipulation

```js
$('#box2').css({
  'color': 'white',
  'background-color': 'green',
  'padding': '10px'
});

$('#box2').addClass('highlight');     // Add class
$('#box2').removeClass('highlight');  // Remove class
$('#box2').toggleClass('highlight');  // Toggle class
```

---

## 4. (Optional) Vanilla JS Core Methods

Some basic DOM APIs (not jQuery) often expected:

```js
// Create element
const newDiv = document.createElement('div');
newDiv.textContent = "Hello!";
document.body.appendChild(newDiv);

// Remove element
newDiv.remove();

// Event listener
document.getElementById('btn').addEventListener('click', () => {
  alert('Button clicked!');
});
```
