const TodoList = function($module) {
    this.$module = $module;
    this.$addItemInput = undefined;
    this.$list = undefined;
    this._todoItems = {
        // current: [],
        current: [
            {
                id: '23',
                label: 'Buy a baseball hat',
                completionStatus: 'not-done',
            },
            {
                id: '24',
                label: 'Shave and wash well',
                completionStatus: 'done',
            },
            {
                id: '25',
                label: 'Play with the kids and everyone at diner',
                completionStatus: 'not-done',
            }
        ],
        deleted: [],
    }
}

TodoList.prototype.init = function() {
    this.$newTodoInput = this.$module.querySelector('#new-todo-input');
    this.$list = this.$module.querySelector('ul');

    // get any saved data from localStorage
        // if it to replace this._todoItems
    
    this.renderAllTodoItems();

    // Listen for click events
        // get event.target

        // if it's coming from a 'delete' button
            // get the corresponding todoItemId
            // call deleteTodo with that id
            // if deleteTodo function returned true
                // stop progagation of the event

        // if it's coming from a 'edit' button
            // check its state: 'edit' or 'done' TODO

            // TODO

    // Listen for 'change' events
        // Make sure that what emited the change event is a checkbox from one of the items
        // get the new 'checked' state of the checkbox
        // use event.target to get the corresponding todoItemId
        // call updateTodo with that id and the new state
        // if updateTodoItemCompletionState function returned true
            // stop progagation of the event

    // Listen for 'submit' events
        // preventDefault

        // if the submit event comes from the $addItemInput
            // get the value of $addItemInput
            // call add todo with that value

            // if addTodo function returned true
                // stop progagation of the event
                // reset the value of $addItemInput

    // Listen for 'input' events
        // See which contenteditable div the input comes from
        // Get the relevant itemid
        // call updateTodoItemLabel(todoItemId, newLabel)
            // if returned successfully stop propagation
}

TodoList.prototype.addTodoItem = function(todoItemLabel) {
    // Return true on success, or false on otherwise

    // const newTodoItemId = Math.random * Math.pow(10,10);
    // add a object with that id and todoItemLabel to this._todoItems
    // update localStorage
    // call renderTodoItem
}

TodoList.prototype.deleteTodoItem = function(todoItemId) {
    // Return true on success, or false on otherwise

    // Filter this._todoItems to exclude any item with todoItemId. Re-assign it to this._todoItems

    // add that item to the deleted items array

    // update localStorage

    // call renderTodoItem
}

TodoList.prototype.updateTodoItemCompletionState = function(todoItemId, newState) {
    // Return true on success, or false on otherwise

    // Use array map to update this._todoItems, changing 'done' state of the correspondong item

    // update localStorage
}

TodoList.prototype.updateTodoItemLabel = function(todoItemId, newLabel) {
    // Return true on success, or false on otherwise
    
    // Use array map to update this._todoItems, changing label of the correspondong item
    
    // update localStorage
    
    // call renderTodoItemLabelUpdate(todoItemId)
}


TodoList.prototype.renderAllTodoItems = function() {
    const generateTodoItemHTML = (id, label, completionStatus) => `
        <li class="todo-list__item">
            <input type="checkbox" aria-labelledby="item${id}-checkbox-label" ${completionStatus === 'done' && 'checked'}>
            <span id="item${id}-checkbox-label" role="textbox" contenteditable spellcheck="false">${label}</span>
            <button type="button" class="button--secondary">
                <span class="!visually-hidden">Delete</span>
                <img src="assets/bin-icon.svg" draggable="false">
            </button>
        </li>
    `;

    this.$list.innerHTML = this._todoItems.current.reduce(
        (accumulator, todoItem) => accumulator + generateTodoItemHTML(todoItem.id, todoItem.label, todoItem.completionStatus),
        ''
    );
}

TodoList.prototype.renderTodoItemDeletion = function(todoItemId) {
        // try to get the node corresponding to todoItemId
        // if there is one, delete it
}

TodoList.prototype.renderTodoItemLabelUpdate = function(todoItemId) {
    // try to get the node corresponding to todoItemId
    // if there is one, update the inner text
}

const $todoList = document.querySelector('[data-module="todo-list"]');
const todoList = new TodoList($todoList);

// TODO: Add keyboard handling for up and down arrows to go between todo lists using the roving index method. Respond to up and down arrows not just when th efocus is on the checkbox but also when it's anywhere on a todo list item

const todoListModules = document.querySelectorAll('[data-module="todo-list"]');
Array.prototype.forEach.call(todoListModules, $todoListModule => {
    const todoListModule = new TodoList($todoListModule);
    todoListModule.init();
});
