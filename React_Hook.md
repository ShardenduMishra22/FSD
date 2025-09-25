# React Hooks Comprehensive Guide

## State Management Hooks

### useState

**Use:** Manage local component state with a simple value.

**Code Sample:**

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  );
}
```

**Real-world Use:**

- Form input values
- Toggle states (modals, dropdowns)
- Shopping cart item quantities
- User preferences (theme, language)

### useReducer

**Use:** Manage complex state logic with multiple sub-values or when next state depends on previous state.

**Code Sample:**

```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
}

function CounterWithStep() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}, Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <input 
        type="number" 
        value={state.step} 
        onChange={(e) => dispatch({ type: 'SET_STEP', payload: +e.target.value })} 
      />
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

**Real-world Use:**

- Complex form state management
- Shopping cart operations (add, remove, update quantities)
- Game state management
- Multi-step wizards
- Managing authentication state

### useSyncExternalStore

**Use:** Subscribe to external data sources that exist outside React's control.

**Code Sample:**

```javascript
import React, { useSyncExternalStore } from 'react';

// External store (could be Redux, Zustand, etc.)
let currentTheme = 'light';
const listeners = new Set();

const themeStore = {
  getSnapshot: () => currentTheme,
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  setTheme: (theme) => {
    currentTheme = theme;
    listeners.forEach(listener => listener());
  }
};

function ThemeProvider() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot
  );
  
  return (
    <div className={`app-${theme}`}>
      <p>Current theme: {theme}</p>
      <button onClick={() => themeStore.setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

**Real-world Use:**

- Redux store integration
- WebSocket connections
- Browser APIs (localStorage, sessionStorage)
- Third-party state management libraries
- Real-time data synchronization

## Effect Hooks

### useEffect

**Use:** Perform side effects in function components (data fetching, subscriptions, manual DOM changes).

**Code Sample:**

```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        if (!cancelled) {
          setUser(userData);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch user:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    return () => {
      cancelled = true; // Cleanup
    };
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  return <div>Hello, {user?.name}</div>;
}
```

**Real-world Use:**

- API data fetching
- Setting up event listeners
- Timers and intervals
- Cleanup subscriptions
- Document title updates
- Analytics tracking

### useLayoutEffect

**Use:** Similar to useEffect but fires synchronously after all DOM mutations, before browser paints.

**Code Sample:**

```javascript
import React, { useLayoutEffect, useRef, useState } from 'react';

function AutoResizeTextarea() {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');
  
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight to fit content
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [text]);
  
  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something..."
      style={{ resize: 'none', overflow: 'hidden' }}
    />
  );
}
```

**Real-world Use:**

- DOM measurements and calculations
- Smooth animations
- Preventing layout flicker
- Auto-sizing components
- Tooltip positioning

### useInsertionEffect

**Use:** Fire effects before any DOM mutations, primarily for CSS-in-JS libraries.

**Code Sample:**

```javascript
import React, { useInsertionEffect, useRef } from 'react';

