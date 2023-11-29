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
