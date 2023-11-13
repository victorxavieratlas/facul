def busca_sequencial(lista, dado):
    tam = len(lista)
    for i in range(0, tam):
        if lista[i] == dado:
            return i
    return -1

numeros = [10, 24, 6, 19, 45, 73, 80, 4, 35]
num = int(input("Número: "))

posicao = busca_sequencial(numeros, num)
if posicao == -1:
    print("Número não consta na lista")
else:    
    print(f"Número consta na posição {posicao}")
        