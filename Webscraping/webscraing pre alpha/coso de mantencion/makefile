all: main

main: main.o
    gcc -o main main.o -lpthread -lrt

main.o: main.c
    gcc -c main.c

clean:
    rm -f main main.o resultados.txt
