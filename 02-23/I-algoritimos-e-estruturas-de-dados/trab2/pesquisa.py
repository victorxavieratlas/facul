from bs4 import BeautifulSoup

import requests

def titulo(texto, sublinhado="-"):
    print()
    print(texto)
    print(sublinhado*40)

response = requests.get("https://minhaseriefavorita.com/os-100-melhores-filmes-da-netflix/")

# obtém o código HTML da página "requisitada"
html = response.text

# faz um "parse" (conversão/ajuste) da página HTML
soup = BeautifulSoup(html, "html.parser")

# obtém apenas o texto do código do "body" da página 
texto = soup.body.get_text().strip()

print(texto[1651:4320])
#print(texto[:-8000])
# print(texto)
