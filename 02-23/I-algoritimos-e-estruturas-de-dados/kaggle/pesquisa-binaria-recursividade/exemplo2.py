def busca_binaria(lista, dado):
    tam = len(lista)
    esquerda = 0
    direita = tam - 1
    while esquerda <= direita:
        meio = int((esquerda + direita) / 2)
        print(lista[meio])
        if lista[meio] == dado:
            return meio
        elif lista[meio] < dado:
            esquerda = meio + 1
        else:
            direita = meio - 1
    return -1

numeros = [4, 10, 15, 27, 32, 38, 45, 52, 60, 73, 80]
num = int(input("Número: "))

posicao = busca_binaria(numeros, num)
if posicao == -1:
    print("Número não consta na lista")
else:    
    print(f"Número consta na posição {posicao}")
