import json
import os

DB_MODULOS = "modulos.json"
#Como o arquivo anterior é a base para implementar ao projeto

def cargar_modulos():
    if not os.path.exists(DB_MODULOS):
        return {}
    with open(DB_MODULOS, "r") as f:
        return json.load(f)


def guardar_modulos(modulos):
    with open(DB_MODULOS, "w") as f:
        json.dump(modulos, f, indent=4)


def cadastrar_modulo():
    modulos = cargar_modulos()

    print("\n--- CADASTRO DE MÓDULOS ---")
    nome = input("Nome do Módulo (ex: Introdução ao Python): ")

    if nome in modulos:
        print("Aviso: Esse módulo já existe e será atualizado.")

    descricao = input("Descrição do Módulo: ")
    conteudo = input("Conteúdo do Módulo: ")

    modulos[nome] = {
        "descricao": descricao,
        "conteudo": conteudo
    }

    guardar_modulos(modulos)
    print(f"Módulo '{nome}' cadastrado com sucesso!")


def listar_modulos():
    modulos = cargar_modulos()
    if not modulos:
        print("\nNenhum módulo cadastrado ainda.")
        return

    print("\n--- MÓDULOS DO CURSO ---")
    for nome, info in modulos.items():
        print(f"\nMódulo: {nome}")
        print(f"Descrição: {info['descricao']}")
        print(f"Conteúdo: {info['conteudo']}")
        print("-" * 20)