# import matplotlib.pyplot as plt
import csv

acidentes = []

def carrega_dados():
    with open('Motor_Vehicle_Collisions_-_Crashes.csv', mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for linha in csv_reader:
            acidentes.append(linha) # lista de dicioários

def titulo(texto, traco="="):
    print()
    print(texto)
    print(traco*40)

def visao_geral():
    titulo("Visão Geral")

    total = len(acidentes)
    total_feridos = 0
    total_mortos = 0

    for acidente in acidentes:
        # se o atributo (nesta linha) tiver conteúdo
        if acidente["NUMBER OF PERSONS INJURED"]:
            total_feridos += int(acidente["NUMBER OF PERSONS INJURED"])

        if acidente["NUMBER OF PERSONS KILLED"]:
            total_mortos += int(acidente["NUMBER OF PERSONS KILLED"])
    
    # uso de separador de milhares (,)
    # print(f"Nº Total de Acidetes: {total:,.0f}")

    # uso de separador de milhares (_)
    # print(f"Nº Total de Acidetes: {total:_.0f}")

    # uso de separador de milhares (_), substituindo por (.)
    print(f"Nº Total de Acidetes: {total:_.0f}".replace("_", "."))
    print(f"Nº Total de Feridos: {total_feridos:,.0f}".replace("_", "."))
    print(f"Nº Total de Mortos: {total_mortos:,.0f}".replace("_", "."))

def  acidentes_bairro():
    titulo("Acidentes por Bairro")

    bairros = []
    numeros = []

    for acidente in acidentes:
        if acidente["BOROUGH"] in bairros:              
            indice = bairros.index(acidente["BOROUGH"])
            numeros[indice] += 1
        else:
            bairros.append(acidente["BOROUGH"])
            numeros.append(1)

    numeros2, bairros2 = zip(*sorted(zip(numeros, bairros), reverse=True))
    
    print(f"Bairros:............. Acidentes:")
    
    for bai, num in zip(bairros2, numeros2):
        if bai == "":
            bai = "Sem Bairro"
        print(f"{bai:20} {num:>11d}")

    # for bairro in bairros:
    #     print(f"{bairro}")
        
    # for bai, cont2 in (bairros, cont):
    #     print(f"Bairro:....................... Acidentes:")
    #     print(f"{bai:30} {cont2}")

def grafico_bairro():
    titulo("Gráfico por Bairro/Ano")

def grafico_mf():
    titulo("Gráfico por Mortos/Feridos")


# --------------------- programa principal
carrega_dados()
while True:
    titulo("Acidentes Automotivos: New York", "=")
    print("1. Visão Geral")
    print("2. Acidentes por Bairro")
    print("3. Gráfico por Bairro/Ano")
    print("4. Gráfico por Mortos/Feridos")
    print("5. Finalizar")
    opcao = int(input("Opção: "))
    if opcao == 1:
        visao_geral()
    elif opcao == 2:
        acidentes_bairro()
    elif opcao == 3:
        grafico_bairro()
    elif opcao == 4:
        grafico_mf()
    else:
        break