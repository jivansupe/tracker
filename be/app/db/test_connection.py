from sqlalchemy import create_engine
from ..config import settings

def test_db_connection():
    try:
        engine = create_engine(settings.sync_database_url)
        with engine.connect() as connection:
            print("Successfully connected to database!")
    except Exception as e:
        print(f"Error connecting to database: {str(e)}")

if __name__ == "__main__":
    test_db_connection() 