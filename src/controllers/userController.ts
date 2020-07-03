import { Request, Response } from 'express';
//import service
import { UserService } from '../service/userService';
//import user entity
import { UserBio } from '../entity/userEntity';
import { Adress } from '../entity/adressEntity';
import { AdressService } from '../service/adressService';
import { MailSend } from '../service/sendMailerService';

import jwt from "jsonwebtoken";




class userController {
    /* @GET alluser */
    public async index(req: Request, res: Response){
        try{
            const userService = new UserService();
            const user: UserBio[] = await userService.getAll();
            return res.json(user);
        }catch(err){
            res.json(err);
        } 
    }

    public async storeAdressAndUser(req: Request, res:Response){
        
        try{
            const userService = new UserService();
            const adressService = new AdressService();
            const user: UserBio = await userService.getById(req.userId);

            const adress = new Adress();
            adress.zipcode = req.body.zipcode;
            adress.city = req.body.city;
            adress.state = req.body.state;
            adress.street = req.body.street;
            adress.number = req.body.number;
            adress.complement = req.body.complement;
            adress.neighborhood = req.body.neighborhood;
            const adressFull = await adressService.insertOne(adress);
            
            user.adress = adressFull;
            const userAndAdressFull = await userService.updateOneComplet(user);
            console.log(userAndAdressFull);
            res.json({
                userAndAdressFull
            })
        }catch(err){
            res.json(err)
        }    

    }

    public async getUserEmail(req: Request, res: Response){
        try{
            const userService = new UserService();
            console.log(req.params.id);
            const user: UserBio = await userService.getByIdClean(req.params.id);
            res.json({
                user: user
            }) 
        }catch(err){
            err
        }
    }

    public async forgotPassword(req: Request, res: Response){        
        const email = req.body.email;

        try{
            const userService = new UserService();
            const mailSend = new MailSend();
           
            const user: UserBio = await userService.getByEmail(email)
            if(!user){
                return res.status(404).json({
                    message: 'usuário não encontrado'
                })
            }
            
            const token = jwt.sign(
                {
                  id: user.id
                },
                process.env.SECRET_KEY || 'authorization',
                {
                  expiresIn: '1h'
                }
            );
            
            user.passTokenRecovery = token;
            await userService.updateOneComplet(user);

            const messageData = {
                to: `${user.email}`,
                subject: 'Recuperação de senha',
                text: `Para recuperar seu login utilize o link : https://biocampeiro-frontend.herokuapp.com/recovery/${token}`,
                html: `<div style="align-items: center; min-width: 100%;">
                <div style="background-image: url(https://i.imgur.com/zeitEue.jpg); color:38200F;background-repeat:no-repeat;background-position:center;background-size: 100%; height: 600px; width: 600px; margin: 0 auto; ">
                    <div style="align-items: center; width:400px; margin:0 auto; padding-top:100px;">
                        <h1>Olá ${user.completName} tudo certinho ?</h1>
                        <p>
                            Uma solicitação de recuperação de senha foi realizada para sua conta (${email}) no nosso site. Se você não foi o autor, apenas descarte esse e-mail.</p>
                        <p>Caso tenha perdido sua senha não tem problema</br>
                        pode acessar por este link abaixo:  </p>
                        <button style="border:none; border-radius: 5px; padding: 10px;  background-color: #91B431;"><a href="https://biocampeiro-frontend.herokuapp.com/recovery/${token}" style="color:FFFAF5; text-decoration: none; font-weight: 600;">Link para recuperação</a></button>
                        <p>Abraaaço!</br>
                        Equipe Biocampeiro </p>
                    </div>
            </div>
            </div>`,
            }
            await mailSend.run(messageData)
            res.status(200).json({
                sucess: true, 
            })

        }catch(err){
            res.status(400).json({
                message: 'Não foi possivel encontra-lo',
                err: err
            })
        }
    }

    public async recoveryPassword(req: Request, res: Response){  
        const {email, token, password} = req.body;

        try{
            
            const userService = new UserService();
            const user: UserBio = await userService.getByEmail(email)
            console.log(user)
            if(!user){
                return res.status(404).json({
                    message: 'usuário não encontrado'
                })
            }
            if(token !== user.passTokenRecovery){
                return res.status(400).json({
                    message:'Token inválido'
                })
            }
            jwt.verify(token,  process.env.SECRET_KEY || 'authorization',async (err: any, result:any)  => {
                if(err){
                  return res.status(404).json({
                      message: 'invalid token ou expirado',
                      err: err
                    })
                }
                if(!err){
                    user.password = password;
                    const userUp = await userService.updateOneComplet(user)
                    return res.status(200).json({
                        message: 'sucess',
                        user: userUp
                    })
                }
              }
            );
        }
        catch(err){
            res.status(400).json({
                message: 'Não foi possivel encontra-lo',
                err: err
            })
        }
    }
}

export default new userController;