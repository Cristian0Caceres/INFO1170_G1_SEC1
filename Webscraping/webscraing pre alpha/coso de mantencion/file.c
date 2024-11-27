#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <semaphore.h>

#define NUM_VALUES 10

// Definimos un espacio de memoria compartida
int *shared_memory;
sem_t *mutex;

void *parent_function() {
    for (int i = 0; i < NUM_VALUES; i++) {
        sleep(2);  // Esperamos 2 segundos entre cada inserción
        sem_wait(mutex);  // Bloqueamos el mutex
        
        int random_value = rand() % 10 + 1;  // Generamos un número aleatorio entre 1 y 10
        shared_memory[0] = random_value;
        printf("padre: escribiendo %d\n", random_value);
        
        sem_post(mutex);  // Liberamos el mutex
    }
    return NULL;
}

void *child_function() {
    int values[NUM_VALUES];
    for (int i = 0; i < NUM_VALUES; i++) {
        sleep(1);  // Sincronizamos con un delay inicial de 1 segundo
        sem_wait(mutex);  // Bloqueamos el mutex
        
        int value = shared_memory[0];
        values[i] = value;
        printf("hijo: leyendo %d\n", value);
        
        sem_post(mutex);  // Liberamos el mutex
    }

    // Guardamos los valores y el promedio en "resultados.txt"
    FILE *file = fopen("resultados.txt", "w");
    int sum = 0;
    for (int i = 0; i < NUM_VALUES; i++) {
        fprintf(file, "%d,", values[i]);
        sum += values[i];
    }
    float average = sum / (float)NUM_VALUES;
    fprintf(file, "\nPromedio: %.2f\n", average);
    fclose(file);
    return NULL;
}

int main() {
    // Creamos memoria compartida
    int shm_fd = shm_open("/shared_memory", O_CREAT | O_RDWR, 0666);
    ftruncate(shm_fd, sizeof(int));
    shared_memory = (int *)mmap(0, sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);
    
    // Creamos y inicializamos el mutex
    sem_unlink("/mutex");
    mutex = sem_open("/mutex", O_CREAT, 0666, 1);

    pid_t pid = fork();
    if (pid == 0) {
        // Proceso hijo
        child_function();
    } else {
        // Proceso padre
        parent_function();
        wait(NULL);
        
        // Leemos y mostramos el contenido de "resultados.txt"
        FILE *file = fopen("resultados.txt", "r");
        char ch;
        while ((ch = fgetc(file)) != EOF) {
            putchar(ch);
        }
        fclose(file);
    }
    
    // Limpiamos la memoria compartida y el mutex
    munmap(shared_memory, sizeof(int));
    close(shm_fd);
    shm_unlink("/shared_memory");
    sem_close(mutex);
    sem_unlink("/mutex");
    return 0;
}
