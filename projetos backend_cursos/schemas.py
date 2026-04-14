from pydantic import BaseModel
from typing import List

class MaquinaCreate(BaseModel):
    linha_equipamento: str
    modelo_equipamento: str

class MaquinaOut(MaquinaCreate):
    id: int
    class Config:
        orm_mode = True

class CursoCreate(BaseModel):
    nome: str
    nivel: str
    disponivel_publico: bool
    conteudo: str
    maquinas_ids: List[int]
    modulos: List[str]

class CursoOut(BaseModel):
    id: int
    nome: str
    nivel: str
    disponivel_publico: bool
    conteudo: str
    maquinas: List[MaquinaOut]
    modulos: List[str]

    class Config:
        orm_mode = True