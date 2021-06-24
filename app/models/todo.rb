class Todo < ApplicationRecord
    self.table_name = "todos"
    self.primary_key = "id"
end