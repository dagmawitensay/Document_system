import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// API Endpoint was not working so this is to mock a login endpoint
export class UserController {
    users = [
        {"id": "1", "email": "user1@gmail.com", "password": "123", "role": "admin"},
        {"id": "2", "email": "user2@gmail.com", "password": "123", "role": "regular_user"}
    ]
    constructor(){}
    async login(req: Request, res: Response) {
        try {
            const token = await this.loginHelper(req.body.email, req.body.password)
            res.json(token)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    async loginHelper(email: string, password: string): Promise<string> {
        let user: any
        let i
        for (i = 0; i < this.users.length; i++) {
            if (this.users[i].email == email) {
                user = this.users[i];
            }
        }

        if (!user) {
            throw new Error("Incorrect email or password!")
        }

        if (user.password != password) {
            throw new Error("Incorrect email or password!")
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_SECRET_KEY as string, {expiresIn: '24h'})

        return token
    }
}