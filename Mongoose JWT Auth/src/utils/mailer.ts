import env from '@/core/config/env'
import { INodeMailer } from '@/core/interfaces/IUtils'
import { injectable } from 'inversify'
import nodeMailer from 'nodemailer'

@injectable()
export default class NodeMailer implements INodeMailer {
  private readonly emailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.MAILER.user,
      pass: env.MAILER.pass,
    },
  })

  async sendMail(option: object): Promise<void> {
    await this.emailTransporter.sendMail(option, (error) => {
      if (error) {
        console.log(error)
      }
    })
  }
}
