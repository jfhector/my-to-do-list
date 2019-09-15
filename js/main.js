const utilities = {
    findElementUpstream: (startElement, selector) => {
        if (startElement.matches(selector)) {
            return startElement;
        } else {
            return utilities.findElementUpstream(startElement.parentNode, selector); // LESSON: Don't forget to return the recursive call to the function
        }
    },

    storageAvailable: (storageType) => {
        var storage;
        try {
            storage = window[storageType];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
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
    this.$undoDeleteButton = this.$module.querySelector('.js-undo-delete-button');
    this.$clearCompletedButton = this.$module.querySelector('.js-clear-completed-button');
    this._touchEventDetected = undefined;
    this._todoItems = {
        current: [],
        deleted: [],
    }
}

TodoList.prototype.init = function() {

    if (utilities.storageAvailable('localStorage')) {
        if (localStorage.getItem('_todoItems')) {
            this._todoItems = JSON.parse(localStorage.getItem('_todoItems')); 
        }
        if (localStorage.getItem('_touchEventDetected')) {
            this._touchEventDetected = localStorage.getItem('_touchEventDetected');
        }
    }

    this.renderAllTodoItems();
    this.updateUndoDeleteButton();
    this.updateClearCompletedButton();

    window.addEventListener('load', () => {
        // given that there hasn't been a touch event at any time
        // after 10 seconds have passed after page load,
        // apply the allow-hiden-buttons class
        setTimeout(() => {
            if (!(this._touchEventDetected === 'true')) {
                this.$module.classList.add('allow-hiden-buttons');
            }
        }, 10000);
    });

    window.addEventListener('touchstart', (e) => {
        // remove any allow-hiden-buttons class as soon as a touch event is detected
        this._touchEventDetected = 'true';
        if (utilities.storageAvailable('localStorage')) { localStorage.setItem('_touchEventDetected', this._touchEventDetected); }
        this.$module.classList.remove('allow-hiden-buttons');
    });

    this.$list.addEventListener('click', (e) => {
        if (e.srcElement.matches('li .js-todo-delete-button, li .js-todo-delete-button > *')) {

            // TODO: Refactor
            const correspondingTodoListItemNode = utilities.findElementUpstream(e.srcElement, 'li[data-item-id]');
            if (!correspondingTodoListItemNode) { return false };

            const idOfItemToBeDeleted = correspondingTodoListItemNode.dataset.itemId;
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

    this.$undoDeleteButton.addEventListener('click', (e) => {
        this.undoLastTodoDeletion() && e.stopPropagation();
    });

    this.$clearCompletedButton.addEventListener('click', (e) => {
        this.clearCompleted() && e.stopPropagation();
    });

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
    if (utilities.storageAvailable('localStorage')) { localStorage.setItem('_todoItems', JSON.stringify(this._todoItems)); }

    // this.renderAllTodoItems();
    this.renderAddTodoItem(newTodoItem);
    return true;
}

TodoList.prototype.deleteTodoItem = function(todoItemId) {
    // Finding the id of the next sibling item in the todo item array
    let idOfNextSiblingItemInArray;
    const indexOfToDoItemInArray = this._todoItems.current.findIndex(todoItemInArray => todoItemInArray.id === todoItemId);
    if (this._todoItems.current.length > (indexOfToDoItemInArray + 1)) {
        idOfNextSiblingItemInArray = this._todoItems.current[indexOfToDoItemInArray + 1].id;
    } else {
        idOfNextSiblingItemInArray = null;
    }

    this._todoItems.current = this._todoItems.current.filter(todoItem => {
        if (todoItem.id !== todoItemId) {
            return true;
        } else {
            this._todoItems.deleted.push(Object.assign(todoItem, { idOfNextSiblingItemInArray: idOfNextSiblingItemInArray }));
            return false;
        }
    });

    if (utilities.storageAvailable('localStorage')) { localStorage.setItem('_todoItems', JSON.stringify(this._todoItems)); }

    this.renderTodoItemDeletion(todoItemId);
    return true;
}

TodoList.prototype.undoLastTodoDeletion = function() {
    if (!this._todoItems.deleted.length) { return false; }

    const lastItemAddedToDeletedToDosArray = this._todoItems.deleted.pop();
    
    const lastDeletedTodo = {
        label: lastItemAddedToDeletedToDosArray.label,
        id: lastItemAddedToDeletedToDosArray.id,
        completionState: lastItemAddedToDeletedToDosArray.completionState,
    };

    const idOfNextSiblingItemInArrayBeforeDeletion = lastItemAddedToDeletedToDosArray.idOfNextSiblingItemInArray;
    const currentIndexOfNextSiblingItemInArrayBeforeDeletion = this._todoItems.current.findIndex(todoItemInArray => todoItemInArray.id === idOfNextSiblingItemInArrayBeforeDeletion);
    
    if (currentIndexOfNextSiblingItemInArrayBeforeDeletion && currentIndexOfNextSiblingItemInArrayBeforeDeletion !== -1) {
        this._todoItems.current.splice(currentIndexOfNextSiblingItemInArrayBeforeDeletion, 0, lastDeletedTodo);
    } else {
        this._todoItems.current.splice(0, 0, lastDeletedTodo);
    }

    this.renderUndoLastTodoDeletion();
    return true;
};

TodoList.prototype.updateTodoItemCompletionState = function(todoItemId, newCompletionState) {
    
    this._todoItems.current.forEach(todoItemInState => {
        if (todoItemInState.id === todoItemId) { todoItemInState.completionState = newCompletionState }
    });

    if (utilities.storageAvailable('localStorage')) { localStorage.setItem('_todoItems', JSON.stringify(this._todoItems)); }

    this.updateClearCompletedButton();
    return true;
}

TodoList.prototype.clearCompleted = function() {
    const completedTodoItems = this._todoItems.current.filter(todoItem => todoItem.completionState === 'done');
    completedTodoItems.forEach(completedTodoItem => this.deleteTodoItem(completedTodoItem.id));
    return true;
};

TodoList.prototype.updateTodoItemLabel = function(todoItemId, newLabel) {
    this._todoItems.current.forEach(todoItemInState => {
        if (todoItemInState.id === todoItemId) { todoItemInState.label = newLabel }
    });

    if (utilities.storageAvailable('localStorage')) { localStorage.setItem('_todoItems', JSON.stringify(this._todoItems)); }
    
    this.renderToDoItemLabelUpdate(todoItemId, newLabel);
    return true;
}


TodoList.prototype.renderAllTodoItems = function() {
    const generateTodoItemHTML = (id, label, completionState) => `
        <li class="todo-list__item" data-item-id="${id}">
            <input type="checkbox" aria-labelledby="item${id}-checkbox-label" ${completionState === 'done' ? 'checked' : ''}>
            <span id="item${id}-checkbox-label" role="textbox" contenteditable spellcheck="false">${label}</span>
            <button type="button" class="button--secondary js-todo-delete-button">
                <span class="!visually-hidden">Delete to do item named ${label}</span>
                <img src="assets/bin-icon.svg" draggable="false">
            </button>
        </li>
    `;

    this.$list.innerHTML = this._todoItems.current.reduce(
        (accumulator, todoItem) => accumulator + generateTodoItemHTML(todoItem.id, todoItem.label, todoItem.completionState),
        ''
    );
}

TodoList.prototype.renderAddTodoItem = function(newTodoItem) {
    const { id, label, completionState } = newTodoItem;
    const newToDoItemElement = document.createElement('li');
    newToDoItemElement.classList.add('todo-list__item');
    newToDoItemElement.dataset.itemId = id;
    newToDoItemElement.innerHTML = `
        <input type="checkbox" aria-labelledby="item${id}-checkbox-label" ${completionState === 'done' ? 'checked' : ''}>
        <span id="item${id}-checkbox-label" role="textbox" contenteditable spellcheck="false">${label}</span>
        <button type="button" class="button--secondary js-todo-delete-button">
            <span class="!visually-hidden">Delete to do item named ${label}</span>
            <img src="assets/bin-icon.svg" draggable="false">
        </button>
    `;
    newToDoItemElement.classList.add('animate-insertion');
    this.$list.appendChild(newToDoItemElement);
}

TodoList.prototype.renderTodoItemDeletion = function(todoItemId) {
    const nodeToBeDeleted = this.$list.querySelector(`li[data-item-id="${todoItemId}"]`);
    nodeToBeDeleted.remove();
    this.updateUndoDeleteButton();
    this.updateClearCompletedButton();
}

TodoList.prototype.renderUndoLastTodoDeletion = function() {
    this.renderAllTodoItems();
    this.updateUndoDeleteButton();
    this.updateClearCompletedButton();
};

TodoList.prototype.renderClearCompleted = function() {
    this.renderAllTodoItems();
    this.updateClearCompletedButton();
};

TodoList.prototype.renderToDoItemLabelUpdate = function(todoItemId, newLabel) {
    const nodeToBeUpdated = this.$list.querySelector(`li[data-item-id="${todoItemId}"] .js-todo-delete-button > span`);
    nodeToBeUpdated.textContent = `Delete to do item named ${newLabel}`
}

TodoList.prototype.updateUndoDeleteButton = function () {
    this.$undoDeleteButton.disabled = this._todoItems.deleted.length ? false : true;
};

TodoList.prototype.updateClearCompletedButton = function() {
    this.$clearCompletedButton.disabled = !this._todoItems.current.some(todoItem => todoItem.completionState === 'done');
    const numberOfCompletedTodos = this._todoItems.current.filter(todoItem => todoItem.completionState === 'done').length;
    this.$clearCompletedButton.textContent = `Clear ${numberOfCompletedTodos > 0 ? `${numberOfCompletedTodos} ` : ''}completed`;
};

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
