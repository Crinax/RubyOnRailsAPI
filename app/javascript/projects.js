function updateTodo(event, id) {
    if (!elem.checked) {
        $(`.todo-text-id-${id}`).removeClass('todo-checked');
    }
    else {
        $(`.todo-text-id-${id}`).addClass('todo-checked');
    }
}
console.log($.ajax({
    url: '/api/projects',
    method: 'GET',
    async: false
}));
console.log('asd');