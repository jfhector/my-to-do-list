const TodoList = function($module) {
    this.$module = $module;
    this.$addItemInput = undefined;
    this.$list = undefined;
    this._todoItems = {
        current: [],
        deleted: [],
    }
}

TodoList.prototype.init = function() {
    // Get a reference to the input field, assign it to this.$addItemInput
    // Get a reference to the ul element, assign it to this.$list

    // get any saved data from localStorage
        // if it to replace this._todoItems
    // call renderAllTodoItems

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

    // get a new unique todoItemId
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
    // create a fragment
    // for each element in this._todoItems.current
        // create the right notes based on the data
        // append to the fragment
    // append the fragment to the ul
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