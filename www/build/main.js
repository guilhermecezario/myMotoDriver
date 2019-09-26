webpackJsonp([4],{

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, afAuth, AlertCtrl, loadingCtrl, db, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.AlertCtrl = AlertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.db = db;
        this.toast = toast;
        this.user = {};
        this.PATH = 'motoristas/';
    }
    LoginPage.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loader_1;
            return __generator(this, function (_a) {
                try {
                    if (user.email !== undefined || user.password !== undefined) {
                        loader_1 = this.loadingCtrl.create({
                            cssClass: 'loading'
                        });
                        loader_1.present();
                        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(function (res) {
                            _this.uid = res.user.uid;
                            var listDB = _this.db.database.ref(_this.PATH).child(_this.uid);
                            listDB.on('value', function (snapshot) {
                                _this.info = snapshot.val();
                                if (_this.info == null) {
                                    loader_1.dismiss();
                                    _this.toast.create({
                                        message: 'Você ainda não esta autorizado',
                                        duration: 4000
                                    }).present();
                                }
                                else {
                                    loader_1.dismiss();
                                    _this.navCtrl.setRoot('HomePage');
                                }
                            });
                        }).catch(function (error) {
                            loader_1.dismiss();
                            if (error.code == 'auth/network-request-failed') {
                                _this.toast.create({
                                    message: 'Vish amigo, você não está conectado a internet',
                                    duration: 3000
                                }).present();
                            }
                            else {
                                _this.toast.create({
                                    message: 'E-mail ou senha incorreto',
                                    duration: 3000
                                }).present();
                            }
                        });
                    }
                    else {
                        this.toast.create({
                            message: 'Você precisa preencher todos os campos',
                            duration: 3000
                        }).present();
                    }
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.esqueceuSenha = function () {
        var _this = this;
        var alert = this.AlertCtrl.create({
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
                    handler: function (data) {
                        if (data.email == "") {
                            _this.toast.create({
                                message: 'Nenhum e-mail informado',
                                duration: 3000
                            }).present();
                        }
                        else {
                            var email_1 = data.email;
                            _this.afAuth.auth.sendPasswordResetEmail(email_1).then(function (data) {
                                _this.toast.create({
                                    message: 'Enviamos um e-amail para ' + email_1 + ', clique no link do e-amil para refefinir sua senha',
                                    showCloseButton: true
                                }).present();
                            }).catch(function (error) {
                                if (error.code == 'auth/network-request-failed') {
                                    _this.toast.create({
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
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.presentLoading = function () {
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/login/login.html"*/'<ion-content class="content">\n  <!-- <div class="align-input">\n    <div class="center">\n        <img src="./assets/imgs/logo.png" class="logo">\n      </div>\n      <div class="center margin-top-20">\n        <div class="background-input">\n          <ion-input type="text" [(ngModel)]="user.email" placeholder="E-mail" class="input"></ion-input>\n        </div>\n        <div class="background-input">\n          <ion-input type="password" [(ngModel)]="user.password" placeholder="Senha" class="input"></ion-input>\n        </div>\n        <div class="senha center mg-top-20" (click)="esqueceuSenha()">\n          Esqueceu sua senha?\n        </div>\n        </div>\n    \n        <div (click)="login(user)" class="center botao bold mg-top-20">\n      Entrar\n    </div>\n    <div (click)="register()" class="center bold white mg-top-20 font-18">\n      Cadastrar\n    </div>\n  </div> -->\n  <div class="centerContent">\n    <div>\n      <img src="../../assets/imgs/logo.png" class="logo">\n    </div>\n\n    <input type="email" placeholder="E-mail" [(ngModel)]="user.email" class="input">\n    <input type="password" placeholder="senha" [(ngModel)]="user.password" class="input">\n\n    <div class="forgotPassword" (click)="esqueceuSenha()">\n      <p>Esqueceu a senha?</p>\n    </div>\n    <div class="buttonEnter" (click)="login(user)">\n      Entrar\n    </div>\n    <div class="register" (click)="register()">\n      Cadastrar\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(417);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MapaPage = /** @class */ (function () {
    function MapaPage(geolocation, navParams, db, actionSheetCtrl, navCtrl, alertCtrl, toastCtrl) {
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.db = db;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.pedido = true;
        this.final = false;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: {
                strokeColor: "#292838",
                strokeOpacity: 0.8,
                strokeWeight: 8,
            } });
        this.uid = navParams.get('id');
        this.id_motorista = navParams.get('id_motorista');
        this.estado = navParams.get('estado');
    }
    MapaPage.prototype.ionViewDidLoad = function () {
        this.pegarDados();
    };
    MapaPage.prototype.pegarDados = function () {
        var _this = this;
        this.db.database.ref('pedidos').child(this.uid).once('value', function (snapshot) {
            var info = snapshot.val();
            if (info != undefined) {
                if (_this.estado == '1') {
                    _this.pedido = false;
                    _this.final = true;
                }
                _this.usuarioPosition = info.origemLat + ", " + info.origemLng;
                _this.destinoPosition = info.destinoLat + ", " + info.destinoLng;
                _this.pegarLocalizacao();
            }
            else {
                _this.toastCtrl.create({
                    message: 'Esse pedido não existe mais',
                    duration: 4000
                }).present();
                _this.navCtrl.pop();
            }
        });
    };
    MapaPage.prototype.pegarLocalizacao = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.initializeMap();
            console.log("Posição atual: " + resp.coords.latitude, resp.coords.longitude);
        }).catch(function (error) {
            _this.toastCtrl.create({
                message: 'Ops deu algum erro com seu GPS',
                duration: 4000
            }).present();
            _this.navCtrl.pop();
        });
    };
    MapaPage.prototype.initializeMap = function () {
        var mapOptions = {
            zoom: 18,
            center: this.startPosition,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.directionsDisplay.setMap(this.map);
        var request = {
            // Pode ser uma coordenada (LatLng), uma string ou um lugar
            origin: this.startPosition,
            destination: this.destinoPosition,
            waypoints: [{ location: this.usuarioPosition }],
            travelMode: 'DRIVING'
        };
        this.traceRoute(this.directionsService, this.directionsDisplay, request);
    };
    MapaPage.prototype.traceRoute = function (service, display, request) {
        service.route(request, function (result, status) {
            if (status == 'OK') {
                display.setDirections(result);
            }
        });
    };
    MapaPage.prototype.opcoesPedido = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Aceitar corrida',
            cssClass: 'action-sheets-groups-page',
            buttons: [
                {
                    text: 'Aceitar',
                    role: 'destructive',
                    icon: 'open',
                    handler: function () {
                        _this.aceitarPedidos();
                        _this.pedido = false;
                        _this.final = true;
                    }
                }, {
                    text: 'Cancelar',
                    icon: 'ios-close',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    MapaPage.prototype.opcoesFinal = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Opções',
            buttons: [
                {
                    text: 'Corrida finalizada',
                    icon: 'ios-checkmark',
                    role: 'destructive',
                    handler: function () {
                        _this.alertCtrl.create({
                            title: 'Essa corrida foi finalizada?',
                            buttons: [
                                {
                                    text: 'Sim',
                                    handler: function () {
                                        _this.corridaFinalizada();
                                    }
                                },
                                {
                                    text: 'Não',
                                    handler: function () {
                                    }
                                }
                            ]
                        }).present();
                    }
                },
                {
                    text: 'Cancelar corrida',
                    icon: 'ios-undo',
                    role: 'destructive',
                    handler: function () {
                        _this.alertCtrl.create({
                            title: 'Deseja cancelar essa corrida?',
                            buttons: [
                                {
                                    text: 'Sim',
                                    handler: function () {
                                        _this.cancelarPedido();
                                        _this.navCtrl.pop();
                                    }
                                },
                                {
                                    text: 'Voltar',
                                    handler: function () {
                                    }
                                }
                            ]
                        }).present();
                    }
                }, {
                    text: 'Voltar',
                    icon: 'ios-close',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    MapaPage.prototype.aceitarPedidos = function () {
        var listDB = this.db.database.ref('pedidos').child(this.uid);
        listDB.update({
            motorista: this.id_motorista
        });
    };
    MapaPage.prototype.cancelarPedido = function () {
        var listDB = this.db.database.ref('pedidos').child(this.uid);
        listDB.update({
            motorista: ""
        });
    };
    MapaPage.prototype.verificarPedido = function () {
        var _this = this;
        this.db.database.ref('pedidos').child(this.uid).on('value', function (snapshot) {
            var info = snapshot.val();
            if (info == null) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Usuario cancelou a corrida',
                    cssClass: 'alertDanger',
                    buttons: [
                        {
                            text: 'Voltar',
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        });
    };
    MapaPage.prototype.corridaFinalizada = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'Otimo',
            message: 'Agora o usuario ira avaliar a corrida para ser realmente finalizada',
            cssClass: 'alertDanger',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                    }
                }
            ]
        }).present();
        this.db.database.ref('pedidos').child(this.uid).update({
            status: "finalizado"
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapaPage.prototype, "mapElement", void 0);
    MapaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mapa',template:/*ion-inline-start:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/mapa/mapa.html"*/'<ion-content>\n  <div #map id="map"></div>\n  <div id="botao" (click)="opcoesPedido();" *ngIf="pedido">\n      Opções\n  </div>\n  <div id="botao" (click)="opcoesFinal();" *ngIf="final">\n    Opções\n</div>\n</ion-content>'/*ion-inline-end:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/mapa/mapa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], MapaPage);
    return MapaPage;
}());

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, db, camera, toast, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.camera = camera;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.mostrar = true;
        this.fechar = false;
        this.cnh = false;
        this.loading = this.loadingCtrl.create({
            cssClass: 'loadingPerfil'
        });
        this.cameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
        };
        this.foto = '';
        this.uid = navParams.get('uid');
    }
    PerfilPage.prototype.ionViewWillEnter = function () {
        this.loading.present();
        this.carregarBanco();
    };
    PerfilPage.prototype.carregarBanco = function () {
        var _this = this;
        var listDB = this.db.database.ref('/motoristas').child(this.uid);
        listDB.once('value', function (snapshot) {
            _this.info = snapshot.val();
            _this.element = document.createElement('img');
            _this.element.className = 'img';
            _this.element.src = "";
            if (_this.info.perfil == "") {
                _this.element.src = "../assets/imgs/default-user.png";
            }
            else {
                _this.element.src = _this.info.perfil;
            }
            if (_this.info.avaliacao !== 0) {
                _this.info.avaliacao = (_this.info.avaliacao / _this.info.corridas).toFixed(1);
            }
            _this.addDados();
        });
    };
    PerfilPage.prototype.mudarPerfil = function () {
        var _this = this;
        this.camera.getPicture(this.cameraOptions).then(function (imageData) {
            var image = 'data:image/jpeg;base64,' + imageData;
            _this.foto = image;
            if (_this.foto.length > 1) {
                var listDB = _this.db.database.ref('/motoristas').child(_this.uid);
                listDB.update({
                    perfil: _this.foto
                });
                _this.carregarBanco();
            }
        });
    };
    PerfilPage.prototype.addDados = function () {
        document.getElementById('imagem').appendChild(this.element);
        document.getElementById('nome').innerHTML = this.info.nome;
        document.getElementById('avaliacao').innerHTML = this.info.avaliacao;
        document.getElementById('cor').innerHTML = this.info.cor;
        document.getElementById('placa').innerHTML = this.info.placa;
        document.getElementById('corridas').innerHTML = this.info.corridas;
        this.loading.dismiss();
    };
    PerfilPage.prototype.abrirHome = function () {
        this.navCtrl.pop();
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/perfil/perfil.html"*/'<ion-content>\n<div>\n  <div class="containerHeader" id="container">\n    <div class="botao-perfil">\n      <ion-icon name="arrow-round-back" class="botao-voltar" (click)="abrirHome()"></ion-icon>\n      <ion-icon name="create" class="botao-editar" (click)="mudarPerfil()"></ion-icon>\n    </div>\n    <div id="imagem">\n    </div>\n    <div id="textos">\n      <p id="nome"></p>\n      <div>\n        <div class="displayFlex">\n          <p id="avaliacao"></p>\n          <ion-icon ios="ios-star" md="md-star"></ion-icon>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="boxInfo">\n    <div class="textInfo">\n      <h2>Informaçoes da moto</h2>\n      <div class="displayFlex">\n        <p class="boldFont">Cor:</p>\n        <p id="cor"></p>\n      </div>\n      <div class="displayFlex">\n        <p class="boldFont">Placa:</p>\n        <p id="placa"></p>\n      </div>\n    </div>\n  </div>\n  <div class="boxCorrida">\n    <div class="textCorrida">\n      <h2>Corridas realizadas</h2>\n      <div>\n        <p id="corridas"></p>\n      </div>\n    </div>\n  </div>\n  <div class="containerBody">\n  </div>\n</div>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/perfil/perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 214;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		839,
		3
	],
	"../pages/login/login.module": [
		376
	],
	"../pages/mapa/mapa.module": [
		840,
		2
	],
	"../pages/perfil/perfil.module": [
		842,
		1
	],
	"../pages/register/register.module": [
		841,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 259;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_pedido__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mapa_mapa__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__perfil_perfil__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//firebase


//Classes

//Paginas


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, afAuth, toast, db, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.toast = toast;
        this.db = db;
        this.zone = zone;
        this.pedidos = [];
        this.PATH = 'motoristas/';
        this.errorInternet = this.toast.create({
            message: 'Você esta sem internet',
        });
        this.reload = true;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.buscarDados();
    };
    HomePage.prototype.buscarDados = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (data) {
            if (data && data.email && data.uid) {
                _this.uid = data.uid;
                var listDB = _this.db.database.ref(_this.PATH).child(_this.uid);
                listDB.once('value', function (snapshot) {
                    _this.userDate = snapshot.val();
                    if (_this.userDate.perfil == "") {
                        _this.userDate.perfil = "../assets/imgs/default-user.png";
                    }
                    _this.buscarPedidos();
                });
            }
            else {
                _this.navCtrl.setRoot('LoginPage');
            }
        });
    };
    HomePage.prototype.buscarPedidos = function () {
        var _this = this;
        this.reload = false;
        this.db.database.ref('/pedidos').on('value', function (data) {
            _this.pedidos = [];
            data.forEach(function (item) {
                var dados = item.val();
                if (dados.motorista == "") {
                    var pedido_1 = new __WEBPACK_IMPORTED_MODULE_4__classes_pedido__["a" /* Pedido */](dados.usuario, item.key, dados.preco);
                    _this.zone.run(function () {
                        _this.pedidos.push(pedido_1);
                    });
                }
                else if (dados.motorista == _this.uid && dados.status == "") {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__mapa_mapa__["a" /* MapaPage */], {
                        id: item.key,
                        id_motorista: _this.uid,
                        estado: '1'
                    });
                }
            });
        });
    };
    HomePage.prototype.abrirMapa = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__mapa_mapa__["a" /* MapaPage */], {
            id: id,
            id_motorista: this.uid,
            estado: '0'
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        return this.afAuth.auth.signOut().then(function () {
            _this.toast.create({
                message: _this.userDate.nome + ' você desconectou da sua conta',
                duration: 4000
            }).present();
            _this.navCtrl.setRoot('LoginPage');
        }).catch(function (error) { return console.log(error); });
    };
    HomePage.prototype.abrirPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__perfil_perfil__["a" /* PerfilPage */], {
            uid: this.uid
        });
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.buscarPedidos();
            refresher.complete();
        }, 500);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/home/home.html"*/'<ion-menu [content]="content" class="ContentMenu">\n    <ion-header class="HeaderMenu" *ngIf="userDate">\n      <ion-toolbar>\n        <div>\n          <img [src]="userDate.perfil">\n        </div>\n        <div>\n          <p>{{userDate.nome}}</p>\n        </div>\n        <div class="buttonMenu" (click)="abrirPerfil()">\n          <ion-icon name="contact"></ion-icon>\n          Ver perfil\n        </div>\n      </ion-toolbar>\n    </ion-header>\n      <ion-content>\n        <button ion-item (click)= "logout()" menuClose class="buttonListMenu">          \n          Sair\n        </button>\n      </ion-content>\n    </ion-menu>\n    <ion-nav id="nav" #content [root]="rootPage"></ion-nav>\n\n    <ion-header>\n      <ion-navbar>\n        <button ion-button menuToggle [disabled]="userDate == undefined">\n          <ion-icon name=\'menu\'></ion-icon>\n        </button>\n        <ion-title>Pedidos</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n<ion-content class="content">\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n    <div *ngIf="pedidos.length > 0 && reload == false" class="list">\n      <ion-list *ngFor="let p of pedidos">\n        <ion-item (click)="abrirMapa(p.getId())" class="list-pedido">\n          <div class="list-nome">Nome: {{p.getUsuario()}}</div>\n          <div class="list-preco">Preço: {{p.getPreco()}}</div>\n        </ion-item>\n      </ion-list>\n    </div>\n    <div class="centerText" *ngIf="reload">\n      <p>Carregando...</p>\n    </div>\n    <div class="centerText" *ngIf="pedidos.length == 0 && reload == false">\n      <div>\n        Deslize para buscar mais\n      </div>\n      <div>\n        <ion-icon ios="ios-arrow-down" md="md-arrow-down"></ion-icon>\n      </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(423);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_mapa_mapa__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login_module__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_firebase_config__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_maps__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//pages




//plugins








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_mapa_mapa__["a" /* MapaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapa/mapa.module#MapaPageModule', name: 'MapaPage', segment: 'mapa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_12__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["AngularFireAuthModule"],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login_module__["LoginPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_mapa_mapa__["a" /* MapaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pedido; });
var Pedido = /** @class */ (function () {
    function Pedido(u, i, p) {
        this.usuario = u;
        this.id = i;
        this.preco = p;
    }
    Pedido.prototype.setUsuario = function (u) {
        this.usuario = u;
    };
    Pedido.prototype.getUsuario = function () {
        return this.usuario;
    };
    Pedido.prototype.setId = function (i) {
        this.id = i;
    };
    Pedido.prototype.getId = function () {
        return this.id;
    };
    Pedido.prototype.setPreco = function (p) {
        this.preco = p;
    };
    Pedido.prototype.getPreco = function () {
        return this.preco;
    };
    return Pedido;
}());

//# sourceMappingURL=pedido.js.map

/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/opt/lampp/htdocs/TCC/app_motorista/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/opt/lampp/htdocs/TCC/app_motorista/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyAfgjSwZ6q_1aCFNXlEhJv_vyltl2qD-lI",
    authDomain: "mymoto-9f776.firebaseapp.com",
    databaseURL: "https://mymoto-9f776.firebaseio.com",
    projectId: "mymoto-9f776",
    storageBucket: "mymoto-9f776.appspot.com",
    messagingSenderId: "74704005722",
    appId: "1:74704005722:web:9d6b1ea47ac201a1"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ })

},[418]);
//# sourceMappingURL=main.js.map