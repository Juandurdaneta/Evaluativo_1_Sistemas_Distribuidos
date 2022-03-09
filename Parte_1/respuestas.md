
# Primera Parte del evaluativo

## Enunciado

Para esta evaluación, lea el código en tres archivos `test1.js`, `test2.js` y `test3.mjs`, análizelos e intente adivinar el orden de las lineas que imprime en pantalla, luego, para cada uno, realice un texto descriptivo que explique el por qué del orden de ejecución observado.

## Respuestas

### Output de test1.js

```javascript
    new promise
    async function
    nextTick 1
    nextTick 2
    nextTick 3
    then 1
    then 2
    microtask 1
    microtask 2
    timeout 1
    timeout 2
    immediate 1
    immediate 2
```

Podemos notar que lo primero que se ejecuta en este caso es la promesa la cual se declara y inmediatamente se resuelve utilizando el callback resolve(), una vez se ejecuta este callback se ejecuta el console log que esta dentro de la promesa “new promise”.

Luego tenemos que el siguiente evento que se ejecuta es la función asíncrona foo() ya que es invocada luego de la promesa, justo en la linea 12. Esta es una función opera de forma asíncrona a través del event loop, por lo cual se ejecuta justo después del primer promise

Inmediatamente luego luego de las promesas podemos notar que se ejecutan los process.nextTick(), este evento se procesa justo después de que se ejecute la operacion actual, sin importar en que fase del envent loop se encuentre.

Justo de que terminan de ejecutarse los process.nextTick() el event loop resume las operaciones normales y se ejecutan los métodos .then() llamados una vez se hayan resuelto ambas promesas (la que esta ubicada en la primera linea de código y luego la función asíncrona foo())

Luego tenemos que se ejecutan la cola de microtasks, estas funciones se ejecutan en este momento ya que la pila de ejecución de javascript esta vacía. 

Luego observamos que los temporizadores timeout() se ejecutan antes que las funciones setImmediate(), esto es debido a que  el orden en el cual los temporizadores son ejecutados varian dependiendo del contexto en el que son llamados. En este caso ambos están siendo llamados en el modulo main (no dentro de un ciclo de i/o), por lo tanto el orden en el cual estos dos temporizadores se ejecutan depende de el rendimiento del proceso.

### Output de test2.js

```javascript
    new promise
    async function
    nextTick 1
    nextTick 2
    nextTick 3
    then 1
    then 2
    microtask 1
    microtask 2
    immediate 1
    immediate 2
    timeout 1
    timeout 2

```

En este caso podemos notar que los eventos se están ejecutando dentro de un ciclo I/O, si nos fijamos, el output es el mismo hasta que llegamos a los immediate y a los timers, cuando el contexto en el cual se llaman los temporizadores y los immediate son dentros de un ciclo i/o, los immediate siempre se ejecutaran antes que los temporizadores.