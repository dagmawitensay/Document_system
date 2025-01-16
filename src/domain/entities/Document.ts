export class Document {
    constructor(
        public title: string,
        public content: string,
        public ownerID: string,
        public readonly id?: string,
        public CreatedAt?: Date,
        public updatedAt?: Date
    ){}
} 