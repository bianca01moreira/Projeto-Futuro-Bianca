from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# >>>>>> COLOQUE SUA SENHA AQUI <<<<<<
DATABASE_URL = "postgresql+psycopg2://postgres:SUA_SENHA@localhost:5432/cursos_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()