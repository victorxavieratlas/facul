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

