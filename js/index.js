//DECLARACIONES
var database = firebase.database();

const buscador = document.getElementById('buscador');
const lupa = document.getElementById('lupa');
const now = document.getElementById('now');
const histor = document.getElementById('history');
const borrarbt = document.getElementById('borrarBt');
const promedio = document.getElementById('promedio');

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
        //value de las variables
        let referenciaH = database.ref('preguntasDid/').push();

        //objeto con la pregunta
        let lapreguntaH = {
            id: referenciaH.key,
            pregunta: yaPregunta,
            //promedio: yaPromedio,
        }

        database.ref('preguntasDo/preg').set(null);
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

        //value de las variables
        let referenciaH = database.ref('preguntasDid/').push();

        //objeto con la pregunta
        let lapreguntaH = {
            id: referenciaH.key,
            pregunta: yaPregunta,
        }

        database.ref('preguntasDo/preg').set(null);
        referenciaH.set(lapreguntaH);
        ya = false;

         //value de las variables
        let referencia = database.ref('preguntasDo/preg').push();
        let referenciaProm = database.ref('preguntasDo/prom').push();
 
        //objeto sin pregunta
        //let lapregunta = {
         //pregunta: 'nopregunta'
        //}

        enable = false;
        //referencia.set(lapregunta);
        now.innerHTML = '';
        referencia.set(null);
        referenciaProm.set(null);
    }
}

//ACCION DE ELIMINAR
borrarbt.addEventListener('click', del);

//LECTURA PROMEDIOS QUE VAN LLEGANDO
database.ref('preguntasDo/prom').on('value', function(data){
  
    let suma = 0;
    let cont = 0;

    data.forEach(
        prome => {
            let val = prome.val().prome;
            suma += val;
            cont += 1;
        }
    );

    if(cont == 0){
        promedio.innerHTML = '';
    }else{
        let elpromedio = suma / cont;
        promedio.innerHTML = elpromedio;
        yaPromedio = elpromedio;
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