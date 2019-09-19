import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = '';

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes()
      .subscribe();
  }

  ngOnInit() {
  }

  enviar_mensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0 ) { return; }

    this.chatService.agregarMensaje(this.mensaje)
      .then(() => { this.mensaje = ''; })
      .catch((err) => {console.log(err); });
  }
}
