import express, { Request, Response } from "express"
import { QueryTypes, Sequelize } from "sequelize"
import { validationResult, body } from "express-validator"
import bcrypt from "bcrypt"

interface User {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    status: boolean,
}
const Login = (app: express.Application, connect: Sequelize) => {
    app.post('/login',body('email').notEmpty().isEmail().escape(), body('password').notEmpty().escape(), (req: Request, res: Response) => {
         
         let error = validationResult(req)
        if(!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }
        let email = req.body.email
        connect.query("SELECT * FROM user WHERE mail = :mail", {
            type: QueryTypes.SELECT,
            replacements: {
                mail: email
            }
        })
        .then((results: any) => {
             if (results.length > 0) {
                const compare = async () => {
                    const comp = await bcrypt.compare(req.body.password, results[0].password)
                    if (comp == false) {
                        return res.status(400).json({ errors: "Password not good"})
                    }
                    return res.status(200).json({ user: results[0]})
                }
                compare()
            } else { 
                return res.status(400).json({ errors: "No user find"})
            }
        })
        .catch((error) => { 
            return res.status(400).json({ errors: "Email is not found"})
        })
    })
}

export default Login