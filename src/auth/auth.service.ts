import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    
    private readonly JWT_SECRET_KEY: string;; // <- replace this with your secret key

    constructor(/*private readonly usersService: UsersService*/) {
      this.JWT_SECRET_KEY = 'Gw35ZiJ4vrKvb2L8zdsLWjRMQOreDmRE86A7xNXdIEfQ4bDUXxEot2IK651np/Je+KICiB+mbNYYpmnWp1DPUUJzazHM/43ky/elD0sK9qeuBrCWQeDHIFxhaMtrZOKhHZ8uQXTpHNLsAHB0fqH3grQlye7zAmsF5s4Em6rOYSfJDjI4ix27MxB4Mr+g+1SBoqOAHsRxwbGjQnTLmA0EdLztJwzC8mLxZm07Aic/j7Xz487no6p/pVp47scDNKPxjWmmEBm2O1hNDlVWHwO7Jd+5P7zwTcPQRuCUE0FlcBkb8D1UY7VTYhURt92yg+Zoz6LkbvuQh1DHZJE2DdfsjA==';
    };

    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>
    {
        try 
        {
            // You can add some registration logic here, 
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
            
            // if (!user)
                // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
                
            const payload = {
                thirdPartyId,
                provider
            }

            const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }

}