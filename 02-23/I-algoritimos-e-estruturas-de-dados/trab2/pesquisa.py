from bs4 import BeautifulSoup

import requests

# requests web page
# response = requests.get("https://www.google.com/search?q=chas+para+emagrecer")
# response = requests.get("https://ge.globo.com/futebol/brasileirao-serie-a/")
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
