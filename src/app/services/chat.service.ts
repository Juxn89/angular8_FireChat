import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensajes } from '../interfaces/mensajes.interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {

  public chats: Mensajes[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensajes>;

  constructor(private afs: AngularFirestore) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensajes>('chats');
    return this.itemsCollection.valueChanges().pipe(
      map((mensaje: Mensajes[]) => {
        console.log(mensaje);
        this.chats = mensaje;
      })
    );
  }

  agregarMensaje(text: string) {
    let mensaje: Mensajes = {
      nombre: 'Juan',
      mensaje: text,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
