export interface taskType {
    _id: string;
    title: string;
    description: string;
    dateCreate: Date;
    dateFinish?: Date;
    category?: string;
    user: Number
    type: string;
    status: 'to do' | 'in progress' | 'closed';
}
