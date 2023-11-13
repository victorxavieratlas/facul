# diz-se que uma função é recursiva quando chama a si mesma
def contagem(num):
    if num == 0:
        print("Lançar!!")
    else:
        print(num)
        contagem(num-1)      # chama ela mesma

contagem(5)

def contagem2(num):
    for i in range(num, 0, -1):
        print(i)
    print("Lançar!!")

contagem2(5)