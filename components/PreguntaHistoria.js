class PreguntaHistoria{
    constructor(lapregunta){
        this.lapregunta = lapregunta;
    }

    render() {
        let component = document.createElement('div');
        component.className = 'laspreguntasH';

        let preg = document.createElement('p');
        preg.className = 'texto';
        preg.innerHTML = (
            this.lapregunta.pregunta
        );

        let eli = document.createElement('button');
        eli.className = 'borrar2';
        eli.innerHTML = (
            'X'
        );

        let prom = document.createElement('p');
        prom.className = 'promedio';
        prom.innerHTML = (
            this.lapregunta.promedio
        );

        eli.addEventListener('click', ()=>{
            const database = firebase.database();
            database.ref('preguntasDid/'+this.lapregunta.id).set(null);
        });

        component.appendChild(eli);
        component.appendChild(preg);
        component.appendChild(prom);

        return component;
    }
}