from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema Cursos PostgreSQL")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/maquinas", response_model=schemas.MaquinaOut)
def criar_maquina(maquina: schemas.MaquinaCreate, db: Session = Depends(get_db)):
    return crud.criar_maquina(db, maquina)

@app.get("/maquinas", response_model=list[schemas.MaquinaOut])
def listar_maquinas(db: Session = Depends(get_db)):
    return crud.listar_maquinas(db)

@app.delete("/maquinas/{maquina_id}")
def deletar_maquina(maquina_id: int, db: Session = Depends(get_db)):
    try:
        crud.deletar_maquina(db, maquina_id)
        return {"msg": "Máquina deletada"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/cursos")
def criar_curso(curso: schemas.CursoCreate, db: Session = Depends(get_db)):
    return crud.criar_curso(db, curso)

@app.get("/cursos")
def listar_cursos(db: Session = Depends(get_db)):
    return crud.listar_cursos(db)

@app.delete("/cursos/{curso_id}")
def deletar_curso(curso_id: int, db: Session = Depends(get_db)):
    try:
        crud.deletar_curso(db, curso_id)
        return {"msg": "Curso deletado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))