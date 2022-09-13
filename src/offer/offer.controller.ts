import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/schemas/user.schema';
import { Offer } from '../schemas/offer.schema';
import { CreateOfferDto } from './dto/create-offer.dto';
import { FilterOfferDto } from './dto/filter-offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}
  @Get()
  getOffers(@Query() filterOfferDto: FilterOfferDto): Promise<Offer[]> {
    if (Object.keys(filterOfferDto).length > 0) {
      return this.offerService.getOffersWithFilters(filterOfferDto);
    } else {
      return this.offerService.getOffers();
    }
  }

  @Get('/:id')
  getOfferById(@Param('id') id: string): Promise<Offer> {
    return this.offerService.getOfferById(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard())
  updateOffer(
    @Param('id') id: string,
    @Body() updateOfferDto: CreateOfferDto,
  ): Promise<Offer> {
    return this.offerService.updateOffer(id, updateOfferDto);
  }
  @Patch('apply/:id')
  @UseGuards(AuthGuard())
  applyForOffer(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Offer> {
    return this.offerService.applyForOffer(id, user);
  }
  @Post()
  @UseGuards(AuthGuard())
  createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() employer: User,
  ): Promise<Offer> {
    return this.offerService.createOffer(createOfferDto, employer);
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteOffer(@Param('id') id: string): Promise<void> {
    return this.offerService.deleteOffer(id);
  }
}
