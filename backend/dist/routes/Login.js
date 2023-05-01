import { QueryTypes } from "sequelize";
import { validationResult, body } from "express-validator";
import bcrypt from "bcrypt";
const Login = (app, connect) => {
    app.post('/login', body('email').notEmpty().isEmail().escape(), body('password').notEmpty().escape(), (req, res) => {
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        let email = req.body.email;
        connect.query("SELECT * FROM user WHERE mail = :mail", {
            type: QueryTypes.SELECT,
            replacements: {
                mail: email
            }
        })
            .then((results) => {
            if (results.length > 0) {
                const compare = async () => {
                    const comp = await bcrypt.compare(req.body.password, results[0].password);
                    if (comp == false) {
                        return res.status(400).json({ errors: "Password not good" });
                    }
                    return res.status(200).json({ user: results[0] });
                };
                compare();
            }
            else {
                return res.status(400).json({ errors: "No user find" });
            }
        })
            .catch((error) => {
            return res.status(400).json({ errors: "Email is not found" });
        });
    });
};
export default Login;
