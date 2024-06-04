from pydantic import BaseModel
from sqlalchemy.orm import Session


class TodoListBase(BaseModel):
    task:str

class TodoList(TodoListBase):
        id: int
        is_complete: bool
        class Config:
            from_attributes=True


       
    
