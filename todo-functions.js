// 1. Add event handler to checkbox
// 2. Modify the correct objects completed property
// toggleTodo function (id)
// 3 Save and rerender

// Fetch existing todos from localStorage
// getSavedTodos

const getDate = function() {
  let today = new Date();

  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  let dateEl = document.getElementById("date");

  dateEl.innerHTML = day + "/" + month + "/" + year;
};

const getSavedTodos = function() {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo
const removeTodo = function(id) {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle todo

const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.complete = !todo.complete;
  }
};

// Render application todos based on filters
const renderTodos = function(todos, filters) {
  let filteredTodos = todos.filter(function(todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.complete;

    return searchTextMatch && hideCompletedMatch;
  });

  // filteredTodos = filteredTodos.filter(function(todo) {
  //   return !filters.hideCompleted || !todo.complete;
  //   // if (filters.hideCompleted) {
  //   //   return !todo.complete;
  //   // } else {
  //   //   return true;
  //   // }
  // });

  const incomplete = filteredTodos.filter(function(todo) {
    return !todo.complete;
  });

  document.querySelector("#todos").innerHTML = "";

  document.querySelector("#todos").appendChild(generateSummaryDOM(incomplete));

  filteredTodos.forEach(function(todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Get the DOM elements for an individual note

const generateTodoDOM = function(todo) {
  const todoEl = document.createElement("div");
  const check = document.createElement("input");
  const label = document.createElement("label");
  const textEl = document.createElement("span");
  const remove = document.createElement("button");

  // Setup todo checkbox
  check.type = "checkbox"; // or check.setAttribute("type", "checkbox");
  // check.appendChild(label);
  check.appendChild(label);
  todoEl.appendChild(check);
  check.checked = todo.complete;

  if (todo.complete) {
    textEl.classList.add("completed");
  }

  check.addEventListener("click", function() {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // if(todo.complete === true) {
  //   check.checked = true;
  // }

  // Setup the todo text
  if (todo.text.length > 0) {
    textEl.textContent = todo.text;
  } else {
    textEl.textContent = "Unnamed todo";
  }

  todoEl.appendChild(textEl);

  // Setup the remove button
  remove.textContent = "x";
  todoEl.appendChild(remove);

  remove.addEventListener("click", function() {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = function(incomplete) {
  const summary = document.createElement("h3");
  summary.textContent = `You have ${incomplete.length} todos left.`;
  return summary;
};
