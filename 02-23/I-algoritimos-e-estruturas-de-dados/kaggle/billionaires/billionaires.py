import matplotlib.pyplot as plt
import csv

ricos = []

def carrega_dados():
    with open('forbes_2640_billionaires.csv', mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for linha in csv_reader:
            ricos.append(linha) # lista de dicioários

def titulo(texto, traco="="):
    print()
    print(texto)
    print(traco*40)

def top_20():
    titulo("Lista dos 20 Maiores Billionários")

    print("Nº Nome.......................... País................ Atividade............ Fortuna")

    contador = 0
    for rico in ricos:
        contador += 1
        print(f"{contador:2d}. {rico['name'][0:30]:30} {rico['country']:20} {rico['industry']:21} {rico['net_worth']:>5}")
        if contador == 20:
            break

def compara_paises():
    titulo("Comparativo dos Billionários de 2 Países")

    pais1 = input("1º País: ").upper()
    pais2 = input("2º País: ").upper()

    print(f"\nBillionários do(a) {pais1}")

    print("-"*40)

    print("Rank Nome.......................... Atividade............ Fortuna")

    conta1 = 0
    for rico in ricos:
        if rico['country'].upper() == pais1:
            conta1 += 1
            print(f"{rico['rank']:>4}. {rico['name'][0:30]:30} {rico['industry']:21} {rico['net_worth']:>5}")
    
    print(f"\nBillionários do(a) {pais1}: {conta1}")
    print("-"*70)

    print(f"\nBillionários do(a) {pais2}")

    print("-"*40)

    print("Rank Nome.......................... Atividade............ Fortuna")

    conta2 = 0
    for rico in ricos:
        if rico['country'].upper() == pais2:
            conta2 += 1
            print(f"{rico['rank']:>4}. {rico['name'][0:30]:30} {rico['industry']:21} {rico['net_worth']:>5}")
    
    print("-"*70)
    print(f"\nBillionários do(a) {pais2}: {conta2}")

def agrupa_atividade():
    titulo("Agrupar por Atividade")

    atividades = []
    numeros = []

    for rico in ricos:
        # Agrupar vai contando as atividades e contando o número se tiver
        if rico['industry'] in atividades:
            indice = atividades.index(rico['industry'])
            numeros[indice] += 1
        else:
            atividades.append(rico['industry'])
            numeros.append(1)

    # ordena as lista o zip la de dentro junta as variáveis colocando o número na frete
    # depois o sorted ordena e o zip com * separa novamente as variáveis
    numeros2, atividades2 = zip(*sorted(zip(numeros, atividades), reverse=True))

    print("Atividade....................: Bilionários:")

    for ativ, num in zip(atividades2, numeros2):
        print(f"{ativ:30} {num:8d}")

def grafico_atividades():
    titulo("Gráfico por Atividade - Top 8")

    atividades = []
    numeros = []

    for rico in ricos:
        # Agrupar vai contando as atividades e contando o número se tiver
        if rico['industry'] in atividades:
            indice = atividades.index(rico['industry'])
            numeros[indice] += 1
        else:
            atividades.append(rico['industry'])
            numeros.append(1)

    # ordena a lista - zip interno junta as variáveis colocando o número na frete
    # depois o sorted ordena e o zip externo com * separa novamente as variáveis
    numeros2, atividades2 = zip(*sorted(zip(numeros, atividades), reverse=True))

    fig, ax = plt.subplots()

    bar_colors = ['tab:red', 'tab:blue', 'tab:green', 'tab:orange', 'tab:cyan', 'tab:olive', 'tab:purple', 'tab:brown']

    ax.bar(atividades2[0:8], numeros2[0:8], color=bar_colors)

    ax.set_ylabel('Nº de Bilionários')
    ax.set_title('Gráfico: Top 8 Atividades dos Bilionários')

    plt.xticks(rotation=75)
    plt.tight_layout()

    plt.show()

def grafico_idades():
    titulo("Gráfico Comparativo por Idades")

    labels = [" Até 40", "Entre 41 e 50", "Entre 61 e 70", "Acima de 70"]
    faixas = [0, 0, 0, 0, 0]

    for rico in ricos:
        #se o campo idade tiver conteúdo
        if rico["age"]:
            idade = float(rico["age"])
            if idade <= 40:
                faixas[0] += 1
            elif idade <= 50:
                faixas[1] += 1
            elif idade <= 60:
                faixas[2] += 1
            elif idade <= 70:
                faixas[3] += 1
            else:
                faixas[4] += 1
            
    explode = (0, 0, 0, 0.1, 0)

    fig, ax = plt.subplots()
    ax.pie(faixas, labels=labels, autopct="%.1f%%", explode=explode, shadow=True)

    plt.show()

def grafico_violinos():
    titulo("Gráfico de Violino por Idades")

    idades = []

    for rico in ricos:
        #se o campo idade tiver conteúdo
        if rico["age"]:
            idade.append(float(rico["age"]))

    fig, ax = plt.subplots()
    ax.violinplot(idades)

    plt.show()

# --------------------- programa principal
carrega_dados()
while True:
    titulo("Forbes: Dados de Billionários 2023")
    print("1. Top 20 Billionários")
    print("2. Comparativo entre 2 países")
    print("3. Agrupar por Atividade")
    print("4. Gráfico Comparativo de Atividade")
    print("5. Gráfico Comparativo de Idades")
    print("6. Gráfico de Violino por Idades")
    print("7. Finalizar")
    opcao = int(input("Opção: "))
    if opcao == 1:
        top_20()
    elif opcao == 2:
        compara_paises()
    elif opcao == 3:
        agrupa_atividade()
    elif opcao == 4:
        grafico_atividades()
    elif opcao == 5:
        grafico_idades()
    elif opcao == 6:
        grafico_violinos()
    else:
        break