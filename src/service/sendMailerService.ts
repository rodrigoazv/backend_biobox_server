import SES from 'aws-sdk/clients/ses';

import config from '../config/config';

export class MailSend{
    private client: SES;

    constructor(){
        this.client = new SES({
          region: 'us-east-1',
        });
    }
    
    async run(
      messageData:{
        to: string,
        subject: string,
        text: string,
        html: string,
      }
      ): Promise<void>{
      await this.client.sendEmail({
        Source:'Recuperação de senha Biocampeiro <biocampeiro@biocampeiro.com>',
        Destination:{
          ToAddresses:[messageData.to],
        },
        Message:{
          Subject:{
            Data:messageData.subject,
          },
          Body:{
            Text:{
              Data: messageData.text,
            },
            Html:{
              Data: messageData.html,
            }
          },
        },
        ConfigurationSetName:'Tree',
      })
      .promise()
    }
}




