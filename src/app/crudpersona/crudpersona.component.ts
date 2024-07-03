import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../services/services/persona.service';
import { Persona } from '../models/Persona';
import { NgForm } from '@angular/forms';

/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';*/


@Component({
  selector: 'app-crudpersona',
  templateUrl: './crudpersona.component.html',
  styleUrls: ['./crudpersona.component.css']
})
export class CrudpersonaComponent implements OnInit {

  //CONSTRUCTOR
  constructor(private route: Router, private personaService: PersonaService){
    console.log('se ejecuto el constructor');
    //Ejecutamos automaticamente el listado de las personas.
    this.findAll();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  //variable global para guardar las respuestas del 'response'
  listaPersonasBd: Persona[]=[];

  //LISTAR TODO (GET)
  findAll():void{
    this.personaService.findAll().subscribe(
      response=>{
        console.log('lista de personas de BD', response)
        //guardamos la response en el array 'listaPersonasBd'
        this.listaPersonasBd=response;
      }
    );
    /*Esplicacion:
    *llamamos al service.findAll(), que lista toda las personas
    *suscribimos
    *en 'response' guardamos respuesta del API, (este es formateado al JSON)
    *seteamos el 'response' al array 'listaPersonasBD', para usarlo posteriormente.
    NOTA: es importante invocar este metodo en constructor y cuando se
    realizan cambios en la lista de datos.
    */
  }

  //LISTAR SOLO UNO (GET)
  personaSeleccionada!: Persona;//esto es lo mismo q el de arriba en TScript
  idPersona: number | undefined; // ID de la persona a buscar/tambien se puede definir asi:
  find(): void{
    if(this.idPersona){ 
      this.personaService.find(this.idPersona).subscribe(
        response=>{
          console.log('respuesta=>', response);
          //guardamos la busqueda en una variable global, util para cualquier cosa.
          this.personaSeleccionada=response;
        }
      );
    }
    /*Explicacion:
    *Creamos una variable global 'personaSeleccionada' de tipo Persona
    *Creamos variable global 'idPersona' de tipo number y 'undefined'
    esta variable es recogida del html. asi q si tiene valor.
    *creamos metodo vacio xq no necesita retornar nada.
    *verificamos existencia del 'idPersona'
    *invocamos el service.find(<id>) y le pasamos el id, luego lo suscribimos
    *en la variable 'response' se guarda la respuesta del API server.
    *podemos hacer mas validaciones de este codigo simple.
    como implementar el ELSE, TRY-Cath entre otros...
    */
  }

  //GUARDAR, (POST)
  save(formulario: NgForm): void {
    if (formulario.valid) {
      const datosPersona = formulario.value;
      const persona: Persona = {
        nombre: datosPersona.nombre,
        apellidos: datosPersona.apellidos
      };
      this.personaService.guardar(persona).subscribe(
        response => {
          console.log('respuesta del save=>', persona);
          this.findAll();
        }
      );
      formulario.reset();
    }
    /*Explicacion:
    *Creamos Metodo save(<un_formulario>) q no retorna nada 'void'
    *'NgForm' se usa para manejar formularios en angular, lo necesitamos 
    para recoger datos de los imputText,
    *Verificamos el 'formulario' si todo esta en orden
    *creamos variables internas 'datosPersona' contiene los datos del formulario
    *creamos una 'persona' y seteamos los valores de 'datosPersona' en ella.
    *ahora 'persona' ya es un objeto con valores, procedemos a enviarlo
    al service.guardar(<Obejto_seteado>) y lo suscribimos, esperamos resp del API
    *En 'response' guardamos la resp del API.
    *Litamos nuevamente
    *con .reset() limpiamos todo el formulario.
    */
  }

  //ACTUALIZAR, (PUT)
  update(formulario: NgForm): void{
    //NOTA: podemos reutlizar la 'personaSeleccionada'.. 
    //o hacerlo completamente independiente de esta variable para evitar confusiones.
    //verificamos existencia de la persona y validamos el form
    if(formulario.valid && this.personaSeleccionada){

      const datosPersona = formulario.value;
      //Seteamos valores al objeto para posteriormente guardarlo/updatearlo
      this.personaSeleccionada.nombre=datosPersona.nombre;
      this.personaSeleccionada.apellidos=datosPersona.apellidos;
      //aqui enviamos la personaSeleccionada, este es un objeto que tiene su id, sera utilizado en update
      //..para especificar el id, es mejor indicarle cual eliminará, pasandole un numero por html
      this.personaService.update(this.personaSeleccionada).subscribe(
        (response: Persona,)=>{
          //alert('respuesta: '+response.nombre+", "+response.apellidos);
          console.log('Persona Actualizada:',response);
          this.findAll();
        }
      );
      formulario.reset();
    }else{
      console.warn('El formulario o la persona seleccionada no es valido');
    }
  }

  //BORRAR (DELETE) con un inputText
  personaSeleccionadaId: number | undefined;
  borrar():void{
    if(this.personaSeleccionadaId){
      this.personaService.borrar(this.personaSeleccionadaId).subscribe(
        response=>{
          console.log('Resp del Borrado: ', response);
          this.findAll();
        }
      );      
    }else{
      console.warn('No se ha seleccionado ninguna persona.');
    }
    /*Explicacion:
    *primero creamos una variable numerica para recoger el id.
    *El id esta vez recoge datos del inputText del html, asi q tiene valor.
    *creamos 'borrar()' sin parametros xq la variable global 'personaSeleccionadaId',
    ya tien un valor asignado por html.
    *verificamos si existe el valor de 'personaSeleccionadaID' con If-Else
    *invocamos al service.borrar(<id>)
    *lo suscribimos
    *adquirimos respuesta del server API al 'response'
    *listamos nuevamente todo con findAll()
    */
  }

  //BORRAR (DELETE) con un parametro indicado en HTML
  borrarconID(idBorrar: number | undefined):void{//espera un numero o un indefinido
    if(idBorrar){
      this.personaService.borrar(idBorrar).subscribe(
        response=>{
          console.log('Resp del Borrado: ', response);
          this.findAll();
        }
      );      
    }else{
      console.warn('No se ha seleccionado ninguna persona.');
    }
    /*Explicacion:
    *Este metodo tiene parametro de tipo number q recibe enteros y decimales
    *Se esta usando 'undefined' porque el html puede retornos variables no
    inicializadas o de tipo requerido Importante Agregar undefined.
    *En el If-Else verificamos que 'idBorrar' tiene un valor y no es nulo
    *llamamos al 'servicio', metodo 'borrar(<id>)', pasamos el id.
    *lo suscribimos.
    *creamos una variable 'response' que guardará la respuesta del Server API.
    *refrescamos nuevamente la lista de 'personas' con findAll()
    */
  }

  modalAbierto=false;//para iniciar el modal
  abrirModalModificar(persona: Persona): void {
    this.personaSeleccionada = { ...persona }; // Copia los datos de la persona seleccionada
    this.modalAbierto = true; // Abre el modal
  }
  cerrarModal(): void {
    this.modalAbierto = false; // Cierra el modal
  }
}
