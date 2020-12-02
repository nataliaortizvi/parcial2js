//DECLARACIONES
var database = firebase.database();

const buscador = document.getElementById('buscador');
const lupa = document.getElementById('lupa');
const now = document.getElementById('now');
const histor = document.getElementById('history');
const borrarbt = document.getElementById('borrarBt');
const promedioA = document.getElementById('promedio');

var yaPregunta;
var yaPromedio;
var ya = false;
var enable = true;

//FUNCIONES
ask = () => {

    let p = buscador.value;

    //si no escriba ninguna pregunta
    if(buscador.value == ''){
        alert('Escriba una pregunta');
        return;
    }

    if(ya) {
        if(yaPromedio == null){
            yaPromedio = 0;
        }
        
        //value de las variables
        let referenciaH = database.ref('preguntasDid/').push();

        //objeto con la pregunta
        let lapreguntaH = {
            id: referenciaH.key,
            pregunta: yaPregunta,
            promedio: yaPromedio,
        }

        database.ref('preguntasDo/preg').set(null);
        database.ref('preguntasDo/prom').set(null);
        referenciaH.set(lapreguntaH);

    }

     //value de las variables
     let referencia = database.ref('preguntasDo/preg').push();
     let referenciaProm = database.ref('preguntasDo/prom').push();
 
     //objeto con la pregunta
     let lapregunta = {
         pregunta: p,
     }

    referencia.set(lapregunta);
    referenciaProm.set(null);
    buscador.value = '';

}

//ACCION DE PREGUNTRAR
lupa.addEventListener('click', ask);

del = () => {

    if(enable) {

        if(yaPromedio == null){
            yaPromedio = 0;
        }

        //value de las variables
        let referenciaH = database.ref('preguntasDid/').push();

        //objeto con la pregunta
        let lapreguntaH = {
            id: referenciaH.key,
            pregunta: yaPregunta,
            promedio: yaPromedio,
        }

        referenciaH.set(lapreguntaH);
        database.ref('preguntasDo/preg').set(null);
        ya = false;

        enable = false;
        now.innerHTML = '';
        promedioA.innerHTML = '';

        database.ref('preguntasDo/preg').set(null);
        database.ref('preguntasDo/prom').set(null);

    }

    database.ref('preguntasDo/preg').set(null);
    database.ref('preguntasDo/prom').set(null);
}

//ACCION DE ELIMINAR
borrarbt.addEventListener('click', del);

//LECTURA PROMEDIOS QUE VAN LLEGANDO
database.ref('preguntasDo/prom').on('value', function(data){

    let suma = 0;
    let cont = 0;

    data.forEach(
        prome => {
            let valor = prome.val();
            let val = valor.puntaje;
            suma += val;
            cont += 1;
        }
    );

    if(cont == 0){
        promedioA.innerHTML = '';
    }else{
        let elpromedio = suma / cont;
        promedioA.innerHTML = elpromedio;
        yaPromedio = elpromedio.toFixed(1);
    }
});

//LECTURA PREGUNTA ACTUAL
database.ref('preguntasDo/preg').on('value', function(data){
    data.forEach(
        preguntasDo => {
            let valor = preguntasDo.val();
            if(valor.pregunta == null){
                now.innerHTML = '';
            }else{
                now.innerHTML = valor.pregunta;
                yaPregunta = valor.pregunta;
                ya = true;
                enable = true;
            }
        }
    );
});

//LECTURA PREGUNTA HISTORIA
database.ref('preguntasDid/').on('value', function(data){
    histor.innerHTML = '';
    data.forEach(
        preguntasDo => {
            let valor1 = preguntasDo.val();
            let fila1 = new PreguntaHistoria(valor1);
            histor.appendChild(fila1.render());
        }
    );
});