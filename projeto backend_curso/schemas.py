from pydantic import BaseModel
from typing import List

class MaquinaBase(BaseModel):
    linha_equipamento: str
    modelo_equipamento: str

class MaquinaCreate(MaquinaBase):
    pass

class MaquinaOut(MaquinaBase):
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


class ModuloOut(BaseModel):
    id: int
    nome: str
    class Config:
        orm_mode = True


class CursoOut(BaseModel):
    id: int
    nome: str
    nivel: str
    disponivel_publico: bool
    conteudo: str
    maquinas: List[MaquinaOut] = []
    modulos: List[ModuloOut] = []
    class Config:
        orm_mode = True