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
        subject: string,
        text: string,
        html: string,
      }
      ): Promise<void>{
      await this.client.sendEmail({
        Source:'Rodrigo Azevedo <rodrigo@biocampeiro.com.br>',
        Destination:{
          ToAddresses:['Rodrigo Azevedo <rodrigo@biocampeiro.com.br>'],
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




