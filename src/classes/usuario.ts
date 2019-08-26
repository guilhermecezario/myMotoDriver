export class Usuario{

	private nome: string;
	private dataNasc: string;
	private cnh: string;
	private cor: string;
	private placa: string;
	private rg: string;

	constructor(cnh: string, cor: string, dataNasc: string, nome: string, placa: string, rg: string){
		this.cnh = cnh;
		this.cor = cor;
		this.dataNasc = dataNasc;
		this.nome = nome;
		this.placa = placa;
		this.rg = rg;
	}


	setNome(nome: string):void{
		this.nome = nome;
	}

	getNome():string{
		return this.nome;
	}

	setDataNasc(d: string):void{
		this.dataNasc = d;
	}

	getDataNasc():string{
		return this.dataNasc;
	}

	setCnh(c: string):void{
		this.cnh = c;
	}

	getCnh():string{
		return this.cnh;
	}

	setCor(c: string):void{
		this.cor = c;
	}

	getCor():string{
		return this.cor;
	}

	setPlaca(p: string):void{
		this.placa = p;
	}

	getPlaca():string{
		return this.placa;
	}

	setRg(r: string):void{
		this.rg = r;
	}

	getRg():string{
		return this.rg;
	}

}