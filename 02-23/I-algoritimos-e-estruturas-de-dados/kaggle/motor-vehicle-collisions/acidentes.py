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

