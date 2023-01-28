export interface ActionType {
    type: string;
    payload: any;
}

export interface Exception {
    id: string;
    exceptionMessageType: string;
    description: string;
}