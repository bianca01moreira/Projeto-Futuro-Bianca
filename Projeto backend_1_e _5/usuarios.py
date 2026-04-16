import json
import os

DB_FILE = "usuarios.json"
#DB_FILE pode ser reemplazado por o arquivo base que ja temos
def all_usuarios():
    if not os.path.exists(DB_FILE):
        return {"admin": "1234"}
    with open(DB_FILE, "r") as f:
        return json.load(f)


def guardar_usuarios(usuarios):
    with open(DB_FILE, "w") as f:
        json.dump(usuarios, f, indent=4)


def sistema():
    usuarios_db = all_usuarios()
    usuario_atual = None

    while True:
        if not usuario_atual:
            print("\n--- SISTEMA DE ACCESO ---")
            print("1. Login")
            print("2. Cadastrar-se")
            print("3. Sair do programa")

            opcao = input("Seleccione: ")

            if opcao == "1":
                user = input("Usuario: ")
                password = input("Senha: ")

                if user in usuarios_db:
                    if usuarios_db[user] == password:
                        print(f"\n ¡Sucesso! Bem-vindo {user}.")
                        usuario_atual = user
                    else:
                        print("\n Error: Senha incorreta.")
                else:
                    print("\n Error: O usuario nao existe.")

            elif opcao == "2":
                novo_user = input("Nome para novo usuario: ")
                if novo_user in usuarios_db:
                    print("Este usuario ja está cadastrado.")
                else:
                    nova_pass = input("Crie su senha: ")
                    usuarios_db[novo_user] = nova_pass
                    guardar_usuarios(usuarios_db)
                    print(f" Usuario '{novo_user}' criado e incluido no sistema.")

            elif opcao == "3":
                break

        else:
            print(f"\n--- PANEL DE CONTROL ({usuario_atual}) ---")
            print("1. Meus dados")
            print("2. Logout (Fechar sessao)")

            accao = input("Seleccione: ")

            if accao == "1":
                print(f"Usuario ativo: {usuario_atual}")
            elif accao == "2":
                print(f"Fechando sessao de {usuario_atual}...")
                usuario_atual = None
                print("Desconectado corretamente.")


if __name__ == "__main__":
    sistema()
