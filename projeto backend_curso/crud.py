from sqlalchemy.orm import Session
from models import Curso, Maquina, Modulo

def criar_maquina(db: Session, maquina):
    db_maquina = Maquina(**maquina.dict())
    db.add(db_maquina)
    db.commit()
    db.refresh(db_maquina)
    return db_maquina


def listar_maquinas(db: Session):
    return db.query(Maquina).all()


def deletar_maquina(db: Session, maquina_id: int):
    maquina = db.query(Maquina).filter(Maquina.id == maquina_id).first()

    if not maquina:
        raise Exception("Máquina não encontrada")

    if maquina.cursos:
        raise Exception("Máquina está vinculada a um curso. Remova do curso antes de deletar.")

    db.delete(maquina)
    db.commit()


def criar_curso(db: Session, curso):
    db_curso = Curso(
        nome=curso.nome,
        nivel=curso.nivel,
        disponivel_publico=curso.disponivel_publico,
        conteudo=curso.conteudo
    )

    maquinas = db.query(Maquina).filter(Maquina.id.in_(curso.maquinas_ids)).all()
    db_curso.maquinas = maquinas

    db.add(db_curso)
    db.commit()
    db.refresh(db_curso)

    for nome_modulo in curso.modulos:
        modulo = Modulo(nome=nome_modulo, curso_id=db_curso.id)
        db.add(modulo)

    db.commit()
    return db_curso


def listar_cursos(db: Session):
    return db.query(Curso).all()


def deletar_curso(db: Session, curso_id: int):
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise Exception("Curso não encontrado")
    db.delete(curso)
    db.commit()