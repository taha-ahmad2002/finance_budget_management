from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# ------------------- User -------------------
class UserCreate(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True


# ------------------- Expense -------------------
class ExpenseBase(BaseModel):
    description: Optional[str] = None
    amount: int
    note: Optional[str] = None
    created_at: datetime
    account: str
    category: str


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseOut(ExpenseBase):
    amount: int
    note: Optional[str] = None
    created_at: datetime
    account: str
    category: str
    description: str
    id:str
    user_id:str
    class Config:
        orm_mode = True

# ------------------- Income -------------------
class IncomeBase(BaseModel):
    description: Optional[str] = None
    amount: int
    note: Optional[str] = None
    created_at: datetime
    account: str
    category: str


class IncomeCreate(IncomeBase):
    pass


class IncomeOut(IncomeBase):
    amount: int
    note: Optional[str] = None
    created_at: datetime
    account: str
    category: str
    description: str
    id: str
    user_id: str
    class Config:
        orm_mode = True

# ------------------- Transfer -------------------
class TransferBase(BaseModel):
    description: Optional[str] = None
    amount: int
    note: Optional[str] = None
    created_at: datetime
    from_: str
    to: str


class TransferCreate(TransferBase):
    pass


class TransferOut(TransferBase):
    amount: int
    note: Optional[str] = None
    created_at: datetime
    from_: str
    to:str
    description: str
    id: str
    user_id: str
    class Config:
        orm_mode = True

# ------------------- Token -------------------
class Token(BaseModel):
    access_token: str
    token_type: str
