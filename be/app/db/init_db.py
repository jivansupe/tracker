from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..config import settings
from ..models import Base  # Import all models
from ..models.project import Project
from ..models.employee import Employee
from ..models.associations import project_employees

def init_db():
    engine = create_engine(settings.sync_database_url)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db() 