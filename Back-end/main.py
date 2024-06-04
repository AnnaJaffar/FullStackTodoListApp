from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from schemas import TodoSchemas
import models
from dbconnection import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
import crud

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# Define the allowed origins (your React frontend URLs)
origins = [
    "http://localhost:3000",  # Add your React development server URL
    "http://localhost:5173",  # Add any other relevant URLs
]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"Data": "Working!"}

@app.get("/allToDoList/", response_model=list[TodoSchemas.TodoList])
def read_todolist(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todoList = crud.getAllTasks(db, skip=skip, limit=limit)
    return todoList

@app.post("/todo", tags=["todos"])
def createTodo(todo:TodoSchemas.TodoListBase,db:Session=Depends(get_db)):
    return crud.createNewTask(todo=todo,db=db)

@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, db:Session=Depends(get_db)) -> bool:
    return crud.updateTask(db=db,idToUpdate=id)

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int, db:Session=Depends(get_db)) -> dict:
    return crud.deleteTask(db=db,idToDelete=id)
