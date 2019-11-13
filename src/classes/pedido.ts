export class Pedido{
    private usuario: string;
    private id: string;
    private preco: string;

    constructor(u: string, i:string, p:string){
        this.usuario = u;
        this.id = i;
        this.preco = p;
    }

    setUsuario(u: string):void{
        this.usuario = u;
    }

    getUsuario(){
        return this.usuario;
    }
    setId(i: string):void{
        this.id = i;
    }

    getId(){
        return this.id;
    }

    setPreco(p:string):void{
        this.preco = p;
    }

    getPreco(){
        return this.preco;
    }
}
