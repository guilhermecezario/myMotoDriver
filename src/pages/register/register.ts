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

  loading = this.loadingCtrl.create({
    content: 'Carregando...'
  });

  registerMoto = true;
  registerUser = false;
  registerCnh = false;
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
      this.createToast('Você precisa preencher todos os campos');
    }else{
      if(this.placa.length != 7){
        this.createToast('Opa... placa informada não tem quantidades de digitos compativeis');
    }else{
      this.registerMoto = false;
      this.registerCnh = true;
      this.registerUser = false;
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
        this.createToast('Você precisa selecionar uma imagem para continuar');
      }
  });
  }
  
  async register(user: User) {
    if(user.email == undefined || user.password == undefined || this.confirm_pass == undefined || this.nome == undefined){
      this.createToast('Preencha todos os campos');
    }else{
      if(user.password == this.confirm_pass){
        try {
          this.loading.present();
          this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then((res: any) =>{

            this.id = res.user.uid;
            this.finalizarCadastro();

          }).catch((error: any) =>{
            this.loading.dismiss();

            if(error.code == 'auth/network-request-failed'){
              this.createToast('Vish amigo, você não está conectado a internet');
            }else if(error.code == 'auth/email-already-in-use'){
              this.createToast('E-mail ja cadastrado');
            }else if(error.code == 'auth/weak-password'){
              this.createToast('Senha precisa ter mais de 6 caracteres');
            }else{
              console.log(error);
            }
          })
          
        } catch (e) {
          console.error(e);
        }
      }
      else{
        this.createToast('Senha não confere com a confirmação');
      }
    }
  }

  finalizarCadastro(){
    this.db.database.ref('pendentes/').child(this.id)
      .set({ 
        nome: this.nome,
              placa: this.placa,
              cor: this.cor,
              cnh_image: this.foto,
              email: this.user.email,
              senha: this.user.password
            }).then(
            () => {
              this.loading.dismiss();

              this.registerUser = false;
              this.registerMoto = false;
              this.registerCnh = false;
              this.final = true;
            });  
  }

  abrirInfoUser(){
    this.registerUser = true;
    this.registerMoto = false;
    this.registerCnh = false;
    this.final = false;
  }

  setId(id: string):void{
    this.id = id;
  }
  getId():string{
    return this.id;
  }

  abrirLogin(){
    this.navCtrl.pop();
  }

  createToast(text){
    this.toast.create({
      message: text,
      duration: 3000
    }).present();
  }
}
