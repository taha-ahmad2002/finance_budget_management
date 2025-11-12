from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, BOOLEAN
from database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True,index=True)
    email = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)

class Expense(Base):
    __tablename__ = 'expenses'
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    account = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)
    note = Column(String, nullable=False)

class Income(Base):
    __tablename__ = 'incomes'
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    account = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)
    note = Column(String, nullable=False)

class Transfer(Base):
    __tablename__ = 'transfers'
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    from_ = Column(String, nullable=False)
    to = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    note = Column(String, nullable=False)
    description = Column(String, nullable=False)