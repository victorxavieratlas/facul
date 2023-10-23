from bs4 import BeautifulSoup

import requests

def titulo(texto, sublinhado="-"):
    print()
    print(texto)
    print(sublinhado*40)

def extrair_filmes(texto):
    generos = [
        "Ação e Aventura", "Filmes de Animações", "Filmes de comédia",
        "Documentários", "Dramas", "Ficção Científica", "Filmes de Guerra",
        "Filmes Históricos", "Romances", "Terror e Suspense"
    ]
    
    filme_dict = {}
    for genero in generos:
        inicio = texto.find(genero) + len(genero)
        fim = texto.find(generos[generos.index(genero) + 1]) if generos.index(genero) + 1 < len(generos) else None
        filmes = texto[inicio:fim].split(")")[0:-1] if fim else texto[inicio:].split(")")
        
        filme_dict[genero] = []
        for filme in filmes:
            split_data = filme.rsplit('(', 1)
            if len(split_data) > 1:
                titulo = split_data[0].strip()
                ano = int(split_data[1].replace(')', '').strip())
                filme_dict[genero].append({"titulo": titulo, "ano": ano})
    
    return filme_dict

response = requests.get("https://minhaseriefavorita.com/os-100-melhores-filmes-da-netflix/")
soup = BeautifulSoup(response.content, "html.parser")
texto = soup.body.get_text().strip()[1651:4320]
filmes = extrair_filmes(texto)

def listar_filmes():
    titulo('Lista de filmes')
    todos_filmes = [filme['titulo'] for lista in filmes.values() for filme in lista]
    for nome in todos_filmes:
        print(f"- {nome}")
    print("\n")

def listar_generos():
    titulo('Lista de gêneros')
    for genero in filmes.keys():
        print(f"- {genero}")
    print("\n")

def listar_generos_numerico():
    generos = list(filmes.keys())
    for index, genero in enumerate(generos, start=1):
        print(f"{index}. {genero}")
    return generos

def listar_filmes_por_genero():
    titulo('Lista de filmes por gênero')
    # Printando o dicionário de forma organizada
    for genero, lista_filmes in filmes.items():
        print(genero)
        for filme in lista_filmes:
            print(f"- {filme['titulo']} ({filme['ano']})")
        print("\n")

def listar_filmes_alfabetica():
    titulo('Lista de filmes em ordem alfabética')
    todos_filmes = [filme['titulo'] for lista in filmes.values() for filme in lista]
    todos_filmes.sort()
    for nome in todos_filmes:
        print(f"- {nome}")
    print("\n")

def listar_generos_alfabetica():
    titulo('Lista de generos em ordem alfabética')
    generos_ordenados = sorted(filmes.keys())
    for genero in generos_ordenados:
        print(f"- {genero}")
    print("\n")

def listar_filmes_por_genero_alfabetica():
    titulo('Lista de filmes por gênero em ordem alfabética')
    
    # Ordenando os gêneros alfabeticamente
    generos_ordenados = sorted(filmes.keys())
    
    for genero in generos_ordenados:
        print(genero)
        
        # Ordenando os filmes do gênero atual alfabeticamente
        lista_filmes_ordenados = sorted(filmes[genero], key=lambda x: x['titulo'])
        
        for filme in lista_filmes_ordenados:
            print(f"- {filme['titulo']} ({filme['ano']})")
        print("\n")

def agrupar_contar_filmes_por_genero():
    titulo('Número de filmes por gênero')
    
    for genero, lista_filmes in filmes.items():
        print(f"{genero}: {len(lista_filmes)} filmes")
    print("\n")
    
def agrupar_contar_filmes_por_ano():
    titulo('Número de filmes por ano')
    
    anos_dict = {}
    for lista_filmes in filmes.values():
        for filme in lista_filmes:
            ano = filme['ano']
            anos_dict[ano] = anos_dict.get(ano, 0) + 1

    # Ordenando os anos e imprimindo o resultado
    for ano in sorted(anos_dict.keys()):
        print(f"{ano}: {anos_dict[ano]} filmes")
    print("\n")

def listar_generos_filmes_unicos_ano():
    titulo('Gêneros e filmes únicos por ano de lançamento')
    
    # Criando um dicionário para agrupar os filmes por ano
    filmes_por_ano = {}
    for genero, lista_filmes in filmes.items():
        for filme in lista_filmes:
            ano = filme['ano']
            if ano not in filmes_por_ano:
                filmes_por_ano[ano] = []
            filmes_por_ano[ano].append({"titulo": filme['titulo'], "genero": genero})
    
    # Filtrando os anos que possuem apenas um filme
    anos_com_filme_unico = {ano: info[0] for ano, info in filmes_por_ano.items() if len(info) == 1}
    
    # Exibindo os filmes únicos organizados por gênero
    generos_agrupados = {}
    for ano, filme in anos_com_filme_unico.items():
        genero = filme["genero"]
        if genero not in generos_agrupados:
            generos_agrupados[genero] = []
        generos_agrupados[genero].append(filme["titulo"] + f" ({ano})")
    
    for genero, lista_filmes in generos_agrupados.items():
        print(genero)
        for titulo_ano in lista_filmes:
            print(f"- {titulo_ano}")
        print("\n")