function DynamicStyles({ color, size }) {
  const styleRef = useRef();
  
  useInsertionEffect(() => {
    const className = `dynamic-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create style element
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      document.head.appendChild(styleRef.current);
    }
    
    // Update styles
    styleRef.current.textContent = `
      .${className} {
        color: ${color};
        font-size: ${size}px;
        transition: all 0.3s ease;
      }
    `;
    
    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
    };
  }, [color, size]);
  
  return <div className={styleRef.current?.sheet?.cssRules[0]?.selectorText?.slice(1)}>
    Styled Text
  </div>;
}
```

**Real-world Use:**

- CSS-in-JS libraries (styled-components, emotion)
- Dynamic style injection
- Theme systems
- Runtime CSS generation

## Ref Hooks

### useRef

**Use:** Create a mutable ref object that persists across re-renders, access DOM elements directly.

**Code Sample:**

```javascript
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);
  
  const handleClick = () => {
    countRef.current += 1;
    console.log(`Button clicked ${countRef.current} times`);
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} placeholder="This will be focused" />
      <button onClick={handleClick}>
        Focus Input & Count Clicks
      </button>
    </div>
  );
}
```

**Real-world Use:**

- DOM element access
- Storing previous values
- Timers and intervals
- Integrating with third-party libraries
- Storing mutable values without re-renders

### useImperativeHandle

**Use:** Customize the instance value exposed to parent components when using forwardRef.

**Code Sample:**

```javascript
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    getValue: () => inputRef.current?.value,
    clear: () => {
      if (inputRef.current) inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

function App() {
  const customInputRef = useRef();
  
  return (
    <div>
      <CustomInput ref={customInputRef} placeholder="Custom input" />
      <button onClick={() => customInputRef.current?.focus()}>Focus</button>
      <button onClick={() => customInputRef.current?.clear()}>Clear</button>
      <button onClick={() => alert(customInputRef.current?.getValue())}>
        Get Value
      </button>
    </div>
  );
}
```

**Real-world Use:**

- Custom component libraries
- Exposing imperative APIs
- Complex form controls
- Animation libraries integration
- Third-party library wrappers

## Performance Hooks

### useMemo

**Use:** Memoize expensive calculations to avoid re-computation on every render.

**Code Sample:**

```javascript
import React, { useState, useMemo } from 'react';

function ExpensiveList({ items, filter }) {
  const [sortOrder, setSortOrder] = useState('asc');
  
  const processedItems = useMemo(() => {
    console.log('Processing items...'); // This will only run when dependencies change
    
    return items
      .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        const multiplier = sortOrder === 'asc' ? 1 : -1;
        return a.name.localeCompare(b.name) * multiplier;
      })
      .map(item => ({ ...item, processed: true }));
  }, [items, filter, sortOrder]);
  
  return (
    <div>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort: {sortOrder}
      </button>
      <ul>
        {processedItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Real-world Use:**

- Expensive calculations
- Complex data transformations
- Filtered and sorted lists
- Chart data processing
- API response processing

### useCallback

**Use:** Memoize functions to prevent unnecessary re-renders of child components.

**Code Sample:**

```javascript
import React, { useState, useCallback, memo } from 'react';

const ExpensiveChild = memo(({ onClick, data }) => {
  console.log('ExpensiveChild rendered');
  
  return (
    <div>
      <p>Data: {data}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Without useCallback, this would be a new function on every render
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Empty deps since we use functional update
  
  const handleNameClick = useCallback(() => {
    console.log(`Hello, ${name}!`);
  }, [name]); // Re-create when name changes
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter name"
      />
      <p>Count: {count}</p>
      <ExpensiveChild onClick={handleClick} data="static data" />
      <ExpensiveChild onClick={handleNameClick} data={name} />
    </div>
  );
}
```

**Real-world Use:**

- Preventing child re-renders
- Event handlers optimization
- Dependency arrays in useEffect
- Prop drilling optimization
- Performance critical components

## Context Hooks

### useContext

**Use:** Access React Context values without nesting Consumer components.

**Code Sample:**

```javascript
import React, { createContext, useContext, useState } from 'react';

// Create contexts
const ThemeContext = createContext();
const UserContext = createContext();

// Theme provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// User provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Component using contexts
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(UserContext);
  
  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
      {user ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <span>Please login</span>
      )}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}

// App component
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Header />
      </UserProvider>
    </ThemeProvider>
  );
}
```

**Real-world Use:**

- Theme management
- Authentication state
- Language/locale settings
- Shopping cart state
- User preferences
- Global notifications

## Transition Hooks

### useTransition

**Use:** Mark state updates as non-urgent to keep UI responsive during expensive operations.

**Code Sample:**

```javascript
import React, { useState, useTransition, useDeferredValue } from 'react';

function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  
  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mark the expensive filtering as non-urgent
    startTransition(() => {
      // This could trigger expensive re-renders
      // but won't block the input typing
    });
  };
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search items..."
      />
      {isPending && <div>Searching...</div>}
      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  // Generate large list for demonstration
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  
  return <SearchableList items={items} />;
}
```

**Real-world Use:**

- Search interfaces
- Large list filtering
- Data visualization updates
- Heavy calculations
- Route transitions
- Auto-complete suggestions

## React 19 Hooks

### useFormStatus

**Use:** Get the status of form submission in Server Components or forms with actions.

**Code Sample:**

```javascript
import React from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Form'}
    </button>
  );
}

function ContactForm() {
  async function submitForm(formData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', Object.fromEntries(formData));
  }
  
  return (
    <form action={submitForm}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <SubmitButton />
    </form>
  );
}
```

**Real-world Use:**

- Form submission states
- Loading indicators
- Disabling submit buttons
- Server-side form handling
- Progressive enhancement

### useFormState

**Use:** Manage form state with server actions, providing previous state and form data.

**Code Sample:**

```javascript
import React from 'react';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  errors: {}
};

