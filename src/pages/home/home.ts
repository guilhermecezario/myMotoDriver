import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//Classes
import { Pedido } from '../../classes/pedido';

//Paginas
import { MapPage } from '../map/map';
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
  userDate: any;

  reload: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private db: AngularFireDatabase,
    public zone: NgZone){
  }

  ionViewWillEnter() {
    console.log("home");
    this.buscarDados();
  }
  ionViewWillLeave() {
    console.log('saindo da pagina home')
    this.db.database.ref('pedidos').off();
  }

  buscarDados(){
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        let listDB = this.db.database.ref(this.PATH).child(this.uid);
        listDB.once('value', (snapshot) => {
          this.userDate = snapshot.val();
          if(this.userDate.perfil == ""){
            this.userDate.perfil = "../assets/imgs/default-user.png";
          }
            this.buscarPedidos();
        })
      } else {
        this.navCtrl.setRoot('LoginPage');
      }
    });
  }
  buscarPedidos(){
    this.reload = false;
    this.db.database.ref('/pedidos').on('value', (data)=>{
      this.pedidos = [];
      data.forEach((item)=>{
        let dados = item.val();
      if(dados.motorista == ""){
        let pedido = new Pedido(dados.usuario, item.key, dados.preco);
        this.zone.run(()=> {
          this.pedidos.push(pedido);
        });
      }
      else if(dados.motorista == this.uid && dados.status == ""){
        this.abrirMapa(item.key);
      }
      })
    });
  }
  abrirMapa(id: string){
    this.navCtrl.push(MapPage,{
      id: id,
      id_motorista: this.uid,
      pedidoPendente: false
    });
  }

  logout(){
    return this.afAuth.auth.signOut().then(() =>{
      this.toast.create({
        message: this.userDate.nome+' você desconectou da sua conta',
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