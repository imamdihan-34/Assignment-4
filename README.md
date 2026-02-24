


## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### 2. How do you create and insert a new element into the DOM?

### 3. What is Event Bubbling? And how does it work?

### 4. What is Event Delegation in JavaScript? Why is it useful?

### 5. What is the difference between preventDefault() and stopPropagation() methods?

---Answer-1:
getElementById() means a single element which is selected by id .

getElementByClassName() means a hole html section which is selected by class name it means it will bee a card section or buttons section.

querySelector() means selection of the (Id/class/Tag)

querySelectorAll() means all css selectors it works like getElementByClassName()

**Answer-2:
-> For create a new insert element I use document.createElement('tag')/appendChild/prepend

**Answer-3:
-> Event Bubbling means that when an event happens on an element (like a click), it doesn't just stay there. It "bubbles up" to its parent, then the grandparent, all the way to the window object.

How it works:
If you click a <button> inside a <div>, the browser first triggers the click on the button, then triggers the click handler on the div, then the body.

**Answer-4:
->Event Delegation is a technique where I attach one event listener to a parent element instead of adding listeners to every single child.
This is useful because It automatically handles newly created elements added to the DOM after the page loads without needing to manually attach new listeners.

**Answer-5: preventDefault() is uses in browsers default 
stopPropagation () stops event bubbling because of to stop event child element should not go to parent element
**Technology Stack:**
- HTML
- CSS (Vanilla/Tailwind/DaisyUI)
- JavaScript (Vanilla)

