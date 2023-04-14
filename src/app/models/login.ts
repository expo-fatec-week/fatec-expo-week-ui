export interface RequestLoginStudent {
    ra: string;
    email: string;
}

export interface RequestLoginPrivate {
    user: string;
    password: string;
}

export interface RequestLoginVisitor {
    cpf: string;
    email?: string;
    name?: string;
    tel?: string;
    aceitaTermo?: boolean;
}

export interface ResponseLogin {
    id_pessoa: number;
    nome: string;
    telefone: string;
    email: string;
}

export interface ResponseLoginStudent extends ResponseLogin {
    ra: string;
    descricao: string;
    semestre: number;
}

export interface ResponseLoginVisitor extends ResponseLogin {
    cpf: string;
}

export interface ResponseLoginPrivate {
    message: string;
    token: string;
}