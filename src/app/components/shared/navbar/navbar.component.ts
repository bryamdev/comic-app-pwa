import { Component, OnInit, HostListener } from '@angular/core';
import { HeroesService } from '../../../servicios/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  installEvent;

  constructor( private heroesService: HeroesService,
               private router: Router 
              ) {
                
    this.installEvent = null;
  }

  ngOnInit(): void {
  }

  buscarHeroe( texto: string ){
    console.log(texto);
    //console.log(this.heroesService.buscarHeroes(texto));
    this.router.navigate(['/buscar', texto]);

  }

  //Metodos para boton de instalacion PWA

  //Este metodo se ejecuta apenas el navegador reconozca el evento de instalacion nativo
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event){
    console.log(event);
    event.preventDefault();//cancela el funcionamiento por defecto del evento.
    this.installEvent = event;//guardamos el evento e una variable
  }

  installByUser(){
    if(this.installEvent){
      this.installEvent.prompt(); //Muestra la alerta preguntando al usuario si quiere instalar la app
      this.installEvent.userChoice
        .then( rta => {
          console.log(rta);
        });//Con userChoice se puede obtener la respuesta del usuario al prompt.
    }else{
      console.log("No se capturo el evento del navegador");
    }

  }



}
