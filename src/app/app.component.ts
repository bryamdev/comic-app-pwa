import { Component, OnInit } from '@angular/core';

//Clase para configurar la actualizacion del SW
import { SwUpdate } from '@angular/service-worker';

//Push Notifications
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface Token{
  token: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private tokensCollection: AngularFirestoreCollection<Token>;

  constructor( private swUpdate: SwUpdate,
               private messaging: AngularFireMessaging,
               private database: AngularFirestore ){
  
    this.tokensCollection = this.database.collection<Token>('tokens');
  }

  //Metodo que se ejecuta cuando se inicializa un componente
  ngOnInit(){
    this.updatePWA();
    this.requestPermission();
    this.listenNotification();
  }

  //Permite suscribirse a servicio para cuando haya una actualizacion del SW recarge en el navegador
  updatePWA(){
    this.swUpdate.available
      .subscribe( value => {
        console.log("Update: ", value);
        window.location.reload();
      })
  }

  //Solicita permiso a clientes para enviar notificaciones
  requestPermission(){
    this.messaging.requestToken
      .subscribe( token => {
        console.log("Token ", token);
        this.tokensCollection.add({token});//EL token es agregado a la coleccion de tokens -> DBRTs
      });//Se obtiene el token del cliente, el cual lo identifica
  }

  //Cliente escucha las notificaciones
  listenNotification(){
    this.messaging.messages
      .subscribe( message => {
        console.log("Mensaje: ", message);
      });

  }


  
}
