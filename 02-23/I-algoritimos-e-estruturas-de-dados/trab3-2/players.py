import matplotlib.pyplot as plt
import numpy as np 
import csv

players = []

def carrega_dados():
    with open('all_seasons.csv', mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for linha in csv_reader:
            players.append(linha) # lista de dicioários

def titulo(texto, traco="="):
    print()
    print(texto)
    print(traco*40)

def resumo():
    jogadores = 0
    total_idade = 0

    menor_jogador = 300
    menor_jogador_nome = ""
    menor_jogador_time = ""
    menor_jogador_epoca = ""
    
    maior_jogador = 0
    maior_jogador_nome = ""
    maior_jogador_time = ""
    maior_jogador_epoca = ""

    for player in players:
        jogadores += 1
        total_idade += float(player["age"])

        if float(player["player_height"]) >= maior_jogador:
            maior_jogador = float(player["player_height"])
            maior_jogador_nome = player["player_name"]
            maior_jogador_time = player["team_abbreviation"]
            maior_jogador_epoca = player["draft_year"]

        elif float(player["player_height"]) <= menor_jogador:
            menor_jogador = float(player["player_height"])
            menor_jogador_nome = player["player_name"]
            menor_jogador_time = player["team_abbreviation"]
            menor_jogador_epoca = player["draft_year"]

    media_idade = total_idade / jogadores
    
    print(f"Nº total de jogadores: {jogadores}")
    print(f"Média de Idade: {round(media_idade, 2)}")

    print(f".............. Nome...............: Time.: Epoca: Altura.:")
    print(f"Menor Jogador: {menor_jogador_nome:20} {menor_jogador_time:6} {menor_jogador_epoca:6} {round(menor_jogador, 2):6}cm")

    print()
    print(f".............. Nome...............: Time.: Epoca: Altura.:")
    print(f"Maior Jogador: {maior_jogador_nome:20} {maior_jogador_time:6} {maior_jogador_epoca:6} {round(maior_jogador, 2):6}cm")



# --------------------- programa principal
carrega_dados()

while True:
    titulo("Visitantes Estrangeiros no Japão")
    print("1. Resumo dos Jogadores da NBA")
    print("2. Comparativo das 4 Maiores Faculdades Formadoras")
    print("3. Comparativo de Drafts de Time Específico por Temporada")
    print("4. Finalizar")
    opcao = int(input("Opção: "))
    if opcao == 1:
        resumo()
    elif opcao == 2:
        states()
    elif opcao == 3:
        seasons()
    else:
        break
