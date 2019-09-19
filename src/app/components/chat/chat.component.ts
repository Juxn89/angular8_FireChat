import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  element: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes()
      .subscribe(() => {
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
      });
  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0 ) { return; }

    this.chatService.agregarMensaje(this.mensaje)
      .then(() => { this.mensaje = ''; })
      .catch((err) => {console.log(err); });
  }
}
