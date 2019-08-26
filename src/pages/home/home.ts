import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//Classes
import { Pedido } from '../../classes/pedido';

//Paginas
import { MapaPage } from '../mapa/mapa';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pedidos: Pedido[] = [];

  private PATH = 'motoristas/';

  errorInternet = this.toast.create({
    message: 'Você esta sem internet',
  });

  uid: string;
  list: any [];
  info: any;

  carregando: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private db: AngularFireDatabase,
    public zone: NgZone,
    private network: Network){
  }

  ionViewWillEnter() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.errorInternet.present();
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.errorInternet.dismiss();
    });

    disconnectSubscription.unsubscribe();
    connectSubscription.unsubscribe();

    this.buscarDados();
  }

  buscarDados(){
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        let listDB = this.db.database.ref(this.PATH).child(this.uid);
        listDB.once('value', (snapshot) => {
          this.info = snapshot.val();
          if(this.info.perfil == ""){
            this.info.perfil = "../assets/imgs/default-user.png";
          }
            this.buscarPedidos();
        })
      } else {
        this.navCtrl.setRoot('LoginPage');
      }
    });
  }
  buscarPedidos(){
    console.log('entrou');  
    this.carregando = true;
    this.pedidos = [];
    this.db.database.ref('/pedidos').on('child_added', (data) =>{
      let dados = data.val();
      if(dados.motorista == ""){
        let pedido = new Pedido(dados.usuario, data.key, dados.preco);
        this.zone.run(() => {
          this.pedidos.push(pedido);
          console.log(this.pedidos);
      });
      }
      else if(dados.motorista == this.uid){
        this.navCtrl.push(MapaPage, {
          id: data.key,
          id_motorista: this.uid,
          estado: '1'
        });
      }
    });
  }
  abrirMapa(id: string){
    this.navCtrl.push(MapaPage,{
      id: id,
      id_motorista: this.uid,
      estado: '0'
    });
  }

  logout(){
    return this.afAuth.auth.signOut().then(() =>{
      this.toast.create({
        message: this.info.nome+' você desconectou da sua conta',
        duration: 4000
      }).present();
      this.navCtrl.setRoot('LoginPage');
    }).catch((error) => console.log(error))
  }

  abrirPerfil(){
    this.navCtrl.push(PerfilPage,{
      uid: this.uid
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.buscarPedidos();
      refresher.complete();
    }, 500);
  }

}
