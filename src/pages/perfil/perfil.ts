import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  mostrar = true;
  fechar = false;
  cnh = false;

  loading = this.loadingCtrl.create({
    cssClass: 'loadingPerfil'
  });

  element: HTMLImageElement;

  private uid: string;
  public info: any;

  public cameraOptions: CameraOptions = {
    quality: 100,
    sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType    : this.camera.DestinationType.DATA_URL,
    encodingType       : this.camera.EncodingType.JPEG,
    mediaType          : this.camera.MediaType.PICTURE,
    allowEdit: true,
  };
  foto: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db : AngularFireDatabase,
    private camera: Camera,
    public toast: ToastController,
    public loadingCtrl: LoadingController) {
    this.uid = navParams.get('uid');
  }

  ionViewWillEnter() {
    this.loading.present();
    this.carregarBanco();
  }

  carregarBanco(){
    let listDB = this.db.database.ref('/motoristas').child(this.uid);
    listDB.once('value', (snapshot) => {
      this.info = snapshot.val();
      this.element = document.createElement('img');
      this.element.className = 'img';
      this.element.src = ""
      if(this.info.perfil == ""){
        this.element.src = "../assets/imgs/default-user.png";
      }else{
        this.element.src = this.info.perfil;
      }
      if(this.info.avaliacao !== 0){
        this.info.avaliacao = (this.info.avaliacao/this.info.corridas).toFixed(1);
      }
      this.addDados();
    });
  }

  mudarPerfil(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      let image = 'data:image/jpeg;base64,' + imageData;
      this.foto = image;
      if(this.foto.length > 1){
        let listDB = this.db.database.ref('/motoristas').child(this.uid);
        listDB.update(
          {
            perfil: this.foto
          }
        );
        this.carregarBanco();
      }
  });
  }

  addDados(){
    document.getElementById('imagem').appendChild(this.element);
    document.getElementById('nome').innerHTML = this.info.nome;
    document.getElementById('avaliacao').innerHTML = this.info.avaliacao;
    document.getElementById('cor').innerHTML = this.info.cor;
    document.getElementById('placa').innerHTML = this.info.placa;
    document.getElementById('corridas').innerHTML = this.info.corridas;

    this.loading.dismiss();
  }

  abrirHome(){
    this.navCtrl.pop();
  }
}
