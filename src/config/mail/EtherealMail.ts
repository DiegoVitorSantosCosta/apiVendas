import nodemailer from "nodemailer";
import HandlebarsTemplate, { IParseMailTemplateDTO } from "./handlebarsTemplate";

export interface IEmailContact {
    name: string;
    email: string;
}
export interface ISendMail {
    to: IEmailContact;
    templateData: IParseMailTemplateDTO;
    from?: IEmailContact;
    subject: string;
}

export default class EtherealMail {
    static async sendMail({ to, subject, templateData, from }: ISendMail): Promise<void> {

        const account = await nodemailer.createTestAccount(); // cria uma conta de teste
        const mailTemplate = new HandlebarsTemplate();

        const transporter = nodemailer.createTransport({  // cria as configurações do nodemailer

            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        }); // cria um transporter  para enviar o email

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe Diego Dev',
                address: from?.email || "diegodev@gmail.com",
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject: subject,
            html: await mailTemplate.parse(templateData)

        })
        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}