export default store => next => action => {
  if (Array.isArray(action)) {
    action.forEach(store.dispatch);
    return;
  }
  next(action);
}