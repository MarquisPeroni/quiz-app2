import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../reducers';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();

// Create Redux store with persisted state
const store = configureStore({
  reducer: mainReducer,
  preloadedState: persistedState,
});

// Subscribe to store changes and save the user state to localStorage
store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;
