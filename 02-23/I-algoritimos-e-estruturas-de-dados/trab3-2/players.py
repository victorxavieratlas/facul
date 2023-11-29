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


def states():
    # Gráfico de Pizza
    titulo("Comparativo das 4 Maiores Faculdades Formadoras")

    faculdades = []
    num = []

    for player in players:
        if player["college"] in faculdades:
            indice = faculdades.index(player["college"])
            num[indice] += 1
        else:
            faculdades.append(player["college"])
            num.append(1)

    
    num2, faculdade2 = zip(*sorted(zip(num, faculdades), reverse=True))

    melhores_faculdades = f"{faculdade2[0]}_{faculdade2[1]}_{faculdade2[2]}_{faculdade2[3]}".split("_")
    valores = int(num2[0]), int(num2[1]), int(num2[2]), int(num2[3])

    print("Faculdades...:  Drafts..:")
    print(f"{melhores_faculdades[0]:15} {valores[0]}")
    print(f"{melhores_faculdades[1]:15} {valores[1]}")
    print(f"{melhores_faculdades[2]:15} {valores[2]}")
    print(f"{melhores_faculdades[3]:15} {valores[3]}")

    fig, ax = plt.subplots()
    ax.pie(valores, labels=melhores_faculdades, autopct="%.1f%%")

    plt.show()


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