def pesquisar():
    titulo("Pesquisa de filmes")
    print("1. Pesquisar por palavras-chave no nome do filme")
    print("2. Pesquisar por gênero")
    print("3. Pesquisar por ano de lançamento")
    
    escolha = int(input("Escolha uma opção: "))
    
    if escolha == 1:
        keyword = input("Titulo do filme: ").lower()
        encontrados = []
        
        for lista_filmes in filmes.values():
            for filme in lista_filmes:
                if keyword in filme['titulo'].lower():
                    encontrados.append(filme)
        
        if encontrados:
            titulo("Filmes encontrados")
            for filme in encontrados:
                print(f"- {filme['titulo']} ({filme['ano']})")
        else:
            print("Nenhum filme encontrado com essa palavra-chave.")
            
    elif escolha == 2:
        titulo('Generos disponíveis:')
        generos = listar_generos_numerico()
        try:
            escolha_genero = int(input("Digite o número correspondente ao gênero desejado: "))
            genero_escolhido = generos[escolha_genero - 1]  # -1 porque a lista começa em 0, mas a exibição começa em 1
        except (ValueError, IndexError):
            print("Número inválido.")
            return

        titulo(f"Filmes de {genero_escolhido}")
        for filme in filmes[genero_escolhido]:
            print(f"- {filme['titulo']} ({filme['ano']})")
            
    elif escolha == 3:
        ano_escolhido = int(input("Digite o ano de lançamento: "))
        encontrados = []
        
        for lista_filmes in filmes.values():
            for filme in lista_filmes:
                if filme['ano'] == ano_escolhido:
                    encontrados.append(filme)
                    
        if encontrados:
            titulo(f"Filmes lançados em {ano_escolhido}")
            for filme in encontrados:
                print(f"- {filme['titulo']} ({filme['ano']})")
        else:
            print(f"Nenhum filme encontrado lançado em {ano_escolhido}.")
    
    else:
        print("Opção inválida.")

    print("\n")

def listar_filme_por_ano_cre():
    titulo('Lista de filmes por ordem crescente de ano')
    
    # Criando uma lista única de todos os filmes
    todos_filmes = [filme for lista in filmes.values() for filme in lista]
    
    # Ordenando os filmes pelo ano de lançamento em ordem crescente
    filmes_ordenados = sorted(todos_filmes, key=lambda x: x['ano'])
    
    for filme in filmes_ordenados:
        print(f"- {filme['titulo']} ({filme['ano']})")
    print("\n")

def listar_filme_por_ano_dec():
    titulo('Lista de filmes por ordem decrescente de ano')
    
    # Criando uma lista única de todos os filmes
    todos_filmes = [filme for lista in filmes.values() for filme in lista]
    
    # Ordenando os filmes pelo ano de lançamento em ordem decrescente
    filmes_ordenados = sorted(todos_filmes, key=lambda x: x['ano'], reverse=True)
    
    for filme in filmes_ordenados:
        print(f"- {filme['titulo']} ({filme['ano']})")
    print("\n")

# ------------------------------------------------- Programa Principal
while True:
    titulo("Conjuntos: Manipulação dos melhores filmes da Netflix")
    print("1.  Listar filmes")
    print("2.  Listar gêneros")
    print("3.  Listar filmes separados por gênero")
    print("4.  Listar filmes em ordem alfabética")
    print("5.  Listar gêneros em ordem alfabética")
    print("6.  Listar filmes separados por gênero em ordem alfabética")
    print("7.  Agrupar e contar número de filmes por gênero")
    print("8.  Agrupar e contar número de filmes por ano")
    print("9.  Listar quais gêneros e filmes possuem lançamento único no ano")
    print("10. Pesquisar filmes por palavras-chave, ano ou gênero")
    print("11. Listar filme por ano de lançamento crescente")
    print("12. Listar filme por ano de lançamento decrescente")
    print("13. Sair")
    opcao = int(input("Opção: "))
    if opcao == 1:
        listar_filmes()
    elif opcao == 2:
        listar_generos()
    elif opcao == 3:
        listar_filmes_por_genero()
    elif opcao == 4:
        listar_filmes_alfabetica()
    elif opcao == 5:
        listar_generos_alfabetica()
    elif opcao == 6:
        listar_filmes_por_genero_alfabetica()
    elif opcao == 7:
        agrupar_contar_filmes_por_genero()
    elif opcao == 8:
        agrupar_contar_filmes_por_ano()
    elif opcao == 9:
        listar_generos_filmes_unicos_ano()
    elif opcao == 10:
        pesquisar()
    elif opcao == 11:
        listar_filme_por_ano_cre()
    elif opcao == 12:
        listar_filme_por_ano_dec()
    else:
        break