async function updateProfile(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Validation
  const errors = {};
  if (!name) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  
  if (Object.keys(errors).length > 0) {
    return { message: 'Validation failed', errors };
  }
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { 
    message: 'Profile updated successfully!', 
    errors: {} 
  };
}

function ProfileForm() {
  const [state, formAction] = useFormState(updateProfile, initialState);
  
  return (
    <form action={formAction}>
      <div>
        <input name="name" placeholder="Name" />
        {state.errors.name && <span className="error">{state.errors.name}</span>}
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" />
        {state.errors.email && <span className="error">{state.errors.email}</span>}
      </div>
      <button type="submit">Update Profile</button>
      {state.message && <div className="message">{state.message}</div>}
    </form>
  );
}
```

**Real-world Use:**

- Server-side form validation
- Multi-step forms
- Form error handling
- Progressive enhancement
- Real-time validation feedback

### useOptimistic

**Use:** Optimistically update UI immediately while async operation is pending.

**Code Sample:**

```javascript
import React, { useState } from 'react';
import { useOptimistic } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false }
  ]);
  
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, id: Date.now(), completed: false }]
  );
  
  const [optimisticToggled, toggleOptimistic] = useOptimistic(
    optimisticTodos,
    (state, todoId) => state.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    )
  );
  
  async function addTodo(text) {
    // Optimistically add the todo
    addOptimisticTodo({ text });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
    } catch (error) {
      // Handle error - optimistic update will be reverted
      console.error('Failed to add todo:', error);
    }
  }
  
  async function toggleTodo(id) {
    // Optimistically toggle
    toggleOptimistic(id);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  }
  
  return (
    <div>
      <ul>
        {optimisticToggled.map(todo => (
          <li 
            key={todo.id} 
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('New Todo')}>
        Add Todo
      </button>
    </div>
  );
}
```

**Real-world Use:**

- Like/unlike buttons
- Adding comments
- Shopping cart updates
- Chat messages
- Real-time collaboration
- Social media interactions

## Utility Hooks

### useDebugValue

**Use:** Display custom labels for custom hooks in React DevTools.

**Code Sample:**

```javascript
import React, { useState, useEffect, useDebugValue } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  // This will show up in React DevTools
  useDebugValue(count > 10 ? 'High' : 'Low');
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    
    function handleOffline() {
      setIsOnline(false);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

function App() {
  const counter = useCounter(5);
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      <p>Count: {counter.count}</p>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
      <button onClick={counter.reset}>Reset</button>
    </div>
  );
}
```

**Real-world Use:**

- Custom hook development
- Debugging complex hooks
- Development tooling
- Hook libraries
- State visualization

### useId

**Use:** Generate stable unique IDs for accessibility attributes and form elements.

**Code Sample:**

```javascript
import React, { useId } from 'react';

function FormField({ label, type = 'text', ...props }) {
  const id = useId();
  const descriptionId = `${id}-description`;
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={type}
        aria-describedby={descriptionId}
        {...props}
      />
      <div id={descriptionId} className="field-description">
        {props.placeholder && `Format: ${props.placeholder}`}
      </div>
    </div>
  );
}

function LoginForm() {
  const formId = useId();
  
  return (
    <form aria-labelledby={`${formId}-title`}>
      <h2 id={`${formId}-title`}>Login Form</h2>
      <FormField 
        label="Email" 
        type="email" 
        placeholder="user@example.com"
        required 
      />
      <FormField 
        label="Password" 
        type="password" 
        placeholder="8+ characters"
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
}

function App() {
  return (
    <div>
      <LoginForm />
      <LoginForm /> {/* Each form will have unique IDs */}
    </div>
  );
}
```

**Real-world Use:**

- Form accessibility
- ARIA attributes
- Multiple component instances
- Server-side rendering
- Component libraries
- Reusable form components

---

## React Hooks Quick Reference

### State Management

- useState
- useReducer
- useSyncExternalStore

### Effect Hooks

- useEffect
- useLayoutEffect
- useInsertionEffect

### Ref Hooks

- useRef
- useImperativeHandle

### Performance Hooks

- useMemo
- useCallback

### Context Hooks

- useContext

### Transition Hooks

- useTransition

### React 19 Hooks

- useFormStatus
- useFormState
- useOptimistic

### Utility Hooks

- useDebugValue
- useId
