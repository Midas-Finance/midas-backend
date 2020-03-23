import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin()
    {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req)
    {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt) {
          return {
            response: 'SUCCESS',
            jwt 
          }
        }
        else {
          return {
            response: 'FAILURE',
            jwt: ''
          }
        }
    }

    
    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource()
    {
        return 'JWT is working!';
    }

}