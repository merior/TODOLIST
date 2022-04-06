const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const cache = function () {
    if (localStorage.getItem('ToDoData') != null) {
        toDoData = JSON.parse(localStorage.getItem('ToDoData'))
    
        toDoData.forEach(function (item, index) {
            if (item.text != '') {

                const li = document.createElement('li')

                li.classList.add('todo-item')

                li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>'

                li.querySelector('.todo-complete').addEventListener('click', function () {
                    item.completed = !item.completed
                    toDoData[index].complited = !item.completed
                    localStorage.setItem('ToDoData', JSON.stringify(toDoData))
                    render()
                })
            
                if (item.completed) {
                    todoCompleted.append(li)
                } else {
                    todoList.append(li)
                }
                li.querySelector('.todo-remove').addEventListener('click', function () {
                    li.remove()
                    toDoData.splice(index, 1)
                    localStorage.setItem('ToDoData', JSON.stringify(toDoData))
                })
            }
        })
    }
}

const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDoData.forEach(function (item, index) {
        if (item.text != '') {

            const li = document.createElement('li')

            li.classList.add('todo-item')

            li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

            li.querySelector('.todo-complete').addEventListener('click', function () {
                item.completed = !item.completed
                toDoData[index].complited = !item.completed
                localStorage.setItem('ToDoData', JSON.stringify(toDoData))
                render()
            })
        
            if (item.completed) {
                todoCompleted.append(li)
            } else {
                todoList.append(li)
            }
            li.querySelector('.todo-remove').addEventListener('click', function () {
                li.remove()
                toDoData.splice(index, 1)
                localStorage.setItem('ToDoData', JSON.stringify(toDoData))
            })
        }
    })
}
  
todoControl.addEventListener('submit', function (event) {
    event.preventDefault()

    const newToDo = {
        text: headerInput.value,
        completed: false
    }

    if (newToDo.text != '') {
        toDoData.push(newToDo)
        localStorage.setItem('ToDoData', JSON.stringify(toDoData))
    }
    headerInput.value = ''
    

    render()
})

cache()