const utilities = {
    findElementUpstream: (startElement, selector) => {
        if (startElement.matches(selector)) {
            return startElement;
        } else {
            return utilities.findElementUpstream(startElement.parentNode, selector); // LESSON: Don't forget to return the recursive call to the function
        }
    }
}
function IDGenerator() {
	 
    this.length = 10;
    this.timestamp = +new Date;
    
    var _getRandomInt = function( min, max ) {
       return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        
        for( var i = 0; i < this.length; ++i ) {
           var index = _getRandomInt( 0, parts.length - 1 );
           id += parts[index];	 
        }
        
        return id;
    }   
}

const idGen = new IDGenerator();

const TodoList = function($module) {
    this.$module = $module;
    this.$list = this.$module.querySelector('ul'); // Q: Why does this.$list become undefined if I only set it in .init?
    this.$newTodoInput = this.$module.querySelector('#new-todo-input');
    this.$newTodoAddButton = this.$module.querySelector('.js-add-item-button');
    this._todoItems = {
        current: [
            {
                id: '23',
                label: 'Buy a baseball hat',
                completionState: 'not-done',
            },
            {
                id: '24',
                label: 'Shave and wash well',
                completionState: 'done',
            },
            {
                id: '25',
                label: 'Play with the kids and everyone at diner',
                completionState: 'not-done',
            }
        ],
        deleted: [],
    }
}

TodoList.prototype.init = function() {

    // get any saved data from localStorage
        // if it to replace this._todoItems
    
    this.renderAllTodoItems();

    this._touchEventDetected = false;
    
    // given that there hasn't been a touch event at any time
    // after 10 seconds have passed after page load,
    // apply the allow-hiden-buttons class
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!this._touchEventDetected) {
                this.$module.classList.add('allow-hiden-buttons');
            }
        }, 10000);
    });

    // remove any allow-hiden-buttons class as soon as a touch event is detected
    window.addEventListener('touchstart', (e) => {
        this._touchEventDetected = true;
        this.$module.classList.remove('allow-hiden-buttons');
    });

    this.$list.addEventListener('click', (e) => {
        if (e.srcElement.matches('li .js-todo-delete-button, li .js-todo-delete-button > *')) {

            // TODO: Refactor
            const ancestorWithDataItemId = utilities.findElementUpstream(e.srcElement, 'li[data-item-id]');
            if (!ancestorWithDataItemId) { return false };

            const idOfItemToBeDeleted = ancestorWithDataItemId.dataset.itemId;
            this.deleteTodoItem(idOfItemToBeDeleted);
            return true;
        }
    });

    this.$module.addEventListener('change', (e) => {

        if (e.srcElement.matches('li[data-item-id] input[type="checkbox"]')) {
            const idOfCorrespondingTodoItem = e.srcElement.parentNode.dataset.itemId;
            const newCompletionState = e.srcElement.checked ? 'done' : 'not-done';
            this.updateTodoItemCompletionState(idOfCorrespondingTodoItem, newCompletionState) && e.stopPropagation()
        }
    });

    this.$newTodoAddButton.addEventListener('click', (e) => {
        debugger;
        this.handleAddButtonClickAndInputEnterKey() && e.stopPropagation();
    });

    this.$newTodoInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            this.handleAddButtonClickAndInputEnterKey() && e.stopPropagation();
        }
    });

    this.handleAddButtonClickAndInputEnterKey = function() {
        const newToDoLabel = this.$newTodoInput.value;
        
        if(this.addTodoItem(newToDoLabel)) {
            this.$newTodoInput.value = '';
            return true;
        } else {
            return false;
        }
    }

    // Listen for 'input' events
    this.$list.addEventListener('input', (e) => {

        if (e.srcElement.matches('span[role="textbox"][contenteditable]')) {

            // TODO: Refactor
            const ancestorWithDataItemId = utilities.findElementUpstream(e.srcElement, 'li[data-item-id]');
            if (!ancestorWithDataItemId) { return false };

            const idOfItemToBeDeleted = ancestorWithDataItemId.dataset.itemId;

            const newLabel = e.srcElement.textContent;

            if (this.updateTodoItemLabel(idOfItemToBeDeleted, newLabel)) {
                e.stopPropagation();
            }
        }
    });
}

TodoList.prototype.addTodoItem = function(todoItemLabel) {
    const newTodoItemId = idGen.generate().toString();

    const newTodoItem = {
        id: newTodoItemId,
        label: todoItemLabel,
        completionState: 'not-done',
    };

    this._todoItems.current.push(newTodoItem);

    // TODO update localStorage

    this.renderAllTodoItems();
    return true;
}

TodoList.prototype.deleteTodoItem = function(todoItemId) {
    this._todoItems.current = this._todoItems.current.filter(todoItem => {
        if (todoItem.id !== todoItemId) {
            return true;
        } else {
            this._todoItems.deleted.push(todoItem);
            return false;
        }
    });

    // update localStorage

    this.renderTodoItemDeletion(todoItemId);
    return true;
}

TodoList.prototype.updateTodoItemCompletionState = function(todoItemId, newCompletionState) {
    
    this._todoItems.current.forEach(todoItemInState => {
        if (todoItemInState.id === todoItemId) { todoItemInState.completionState = newCompletionState }
    });

    // update localStorage

    return true;
}

TodoList.prototype.updateTodoItemLabel = function(todoItemId, newLabel) {
    this._todoItems.current.forEach(todoItemInState => {
        if (todoItemInState.id === todoItemId) { todoItemInState.label = newLabel }
    });

    // update localStorage

    return true;
}


TodoList.prototype.renderAllTodoItems = function() {
    const generateTodoItemHTML = (id, label, completionState) => `
        <li class="todo-list__item" data-item-id="${id}">
            <input type="checkbox" aria-labelledby="item${id}-checkbox-label" ${completionState === 'done' ? 'checked' : ''}>
            <span id="item${id}-checkbox-label" role="textbox" contenteditable spellcheck="false">${label}</span>
            <button type="button" class="button--secondary js-todo-delete-button">
                <span class="!visually-hidden">Delete</span>
                <img src="assets/bin-icon.svg" draggable="false">
            </button>
        </li>
    `;

    this.$list.innerHTML = this._todoItems.current.reduce(
        (accumulator, todoItem) => accumulator + generateTodoItemHTML(todoItem.id, todoItem.label, todoItem.completionState),
        ''
    );
}

TodoList.prototype.renderTodoItemDeletion = function(todoItemId) {
    const nodeToBeDeleted = this.$list.querySelector(`li[data-item-id="${todoItemId}"]`);
    nodeToBeDeleted.remove();
}

// I don't need to do this, as the view is already in sync with the model.
// Q: If I had done, I wonder whether editing the text would still be seamless
// TodoList.prototype.renderTodoItemLabelUpdate = function(todoItemId) {}

// IN DEV
const $todoList = document.querySelector('[data-module="todo-list"]');
const todoList = new TodoList($todoList);
todoList.init();

// IN PROD
// const todoListModules = document.querySelectorAll('[data-module="todo-list"]');
// Array.prototype.forEach.call(todoListModules, $todoListModule => {
//     const todoListModule = new TodoList($todoListModule);
//     todoListModule.init();
// });

// TODO: Add keyboard handling for up and down arrows to go between todo lists using the roving index method. Respond to up and down arrows not just when th efocus is on the checkbox but also when it's anywhere on a todo list item