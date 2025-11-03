from fastapi import FastAPI, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from models import User, Expense, Income, Transfer
from schemas import UserCreate, UserOut, ExpenseCreate, ExpenseOut, Token, IncomeCreate, TransferCreate, IncomeOut, TransferOut
from auth import (
    get_db,
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    get_user_by_email,
)

ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo List API with SQLAlchemy + JWT")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js app URL
    allow_credentials=True,                   # allow cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------- AUTH ROUTES -------------------
@app.post("/signup", response_model=dict)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = get_password_hash(user_data.password)
    new_user = User(email=user_data.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@app.post("/login", response_model=Token)
def login( response: Response,form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="none"  # "strict" or "none" for cross-site
    )
    # response.headers["Authorization"] = f"Bearer {access_token}"
    return {"access_token": access_token, "token_type": "bearer"}


# ------------------- Expense ROUTES -------------------
@app.post("/expenses/",response_model=ExpenseOut)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_expense = Expense(amount=expense.amount, description=expense.description, user_id=current_user.id,account=expense.account,category=expense.category,created_at=expense.created_at,note=expense.note)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense


@app.get("/expenses/",response_model=list[ExpenseOut])
def get_expenses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expenses = db.query(Expense).filter(Expense.user_id == current_user.id).all()
    return expenses


@app.put("/expenses/{expense_id}",response_model=ExpenseOut)
def update_expense(expense_id: int, expense_data: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or unauthorized")
    expense.amount = expense_data.amount
    expense.description = expense_data.description
    expense.created_at = expense_data.created_at
    expense.category = expense_data.category
    expense.account=expense_data.account
    expense.note=expense_data.note
    db.commit()
    db.refresh(expense)
    return expense


@app.delete("/expenses/{expense_id}", response_model=dict)
def delete_expense(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or unauthorized")

    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}


@app.get("/expenses/{expense_id}",response_model=ExpenseOut)
def get_expense_by_id(expense_id:int, db:Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    expense=db.query(Expense).filter(Expense.id==expense_id, Expense.user_id == current_user.id).first()
    return expense

# ------------------- Income ROUTES -------------------
@app.post("/incomes/",response_model=IncomeOut)
def create_income(income: IncomeCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_income = Income(amount=income.amount, description=income.description, user_id=current_user.id,account=income.account,category=income.category,created_at=income.created_at,note=income.note)
    db.add(new_income)
    db.commit()
    db.refresh(new_income)
    return new_income


@app.get("/incomes/",response_model=list[IncomeOut])
def get_incomes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    incomes = db.query(Income).filter(Income.user_id == current_user.id).all()
    return incomes


@app.put("/incomes/{income_id}",response_model=IncomeOut)
def update_income(income_id: int, income_data: IncomeCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    income = db.query(Income).filter(Income.id == income_id, Income.user_id == current_user.id).first()
    if not income:
        raise HTTPException(status_code=404, detail="Income not found or unauthorized")
    income.amount = income_data.amount
    income.description = income_data.description
    income.created_at = income_data.created_at
    income.category = income_data.category
    income.account=income_data.account
    income.note=income_data.note
    db.commit()
    db.refresh(income)
    return income


@app.delete("/incomes/{income_id}", response_model=dict)
def delete_income(income_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    income = db.query(Income).filter(Income.id == income_id, Income.user_id == current_user.id).first()
    if not income:
        raise HTTPException(status_code=404, detail="Income not found or unauthorized")

    db.delete(income)
    db.commit()
    return {"message": "Income deleted successfully"}




# ------------------- Transfer ROUTES -------------------
@app.post("/transfers/",response_model=TransferOut)
def create_transfer(transfer: TransferCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_transfer = Transfer(amount=transfer.amount, description=transfer.description, user_id=current_user.id,from_=transfer.from_,to=transfer.to,created_at=transfer.created_at,note=transfer.note)
    db.add(new_transfer)
    db.commit()
    db.refresh(new_transfer)
    return new_transfer


@app.get("/transfers/",response_model=list[TransferOut])
def get_transfers(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    transfers = db.query(Transfer).filter(Transfer.user_id == current_user.id).all()
    return transfers


@app.put("/transfers/{transfer_id}",response_model=TransferOut)
def update_transfer(transfer_id: int, transfer_data: TransferCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    transfer = db.query(Transfer).filter(Transfer.id == transfer_id, Transfer.user_id == current_user.id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found or unauthorized")
    transfer.amount = transfer_data.amount
    transfer.description = transfer_data.description
    transfer.created_at = transfer_data.created_at
    transfer.to = transfer_data.to
    transfer.from_ = transfer_data.from_
    transfer.note=transfer_data.note
    db.commit()
    db.refresh(transfer)
    return transfer


@app.delete("/transfers/{transfer_id}", response_model=dict)
def delete_transfer(transfer_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    transfer = db.query(Transfer).filter(Transfer.id == transfer_id, Transfer.user_id == current_user.id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Todo not found or unauthorized")

    db.delete(transfer)
    db.commit()
    return {"message": "Transfer deleted successfully"}

@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        samesite="none",
        secure=True,
    )
    return {"message": "Logged out successfully"}
