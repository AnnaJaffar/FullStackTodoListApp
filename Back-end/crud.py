from sqlalchemy.orm import Session


import models
 
from schemas import TodoSchemas

def getAllTasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.TodoList).offset(skip).limit(limit).all()

def createNewTask(todo:TodoSchemas.TodoListBase,db: Session):
    db_task = models.TodoList(task=todo.task)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def updateTask(db:Session, idToUpdate:int):
    todo = db.query(models.TodoList).filter_by(id=idToUpdate).first()
    if todo:
         todo.is_complete = True
         db.commit()
         db.refresh(todo)
         print(f"Todo item with id {idToUpdate} marked as complete.")
         return True
    else:
        print(f"No todo item found with id {idToUpdate}.")
        return False

def deleteTask(idToDelete:int,db:Session):
    id=db.query(models.TodoList).filter_by(id=idToDelete).delete()
    if id>0:
        db.commit()
        return {
            "message": f"{id} Task with ID {idToDelete} deleted successfully"
        }
    else:
        return {"message": f"Id: {idToDelete} was not found in the list "}
