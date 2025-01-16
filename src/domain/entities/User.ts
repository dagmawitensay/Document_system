enum ROLE {
    ADMIN = 'admin',
    REGULAR_USER = 'regular_user'
};

export class User{
    constructor(
        public fullName: string,
        public email: string,
        public password: string,
        public role: ROLE 
    ) {}
}