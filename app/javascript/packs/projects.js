const Push = require("../../../vendor/push");
const ModalWindow = require("../../../vendor/modal");
window.updateTodo = function(elem, id, projectId) {
    if (!elem.checked) {
        $(`.todo-text-id-${id}`).removeClass('todo-checked');
    }
    else {
        $(`.todo-text-id-${id}`).addClass('todo-checked');
    }
    $.ajax({
        headers: {
            'X-Transaction': 'PATCH Todos',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        url: `/api/projects/${projectId}/todo/${id}`,
        method: 'PATCH',
        data: {isChecked: elem.checked},
        async: false,
    }).fail((data) => console.log(data));
}
window.projectModal = new ModalWindow();
window.projectModal.setSize("30vw", "auto");
window.showAddProjectModal = function() {
    content = `
        <header class="modal-content__header">Новая задача</header>
        <div class="modal-content__main modal-main">
            <input type="text" class="modal-main__field todo-name-field" placeholder="Название задачи..." />`;
    var projects;
    $.ajax({
        url: '/api/projects',
        method: 'GET',
        async: false
    }).done((data) => { projects = data; });
    var options = '';
    for (let i in projects) {
        options += `<option value="${projects[i]['id']}">${projects[i]['title']}</option>\n`;
    }
    content += `
            <select class="modal-main__field select-project-field" oninput="changeNewCategoryState(this);">
                <option selected disabled hidden>Категория</option>
                ${options}
                <option value="new">Новая категория...</option>
            </select>
            <input type="hidden" class="modal-main__field category-name-field" placeholder="Название категории..." />
            <div class="modal-main__buttons control-buttons">
                <button class="control-buttons__cancel cancel-button" onclick="projectModal.destroyWindow();">Отмена</button>
                <button class="control-buttons__submit submit-buttom" onclick="createTodo();">Ок</button>
            </div>
        </div>
    `;
    projectModal.setContent(content);
    projectModal.createWindow();
}
window.changeNewCategoryState = function(elem) {
    $('.category-name-field').attr('type', elem.value == 'new' ? 'text' : 'hidden');
}
window.createTodo = function() {
    var data = {}
    data['todo_name'] = $('.todo-name-field').val();
    data['project'] = $('.select-project-field').val();
    data['category_name'] = $('.category-name-field').val();
    if ((data['project'] == 'new' && data['category_name'] != '') || data['project'] != 'new') {
        $('.category-name-field').css({ 'border-color': '#d7d7d7' });
    }
    if (data['todo_name'] == '' || data['project'] == null) {
        $('.todo-name-field').css({ 'border-color': data['todo_name'] == '' ? '#dd555599' : '#d7d7d7' });
        $('.select-project-field').css({ 'border-color': data['project'] == null ? '#dd555599' : '#d7d7d7' });
        new Push('error', 'Заполните выделенные поля!');
    }
    else {
        $('.todo-name-field').css({ 'border-color': '#d7d7d7' });
        $('.select-project-field').css({ 'border-color': '#d7d7d7' });
        if (data['project'] == 'new' && data['category_name'] == '') {
            $('.category-name-field').css({ 'border-color': '#dd555599' });
            new Push('error', 'Заполните выделенные поля!');
        }
        else {
            $.ajax({
                headers: {
                    'X-Transaction': 'POST Todos',
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                url: `/api/todos`,
                method: 'POST',
                data: data,
                async: false,
            }).done(data => {
                new Push('success', 'Задача успешно добавлена!');
                setTimeout(() => document.location.reload(), 600);
            }).fail(data => console.log(data.responseText));
        }
    }
}