import requests

# requests web page
# response = requests.get("https://www.google.com/search?q=chas+para+emagrecer")
# response = requests.get("https://ge.globo.com/futebol/brasileirao-serie-a/")
response = requests.get("https://minhaseriefavorita.com/os-100-melhores-filmes-da-netflix/")

# obtém o código HTML da página "requisitada"
html = response.text
