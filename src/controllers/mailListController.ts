import { Request, Response} from 'express';
import { emailList } from '../entity/emailListEntity';
import { EmailListService } from '../service/mailListService';
class mailListController{
    public async mailStore(req: Request, res: Response){
        try{
            let mailList = new emailList();

            const mailListService = new EmailListService();

            mailList.email = req.body.email;
            mailList.status = req.body.status;
            await mailListService.insertOne(mailList);

            res.status(201).json({
                message: "Email enviado com sucesso !",
                sucess: true,
            })
            
            
        }
        catch{
            res.status(400).json({
                message: "Email já cadastrado ou inválido",
                sucess: false,
            })
        }
    }
    public async index(req: Request, res: Response){
        try{
            const emailListService = new EmailListService();
            const demand: emailList[] = await emailListService.getAll();
            return res.status(200).json(demand);
        }catch(err){
            res.status(404).json(err);
        } 
    }
}

export default new mailListController();