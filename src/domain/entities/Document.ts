export class Document {
    constructor(
        private readonly id: string,
        public title: string,
        public content: string,
        public ownerID: string,
        public CreatedAt: Date,
        public updatedAt: Date
    ){}
} 