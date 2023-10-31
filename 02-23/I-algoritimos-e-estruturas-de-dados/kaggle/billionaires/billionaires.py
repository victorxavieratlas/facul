
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

