import matplotlib.pyplot as plt
import numpy as np 
import csv

transaction = []

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


def compara_4():
# Comparativo dos Maiores Compradores (Gráfico de Pizza 
#relacionando as 4 equipes que mais compraram jogadores)
# – (coluna Team_to)

    titulo("Comparativo dos 4 Maiores Compradores")

    clubes = []
    num = []

    for linha in transaction:
        if linha["Team_to"] in clubes:
            indice = clubes.index(linha["Team_to"])
            num[indice] += 1
        else:
            clubes.append(linha["Team_to"])
            num.append(1)

    
    num2, clube2 = zip(*sorted(zip(num, clubes), reverse=True))

    times = f"{clube2[0]}_{clube2[1]}_{clube2[2]}_{clube2[3]}".split("_")
    valores = [int(num[0]), int(num[1]), int(num[2]), int(num[3]),]

    print(times, valores)
    fig, ax = plt.subplots()
    ax.pie(valores, labels=times, autopct="%.1f%%")

    plt.show()

def compara_PL():

    anos = ['2012-2013', '2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018']
    temps = [0, 0, 0, 0, 0, 0]

    for linha in transaction:
        if linha["League_to"] == "Premier League":
            if linha["Season"] == anos[0]:
                temps[0] += 1
            elif linha["Season"] == anos[1]:
                temps[1] += 1
            elif linha["Season"] == anos[2]:
                temps[2] += 1
            elif linha["Season"] == anos[3]:
                temps[3] += 1
            elif linha["Season"] == anos[4]:
                temps[4] += 1
            elif linha["Season"] == anos[5]:
                temps[5] += 1

    x = np.arange(6)

    width = 0.2
    # plot data in grouped manner of bar type 
    plt.bar(x-0.3, temps[0], width, color='red') 
    plt.bar(x-0.2, temps[1], width, color='blue')
    plt.bar(x-0.1, temps[2], width, color='green')
    plt.bar(x+0.1, temps[3], width, color='yellow')
    plt.bar(x+0.2, temps[4], width, color='orange')
    plt.bar(x+0.3, temps[5], width, color='purple')

    plt.xticks(x, anos) 
    plt.xlabel("Anos") 
    plt.ylabel("Quantidade de transferências") 
    plt.legend([anos[0], anos[1], anos[2], anos[3], anos[4], anos[5]]) 
    plt.show() 

