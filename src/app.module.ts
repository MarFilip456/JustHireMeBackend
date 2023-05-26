import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferModule } from './offer/offer.module';
import { AuthModule } from './auth/auth.module';
/* 'mongodb://localhost/nest' */
/* process.env.MONGODB_URI */
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    OfferModule,
    AuthModule,
  ],
})
export class AppModule {}
