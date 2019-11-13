import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { HomePage } from '../home/home';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('opcoesIniciais') opcoesIniciais: ElementRef;
  @ViewChild('opcoesFinais') opcoesFinais: ElementRef;

  final = false;

  todasInfoCliente: any;

  directionsService: any;
  directionsDisplay: any;
  map: any;
  uid: string;
  id_motorista: string;
  pedidoPendente: boolean;

  usuarioPosition: any;
  startPosition: any;
  destinoPosition: any;

  constructor(
    private geolocation: Geolocation,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.uid = this.navParams.get('id');
    this.id_motorista = this.navParams.get('id_motorista');
    console.log('entrando pagina map', this.uid, this.id_motorista);
    this.initializeMap();

    this.db.database.ref('pedidos').child(this.uid).on('value', this.pegarDados.bind(this))
  }

  ionViewWillLeave() {
    console.log('saindo pagina map')
    this.db.database.ref('pedidos').child(this.uid).off('value')
  }

  pegarDados(snapshot) {
    var info = snapshot.val();

    if(info == null) {
      // usuário cancelou ou a corrida foi apagada do firebase
      this.alertCtrl.create({
        title: 'Usuario cancelou a corrida',
        cssClass: 'alertDanger',
        buttons: [{
          text: 'Voltar',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }]
      }).present();

    } else {
      // algo foi alterado nessa linha do firebase
      this.todasInfoCliente = info;
      if(info.motorista == this.id_motorista) {
        this.final = true;
      }

      this.usuarioPosition = info.origemLat + ", " + info.origemLng;
      this.destinoPosition = info.destinoLat + ", " + info.destinoLng;
      this.pegarLocalizacao();
    }
  }

  pegarLocalizacao() {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.traceRoute(this.directionsDisplay);
        console.log("Posição atual: " + resp.coords.latitude, resp.coords.longitude);
      }).catch(
      (error) => {
        this.toastCtrl.create({
          message: 'Ops deu algum erro com seu GPS',
          duration: 4000
        }).present();
        this.navCtrl.setRoot(HomePage);
      });
  }

  initializeMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "#292838",
      strokeOpacity: 1,
      strokeWeight: 5,
    }
  });
    let centerMap = new google.maps.LatLng(-23.9793, -48.8769);
    const mapOptions = {
      zoom: 18,
      center: centerMap,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);

  }

  traceRoute(display: any) {
    const request = {
      // Pode ser uma coordenada (LatLng), uma string ou um lugar
      origin: this.startPosition,
      destination: this.destinoPosition,
      waypoints: [{
        location: this.usuarioPosition
      }],
      travelMode: 'DRIVING'
    };

    this.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  opcoes() {
    if (this.final == false) {
      this.toggleOpcoesIniciais();
    } else {
      this.toggleOpcoesFinais();
    }
  }

  toggleOpcoesIniciais() {
    if(this.opcoesIniciais.nativeElement.classList.contains('opened'))
      this.opcoesIniciais.nativeElement.classList.remove('opened')
    else
      this.opcoesIniciais.nativeElement.classList.add('opened')
  }

  toggleOpcoesFinais() {
    if(this.opcoesFinais.nativeElement.classList.contains('opened'))
      this.opcoesFinais.nativeElement.classList.remove('opened')
    else
      this.opcoesFinais.nativeElement.classList.add('opened')
  }

  voltarHome(){
    // this.navCtrl.push(HomePage);
    this.db.database.ref('pedidos').child(this.uid).update({
      motorista: ""
    }, (err:Error) => {
      this.navCtrl.push(HomePage);
    });
  }

  aceitarPedido() {
    this.db.database.ref('pedidos').child(this.uid).update({
      motorista : this.id_motorista
    }).then((data)=>{
      this.toggleOpcoesIniciais();
      this.toggleOpcoesFinais();
    });
  }

  cancelarPedido() {
    this.alertCtrl.create({
      title: 'Deseja cancelar essa corrida?',
      buttons: [{
          text: 'Sim',
          handler: () => {
            this.db.database.ref('pedidos').child(this.uid).update({
              motorista: ""
            }, (err:Error) => {
              this.navCtrl.push(HomePage);
            });
          }
        },
        {
          text: 'Voltar',
          handler: () => {}
        }
      ]
    }).present();
  }

  corridaFinalizada() {
    this.alertCtrl.create({
      title: 'Essa corrida foi finalizada?',
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.alertCtrl.create({
            title: 'Otimo',
            message:'Agora o usuario ira avaliar a corrida para ser realmente finalizada',
            cssClass: 'alertDanger',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.setRoot(HomePage);
                }
              }
            ]
        }).present();
        this.db.database.ref('pedidos').child(this.uid).update(
          {
            status: "finalizado"
          }
        );
        }
      },
        {
          text: 'Não',
          handler: () => {}
        }
      ]
    }).present();
  }
}
