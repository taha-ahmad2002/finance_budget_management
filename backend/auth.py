from datetime import datetime, timedelta, timezone

from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends,Request
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from sqlalchemy import select

SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ------------------- PASSWORD UTILS -------------------
def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


# ------------------- TOKEN UTILS -------------------
def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ------------------- DB DEPENDENCY -------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------- USER HELPERS -------------------
def get_user_by_email(db: Session, email: str):
    return db.execute(select(User).where(User.email == email)).scalar_one_or_none()



def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication cookie",
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

