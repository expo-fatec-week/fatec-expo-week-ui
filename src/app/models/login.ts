export interface RequestLoginAdministrator {
    email: string;
    password: string;
}

export interface RequestNewPasswordAdministrator extends RequestLoginAdministrator {
    newPassword: string;
}

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

export interface UserLoggedIn {
    name: string;
    email: string;
    ra?: string;
    userType?: string;
    personId: number;
    respEventId: number;
}

export type ResponseVisitor = RequestLoginVisitor;