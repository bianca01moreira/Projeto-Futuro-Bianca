from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

curso_maquina = Table(
    "curso_maquina",
    Base.metadata,
    Column("curso_id", Integer, ForeignKey("cursos.id", ondelete="CASCADE")),
    Column("maquina_id", Integer, ForeignKey("maquinas.id", ondelete="CASCADE"))
)

class Curso(Base):
    __tablename__ = "cursos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    nivel = Column(String, nullable=False)
    disponivel_publico = Column(Boolean, default=True)
    conteudo = Column(String, nullable=False)

    maquinas = relationship("Maquina", secondary=curso_maquina, back_populates="cursos")
    modulos = relationship("Modulo", back_populates="curso", cascade="all, delete")


class Maquina(Base):
    __tablename__ = "maquinas"

    id = Column(Integer, primary_key=True, index=True)
    linha_equipamento = Column(String, nullable=False)
    modelo_equipamento = Column(String, nullable=False)

    cursos = relationship("Curso", secondary=curso_maquina, back_populates="maquinas")


class Modulo(Base):
    __tablename__ = "modulos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    curso_id = Column(Integer, ForeignKey("cursos.id", ondelete="CASCADE"))

    curso = relationship("Curso", back_populates="modulos")