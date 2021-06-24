# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Project.create([
    {title: "Семья"},
    {title: "Работа"},
    {title: "Прочее"},
])
Todo.create([
    {text: "Купить молоко", is_completed: false, category_id: 1},
    {text: "Заменить масло в двигателе до 23 апреля", is_completed: false, category_id: 1},
    {text: "Отправить письмо бабушке", is_completed: true, category_id: 1},
    {text: "Заплатить за квартиру", is_completed: false, category_id: 1},
    {text: "Забрать обувь из ремонта", is_completed: false, category_id: 1},

    {text: "Позвонить заказчику", is_completed: true, category_id: 2},
    {text: "Отправить документы", is_completed: true, category_id: 2},
    {text: "Заполнить отчет", is_completed: false, category_id: 2},

    {text: "Позвонить другу", is_completed: false, category_id: 3},
    {text: "Подготовиться к поездке", is_completed: false, category_id: 3}
])