export interface RequestLoginStudent {
    ra: string;
    email: string;
}

export interface RequestLoginVisitor {
    cpf: string;
    email?: string;
    name?: string;
    tel?: string;
    aceitaTermo?: boolean;
}

export interface ResponseLogin {
    access_token: string;
}
