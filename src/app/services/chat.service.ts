import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Mensajes } from '../interfaces/mensajes.interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {

  public chats: Mensajes[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensajes>;

  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);
      if (!user) { return; }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensajes>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensaje: Mensajes[]) => {
        console.log(mensaje);
        this.chats = [];
        for (let m of mensaje) {
          this.chats.unshift(m);
        }
        return this.chats;
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
