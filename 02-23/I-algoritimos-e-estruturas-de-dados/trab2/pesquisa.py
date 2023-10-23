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

