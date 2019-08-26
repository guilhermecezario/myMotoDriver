import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../Models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private PATH = 'pendentes/';

  infoMoto = true;
  infoUser = false;
  infoCnh = false;
  final = false;
  id: any;

  //variaveis do registro

  confirm_pass: string;
  nome: string;

  //variaveis do detalhes da moto
  dataNasc: string;
  cor: string;
  placa: string;

  //variaveis de imagem
  foto: string = ''; 
  public cameraOptions: CameraOptions = {
    sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType    : this.camera.DestinationType.DATA_URL,
    encodingType       : this.camera.EncodingType.JPEG,
    mediaType          : this.camera.MediaType.PICTURE,
  };
  buscarImg = true;
  continuar = false;


  user = {} as User;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private db: AngularFireDatabase,
    private camera: Camera,
    public loadingCtrl: LoadingController) {
  }

  detalhesMoto(){
    if(this.placa == undefined || this.cor == undefined){
      this.toast.create({
        message: 'Você precisa preencher todos os campos',
        duration: 3000
      }).present();
    }else{
      if(this.placa.length != 7){
        this.toast.create({
          message: 'Opa... placa informada não tem quantidades de digitos compativeis',
          duration: 4000
        }).present();
    }else{
        this.infoMoto = false;
        this.infoCnh = true;
        this.infoUser = false;
        this.final = false;
    }
  }
  }
  buscarImagem(){
    this.foto = '';
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      let image = 'data:image/jpeg;base64,' + imageData;
      this.foto = image;
      if(this.foto.length > 1){
        this.buscarImg = false;
        this.continuar = true;
      }else{
        this.toast.create({
          message: 'Você precisa selecionar uma imagem para continuar',
          duration: 3000
        }).present();
      }
  });
  }
  
  async register(user: User) {
    if(user.email == undefined || user.password == undefined || this.confirm_pass == undefined || this.nome == undefined){
      this.toast.create({
        message: 'Preencha todos os campos',
        duration: 3000
      }).present();
    }else{
      if(user.password == this.confirm_pass){
        try {
          this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then((res: any) =>{

            this.setId(res.user.uid);
            this.finalizarCadastro();

          }).catch((error: any) =>{

            console.log(error.code);

            if(error.code == 'auth/network-request-failed'){
              this.toast.create({
                message: 'Vish amigo, você não está conectado a internet',
                duration: 3000
              }).present();
            }else if(error.code == 'auth/email-already-in-use'){
              this.toast.create({
                message: 'E-mail ja cadastrado',
                duration: 3000
              }).present();
            }else if(error.code == 'auth/weak-password'){
              this.toast.create({
                message: 'Senha precisa ter mais de 6 caracteres',
                duration: 3000
              }).present();
            }else{
              console.log(error);
            }
          })
          
        } catch (e) {
          console.error(e);
        }
      }
      else{
        this.toast.create({
          message: 'Senha não confere com a confirmação',
          duration: 3000
        }).present();
      }
    }
  }

  finalizarCadastro(){
    this.presentLoadingDefault();
    this.db.database.ref(this.PATH).child(this.getId())
      .set({ 
        nome: this.nome,
              placa: this.placa,
              cor: this.cor,
              cnh_image: this.foto,
              email: this.user.email,
              senha: this.user.password
            }).then(
            () => {
              this.infoUser = false;
              this.infoMoto = false;
              this.infoCnh = false;
              this.final = true;
            });  
  }

  abrirInfoUser(){
    this.infoUser = true;
    this.infoMoto = false;
    this.infoCnh = false;
    this.final = false;
  }

  setId(id: string):void{
    this.id = id;
  }
  getId():string{
    return this.id;
  }

  Login(){
    this.navCtrl.pop();
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde, Carregando...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
