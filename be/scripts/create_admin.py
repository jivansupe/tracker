import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.base import SessionLocal
from database.repository import UserRepository
from models import UserCreate

def create_admin_user():
    db = SessionLocal()
    try:
        admin_user = UserCreate(
            email="admin@example.com",
            username="admin",
            password="admin"
        )
        user = UserRepository.get_user_by_username(db, username="admin")
        if not user:
            UserRepository.create_user(db=db, user=admin_user)
            print("Admin user created successfully")
        else:
            print("Admin user already exists")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user() 