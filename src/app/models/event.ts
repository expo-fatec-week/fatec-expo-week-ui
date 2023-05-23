export interface ResponseEvent {
    id_evento: number;
    descricao: string;
    tipo: string;
    data_evento: string;
    dtcria?: string;
    qtd_participantes?: number;
}

export interface ResponseEventLecture extends ResponseEvent {
    cod_verificacao: string
    dt_verificacao: string
    validado_por: string
}

export interface RequestLectureCode {
    id_pessoa: number;
    id_evento: number;
}

export interface RequestConfirmLecture extends RequestLectureCode {
    cod_validacao: string;
}

export interface RequestConfirmExhibit {
    id_pessoa_participante: number;
    id_pessoa_validacao: number;
    id_evento: number;
}