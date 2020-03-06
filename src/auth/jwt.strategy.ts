import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{

    constructor(/*private readonly authService: AuthService*/) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Gw35ZiJ4vrKvb2L8zdsLWjRMQOreDmRE86A7xNXdIEfQ4bDUXxEot2IK651np/Je+KICiB+mbNYYpmnWp1DPUUJzazHM/43ky/elD0sK9qeuBrCWQeDHIFxhaMtrZOKhHZ8uQXTpHNLsAHB0fqH3grQlye7zAmsF5s4Em6rOYSfJDjI4ix27MxB4Mr+g+1SBoqOAHsRxwbGjQnTLmA0EdLztJwzC8mLxZm07Aic/j7Xz487no6p/pVp47scDNKPxjWmmEBm2O1hNDlVWHwO7Jd+5P7zwTcPQRuCUE0FlcBkb8D1UY7VTYhURt92yg+Zoz6LkbvuQh1DHZJE2DdfsjA=='
        });
    }

    async validate(payload, done: Function)
    {
        try
        {
            // You could add a function to the authService to verify the claims of the token:
            // i.e. does the user still have the roles that are claimed by the token
            //const validClaims = await this.authService.verifyTokenClaims(payload);
            
            //if (!validClaims)
            //    return done(new UnauthorizedException('invalid token claims'), false);
    
            done(null, payload);
        }
        catch (err)
        {
            throw new UnauthorizedException('unauthorized', err.message);
        }
    }

}