import csv
def carrega_dados():
    with open('top250-00-19.csv', mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for linha in csv_reader:
            transaction.append(linha) # lista de dicioários

def titulo(texto, traco="="):
    print()
    print(texto)
    print(traco*40)

def resumo():
    jogadores = 0
    total_idade = 0
    menor_tran = 0
    maior_tran = 0

    for linha in transaction:
        jogadores += 1
        total_idade += int(linha["Age"])

        if int(linha["Transfer_fee"]) >= maior_tran:
            maior_tran = int(linha["Transfer_fee"])
        elif int(linha["Transfer_fee"]) <= menor_tran:
            menor_tran = int(linha["Transfer_fee"])
    
    media_idade = total_idade / jogadores
    
    print(f"Nº de jogadores: {jogadores}")
    print(f"Média de Idade: {media_idade}")
    print(f"Menor valor: {menor_tran}")
    print(f"Maior valor: {maior_tran}")


