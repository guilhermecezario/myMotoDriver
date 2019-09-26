webpackJsonp([0],{

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(843);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(203);
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





var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, toast, afAuth, alertCtrl, db, camera, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        this.registerMoto = true;
        this.registerUser = false;
        this.registerCnh = false;
        this.final = false;
        //variaveis de imagem
        this.foto = '';
        this.cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.buscarImg = true;
        this.continuar = false;
        this.user = {};
    }
    RegisterPage.prototype.detalhesMoto = function () {
        if (this.placa == undefined || this.cor == undefined) {
            this.createToast('Você precisa preencher todos os campos');
        }
        else {
            if (this.placa.length != 7) {
                this.createToast('Opa... placa informada não tem quantidades de digitos compativeis');
            }
            else {
                this.registerMoto = false;
                this.registerCnh = true;
                this.registerUser = false;
                this.final = false;
            }
        }
    };
    RegisterPage.prototype.buscarImagem = function () {
        var _this = this;
        this.foto = '';
        this.camera.getPicture(this.cameraOptions).then(function (imageData) {
            var image = 'data:image/jpeg;base64,' + imageData;
            _this.foto = image;
            if (_this.foto.length > 1) {
                _this.buscarImg = false;
                _this.continuar = true;
            }
            else {
                _this.createToast('Você precisa selecionar uma imagem para continuar');
            }
        });
    };
    RegisterPage.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (user.email == undefined || user.password == undefined || this.confirm_pass == undefined || this.nome == undefined) {
                    this.createToast('Preencha todos os campos');
                }
                else {
                    if (user.password == this.confirm_pass) {
                        try {
                            this.loading.present();
                            this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
                                .then(function (res) {
                                _this.id = res.user.uid;
                                _this.finalizarCadastro();
                            }).catch(function (error) {
                                _this.loading.dismiss();
                                if (error.code == 'auth/network-request-failed') {
                                    _this.createToast('Vish amigo, você não está conectado a internet');
                                }
                                else if (error.code == 'auth/email-already-in-use') {
                                    _this.createToast('E-mail ja cadastrado');
                                }
                                else if (error.code == 'auth/weak-password') {
                                    _this.createToast('Senha precisa ter mais de 6 caracteres');
                                }
                                else {
                                    console.log(error);
                                }
                            });
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    else {
                        this.createToast('Senha não confere com a confirmação');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    RegisterPage.prototype.finalizarCadastro = function () {
        var _this = this;
        this.db.database.ref('pendentes/').child(this.id)
            .set({
            nome: this.nome,
            placa: this.placa,
            cor: this.cor,
            cnh_image: this.foto,
            email: this.user.email,
            senha: this.user.password
        }).then(function () {
            _this.loading.dismiss();
            _this.registerUser = false;
            _this.registerMoto = false;
            _this.registerCnh = false;
            _this.final = true;
        });
    };
    RegisterPage.prototype.abrirInfoUser = function () {
        this.registerUser = true;
        this.registerMoto = false;
        this.registerCnh = false;
        this.final = false;
    };
    RegisterPage.prototype.setId = function (id) {
        this.id = id;
    };
    RegisterPage.prototype.getId = function () {
        return this.id;
    };
    RegisterPage.prototype.abrirLogin = function () {
        this.navCtrl.pop();
    };
    RegisterPage.prototype.createToast = function (text) {
        this.toast.create({
            message: text,
            duration: 3000
        }).present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/register/register.html"*/'<ion-content class="background" >\n  <!-- Dados da moto -->\n  <div class="centerContent" *ngIf="registerMoto">\n    <img src="./assets/imgs/logo.png" class="logo">\n\n    <div class="buttonBack">\n      <p>Moto</p>\n    </div>\n      <input type="text" [(ngModel)]="cor" placeholder="Cor da moto" class="input">\n      <input type="text" [(ngModel)]="placa" placeholder="Numero da Placa" class="input">\n    <div class="buttonNext" (click)="detalhesMoto()">\n      Proximo\n    </div>\n    <div class="buttonBack" (click)="abrirLogin()">\n      Voltar para login\n    </div>\n  </div>\n\n  <!-- Foto da CNH -->\n  <div class="centerContent" *ngIf="registerCnh">\n    <img src="./assets/imgs/camera.svg" class="image">\n    <div class="text-1">\n      Tire uma foto da sua CNH\n    </div>\n    <div class="text-2">\n      Para nós ajudar e agilizamos o processo de verificação,\n      retire a do plastico abra e tire a foto em um local bem iluminado\n    </div>\n    <div class="buttonNext" (click)="buscarImagem()" *ngIf="buscarImg">\n        Buscar foto\n      </div>\n      <div class="buttonNext" (click)="abrirInfoUser()" *ngIf="continuar">\n          Continuar\n        </div>\n      <div class="buttonBack" (click)="abrirLogin()">\n        Voltar Login\n      </div>\n  </div>\n\n  <!-- dados pessoais -->\n  <div class="centerContent" *ngIf="registerUser">\n    <img src="./assets/imgs/logo.png" class="logo">\n    <div class="buttonBack">\n      Dados pessoais\n    </div>\n    <input type="text" [(ngModel)]="nome" placeholder="Nome" class="input">\n    <input type="text" [(ngModel)]="user.email" placeholder="E-mail" class="input">\n    <input type="password" [(ngModel)]="user.password" placeholder="Senha" class="input">\n    <input type="password" [(ngModel)]="confirm_pass" placeholder="Confirmação de senha" class="input">\n    \n    <div (click)="register(user)" class="buttonNext">\n      Confirmar\n    </div>\n    <div (click)="abrirLogin()" class="buttonBack">\n      Voltar para login\n    </div>\n  </div>\n\n  <!-- tela final -->\n  <div class="centerContent" *ngIf="final">\n    <img src="./assets/imgs/feito.svg" class="image">\n\n    <p class="text-1">Tudo pronto</p>\n\n    <p class="text-2">Agora que você fez a sua parte, os nossos administradores irão verificar sua situação e te mandaram um email autorizando o seu acesso. Aguarde...</p>\n    \n    <div class="buttonNext" (click)="abrirLogin()">\n      Ok\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/TCC/app_motorista/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=0.js.map