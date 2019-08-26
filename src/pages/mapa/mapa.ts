import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, NavController, AlertController, ToastController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

declare var google;

@IonicPage()
@Component({
    selector: 'page-mapa',
    templateUrl: 'mapa.html',
})
export class MapaPage {
    @ViewChild('map') mapElement: ElementRef;

    pedido = true;
    final = false;

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer(
        { polylineOptions: { 
            strokeColor: "#292838",
            strokeOpacity: 0.8,
            strokeWeight: 8,
        }});
    map: any;
    uid: string;
    id_motorista: string;
    estado: string;

    usuarioPosition: any;
    startPosition: any;
    destinoPosition: any;

    constructor(
        private geolocation: Geolocation,
        public navParams: NavParams,
        private db: AngularFireDatabase,
        private actionSheetCtrl: ActionSheetController,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController){
        this.uid = navParams.get('id');
        this.id_motorista = navParams.get('id_motorista');
        this.estado = navParams.get('estado');
    }

    ionViewDidLoad(){
        this.pegarDados();
    }

    pegarDados(){
        let listDB = this.db.database.ref('pedidos').child(this.uid);
        
        listDB.once('value', (snapshot) => {
        
            let info = snapshot.val();
            if(info != null){
                if(this.estado == '1'){
                    this.pedido = false;
                    this.final = true;
                }
                this.usuarioPosition = info.origemLat+", "+info.origemLng;
                this.destinoPosition = info.destinoLat+", "+info.destinoLng;
                this.pegarLocalizacao();                                            
            }else{
                let toast = this.toastCtrl.create({
                    message: 'Esse pedido não existe mais',
                    duration: 4000
                });
                toast.present();
                this.navCtrl.pop();
            }
        });
    }

    pegarLocalizacao(){
        this.geolocation.getCurrentPosition().then(
            (resp) => {
                this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                this.initializeMap();
                console.log("Posição atual: "+resp.coords.latitude, resp.coords.longitude);
            }).catch(
            (error) => {
                console.log('Error getting location', error);
                console.log("erro no geolocation");
        });
    }

    initializeMap(){
        const mapOptions = {
            zoom: 18,
            center: this.startPosition,
            disableDefaultUI: true
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.directionsDisplay.setMap(this.map);

        const request = {
            // Pode ser uma coordenada (LatLng), uma string ou um lugar
            origin: this.startPosition,
            destination: this.destinoPosition,
            waypoints: [{location: this.usuarioPosition}],
            travelMode: 'DRIVING'
        };

    this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }

    traceRoute(service: any, display: any, request: any) {

        service.route(request, function (result, status) {
            if (status == 'OK') {
                display.setDirections(result);
            }
        });
    }

    opcoesPedido() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Aceitar corrida',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Aceitar',
                    role: 'destructive',
                    handler: () => {
                        this.aceitarPedidos();
                        console.log('aceito');
                        this.pedido = false;
                        this.final = true;
                    }
                },{
                    text: 'Cancelar',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        actionSheet.present();
    }

    opcoesFinal() {
    const actionSheet = this.actionSheetCtrl.create({
        title: 'Opções',
        buttons: [
        {
            text: 'Corrida finalizada',
            role: 'destructive',
            handler: () => {
            let alert = this.alertCtrl.create({
                title: 'Essa corrida foi finalizada?',
                buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                    this.corridaFinalizada();
                    }
                },
                {
                    text: 'Não',
                    handler: () => {
                    
                }
                }
            ]
            });
            alert.present();
            }
        },
        {
            text: 'Cancelar corrida',
            role: 'destructive',
            handler: () => {
            let alert = this.alertCtrl.create({
                title: 'Deseja cancelar essa corrida?',
                buttons: [
                    {
                    text: 'Sim',
                    handler: () => {
                    this.cancelarPedido();
                    this.navCtrl.pop();
                    }
                },
                {
                    text: 'Voltar',
                    handler: () => {
                    
                    }
                }
                ]
            });
            alert.present();
            }
        },{
            text: 'Voltar',
            role: 'cancel',
            handler: () => {
            }
        }
        ]
    });
    actionSheet.present();
    }

    aceitarPedidos(){
        let listDB = this.db.database.ref('pedidos').child(this.uid);
            
        listDB.update(
            {
                motorista: this.id_motorista
            }
        );
    }

    cancelarPedido(){
        let listDB = this.db.database.ref('pedidos').child(this.uid);
        
        listDB.update(
            {
                motorista: ""
            }
        );
    }

    verificarPedido(){
        let listDB = this.db.database.ref('pedidos').child(this.uid);
        
            listDB.on('value', (snapshot) => {
                let info = snapshot.val();
                
                if(info == null){
                    let alert = this.alertCtrl.create({
                        title: 'Usuario cancelou a corrida',
                        cssClass: 'alertDanger',
                        buttons: [
                            {
                                text: 'Voltar',
                                handler: () => {
                                    this.navCtrl.pop();
                                }
                            }
                        ]
                    });
                    alert.present();
                }
        });
    }

    corridaFinalizada(){
        let alert = this.alertCtrl.create({
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
        });
        alert.present();
        let userDB = this.db.database.ref('pedidos').child(this.uid);
        userDB.update(
            {
                status: "finalizado"
            }
        );
    }
}