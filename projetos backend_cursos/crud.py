from sqlalchemy.orm import Session
from models import Curso, Maquina, Modulo

def criar_maquina(db: Session, dados):
    maquina = Maquina(**dados.dict())
    db.add(maquina)
    db.commit()
    db.refresh(maquina)
    return maquina

def listar_maquinas(db: Session):
    return db.query(Maquina).all()

def deletar_maquina(db: Session, maquina_id: int):
    maquina = db.query(Maquina).get(maquina_id)
    if not maquina:
        raise Exception("Máquina não encontrada")
    if maquina.cursos:
        raise Exception("Essa máquina está vinculada a um curso.")
    db.delete(maquina)
    db.commit()

def criar_curso(db: Session, dados):
    curso = Curso(
        nome=dados.nome,
        nivel=dados.nivel,
        disponivel_publico=dados.disponivel_publico,
        conteudo=dados.conteudo
    )

    maquinas = db.query(Maquina).filter(Maquina.id.in_(dados.maquinas_ids)).all()
    curso.maquinas = maquinas

    db.add(curso)
    db.commit()
    db.refresh(curso)

    for nome_modulo in dados.modulos:
        modulo = Modulo(nome=nome_modulo, curso_id=curso.id)
        db.add(modulo)

    db.commit()
    return curso

def listar_cursos(db: Session):
    return db.query(Curso).all()

def deletar_curso(db: Session, curso_id: int):
    curso = db.query(Curso).get(curso_id)
    if not curso:
        raise Exception("Curso não encontrado")
    db.delete(curso)
    db.commit()