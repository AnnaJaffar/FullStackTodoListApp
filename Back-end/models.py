from sqlalchemy import Boolean, Column, Integer, String
from dbconnection import Base

class TodoList(Base):
    __tablename__ = "todolists"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    task = Column(String)
    is_complete = Column(Boolean, default=False)
