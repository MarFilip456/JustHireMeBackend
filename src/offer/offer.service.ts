import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from '../schemas/offer.schema';
import { CreateOfferDto } from './dto/create-offer.dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>,
  ) {}

  async getOffers(): Promise<Offer[]> {
    return this.offerModel.find();
  }
  async getOfferById(id: string): Promise<Offer> {
    const found = await this.offerModel.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Offer with ID "${id}" not found`);
    }
    return found;
  }
  async createOffer(
    createOfferDto: CreateOfferDto,
    employer: User,
  ): Promise<Offer> {
    const id = uuid();
    const offer = new this.offerModel({
      id,
      addedBy: employer.id,
      ...createOfferDto,
    });
    return offer.save();
  }
  async updateOffer(
    offerId: string,
    updateOfferDto: CreateOfferDto,
  ): Promise<Offer> {
    const filter = { id: offerId };
    const updateObject = { ...updateOfferDto, appliers: [] };
    const offer = await this.offerModel.findOneAndUpdate(filter, updateObject, {
      new: true,
    });
    return offer;
  }
  async applyForOffer(offerId: string, user: User) {
    const {
      id,
      email,
      name,
      surname,
      logoUrl,
      experience,
      mainLang,
      location,
      aboutYou,
      gitHubUrl,
      linkedInUrl,
    } = user;
    const offer = await this.offerModel.findOneAndUpdate(
      { id: offerId },
      {
        $push: {
          appliers: {
            id,
            email,
            name,
            surname,
            logoUrl,
            experience,
            mainLang,
            location,
            aboutYou,
            gitHubUrl,
            linkedInUrl,
          },
        },
      },
      { new: true },
    );
    return offer;
  }
  async deleteOffer(id: string): Promise<void> {
    const result = await this.offerModel.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Offer with id ${id} not found.`);
    }
  }
}
