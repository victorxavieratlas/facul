import csv

titanic = []

def carrega_dados():
    with open('train.csv', mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for linha in csv_reader:
            titanic.append(linha)

def titulo(texto, traco="="):
    print()
    print(texto)
    print(traco*40)

def analise_sexo():
    titulo("Análise de Passageiros: Sexo")

    num_masc = 0
    num_fem = 0

    # Primeira: obter a contagem com forma tradicional
    for linha in titanic:
        if linha["Sex"] == "male":
            num_masc += 1
        elif linha["Sex"] == "female":
            num_fem += 1
    
    # print(f"Número de Passageiros: {len(titanic)}")
    # print(f"Masculinos: {num_masc}")
    # print(f"Femininas: {num_fem}")

    # Segunda: obter a contagem com List Comprehension
    # gera uma lista e conta quantas vezes occrre
    num_masc2 = [linha["Sex"] for linha in titanic].count("male")
    num_fem2 = [linha["Sex"] for linha in titanic].count("female")

    #Terceira: obter a contagem usando List Comprehension com len e "filter"
    num_masc_sobrev = len([linha for linha in titanic if linha["Sex"] == "male" and linha["Survived"] == "1"])
    num_masc_mortos = len([linha for linha in titanic if linha["Sex"] == "male" and linha["Survived"] == "0"])

    num_fem_sobrev = len([linha for linha in titanic if linha["Sex"] == "female" and linha["Survived"] == "1"])
    num_fem_mortos = len([linha for linha in titanic if linha["Sex"] == "female" and linha["Survived"] == "0"])

    print(f"Número de Passageiros: {len(titanic)}")
    print()
    print(f"Masculinos: {num_masc2}")
    print(f" - Sobreviventes: {num_masc_sobrev}")
    print(f" - Mortos: {num_masc_mortos}")
    print()
    print(f"Femininas: {num_fem2}")
    print(f" - Sobreviventes: {num_fem_sobrev}")
    print(f" - Mortas: {num_fem_mortos}")

def analise_idade():
    titulo("Análise de Passageiros: Idade")

    num_criancas = 0
    num_jovens = 0
    num_adultos = 0
    num_idosos = 0

    # Primeira: obter a contagem com forma tradicional
    for linha in titanic:
        if linha["Age"] <= "12":
            num_criancas += 1
        elif linha["Age"] >= "13" and linha["Age"] <= "18":
            num_jovens += 1
        elif linha["Age"] >= "19" and linha["Age"] <= "60":
            num_adultos += 1
        elif linha["Age"] >= "61":
            num_idosos += 1
    
    num_criancas_sobrev = len([linha for linha in titanic if linha["Age"] <= "12" and linha["Survived"] == "1"])
    num_criancas_mortos = len([linha for linha in titanic if linha["Age"] <= "12" and linha["Survived"] == "0"])

    num_jovens_sobrev = len([linha for linha in titanic if linha["Age"] >= "13" and linha["Age"] <= "18" and linha["Survived"] == "1"])
    num_jovens_mortos = len([linha for linha in titanic if linha["Age"] >= "13" and linha["Age"] <= "18" and linha["Survived"] == "0"])

    num_adultos_sobrev = len([linha for linha in titanic if linha["Age"] >= "19" and linha["Age"] <= "60" and linha["Survived"] == "1"])
    num_adultos_mortos = len([linha for linha in titanic if linha["Age"] >= "19" and linha["Age"] <= "60" and linha["Survived"] == "0"])

    num_idosos_sobrev = len([linha for linha in titanic if linha["Age"] >= "61" and linha["Survived"] == "1"])
    num_idosos_mortos = len([linha for linha in titanic if linha["Age"] >= "61" and linha["Survived"] == "0"])

    print(f"Número de Passageiros: {len(titanic)}")
    print()
    print(f"Crianças: {num_criancas}")
    print(f" - Sobreviventes: {num_criancas_sobrev}")
    print(f" - Mortos: {num_criancas_mortos}")
    print()
    print(f"Jovens: {num_jovens}")
    print(f" - Sobreviventes: {num_jovens_sobrev}")
    print(f" - Mortos: {num_jovens_mortos}")
    print()
    print(f"Adultos: {num_adultos}")
    print(f" - Sobreviventes: {num_adultos_sobrev}")
    print(f" - Mortos: {num_adultos_mortos}")
    print()
    print(f"Idosos: {num_idosos}")
    print(f" - Sobreviventes: {num_idosos_sobrev}")
    print(f" - Mortos: {num_idosos_sobrev}")

def analise_embarque():
    titulo("Análise de Passageiros: Embarque")

    # for linha in linha:
    #     if linha["Embarked"]

# --------------------- programa principal
carrega_dados()
while True:
    titulo("Analise de Dados: Passageiros do Titanic")
    print("1. Análise por Sexo")
    print("2. Análise por Idade")
    print("3. Análise por Embarque")
    print("4. Finalizar")
    opcao = int(input("Opção: "))
    if opcao == 1:
        analise_sexo()
    elif opcao == 2:
        analise_idade()
    elif opcao == 3:
        analise_embarque()
    else:
        break