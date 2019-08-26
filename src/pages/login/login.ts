import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../Models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  private PATH = 'motoristas/';

  uid: string;
  list: any [];
  info: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public AlertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private db: AngularFireDatabase,
    private toast: ToastController) {
  }

  async login(user: User) {
    try {
      if(user.email !== undefined || user.password !== undefined){
        const loader = this.loadingCtrl.create({
          cssClass: 'loading'
        });
        loader.present();
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(
          (res: any) => {
            this.uid = res.user.uid;
            let listDB = this.db.database.ref(this.PATH).child(this.uid);
        listDB.on('value', (snapshot) => {
          this.info = snapshot.val();
          if(this.info == null){
            loader.dismiss();
            this.toast.create({
              message: 'Você ainda não esta autorizado',
              duration: 4000
            }).present();
          }else{
            loader.dismiss();
            this.navCtrl.setRoot('HomePage');
          }
        });
          }).catch((error: any) =>
          {
            loader.dismiss()
            if(error.code == 'auth/network-request-failed'){
              this.toast.create({
                message: 'Vish amigo, você não está conectado a internet',
                duration: 3000
              }).present();
            }else {
              this.toast.create({
                message: 'E-mail ou senha incorreto',
                duration: 3000
              }).present();
            }
          });
      }else{
        this.toast.create({
          message: 'Você precisa preencher todos os campos',
          duration: 3000
        }).present();
      }
    } catch (e) {
      console.error(e);
    }
  }
  esqueceuSenha(){
    let alert  = this.AlertCtrl.create({
      title: 'Redefinir senha',
      inputs: [
        {
          name: 'email',
          placeholder: 'Digite o E-mail'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: "confirmar",
          handler: data =>{
            if(data.email == ""){
              this.toast.create({
                message: 'Nenhum e-mail informado',
                duration: 3000
              }).present();
            }else{
              let email = data.email;
              this.afAuth.auth.sendPasswordResetEmail(email).then((data) =>{
                this.toast.create({
                  message: 'Enviamos um e-amail para '+email+', clique no link do e-amil para refefinir sua senha',
                  showCloseButton: true
                }).present();
              }).catch((error) =>{
                if(error.code == 'auth/network-request-failed'){
                  this.toast.create({
                    message: 'Vish amigo, você não está conectado a internet',
                    duration: 3000
                  }).present();
                }
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  presentLoading() {
  }
}
