def fatorial(num):
    if num == 0:
        return 1
    else:
        return num * fatorial(num-1)

fat = fatorial(20)
print(f"Fatorial de 20: {fat}")