import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from '../schemas/offer.schema';
import { CreateOfferDto } from './dto/create-offer.dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/schemas/user.schema';
import { FilterOfferDto } from './dto/filter-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>,
  ) {}

  async getOffers(): Promise<Offer[]> {
    return (await this.offerModel.find()).reverse();
  }
  async getOffersWithFilters(filterOfferDto: FilterOfferDto): Promise<Offer[]> {
    const {
      search,
      location,
      mainField,
      minSalary,
      maxSalary,
      employment,
      experience,
      undisclosed,
      remote,
    } = filterOfferDto;
    let offers = this.offerModel.find();
    if (search) {
      offers = offers.find({
        jobPosition: new RegExp(search, 'i'),
      });
    }
    if (location) {
      offers = offers.find({
        location: new RegExp(location, 'i'),
      });
    }
    if (mainField) {
      offers = offers.find({ mainField: mainField });
    }
    if (minSalary) {
      offers = offers.find({
        $or: [
          { 'employment.b2b.minSalary': { $gt: minSalary } },
          { 'employment.uop.minSalary': { $gt: minSalary } },
        ],
      });
    }
    if (maxSalary) {
      offers = offers.find({
        $or: [
          {
            $and: [
              { 'employment.b2b.maxSalary': { $lt: maxSalary } },
              { 'employment.b2b.maxSalary': { $gt: 0 } },
            ],
          },
          {
            $and: [
              { 'employment.uop.maxSalary': { $lt: maxSalary } },
              { 'employment.uop.maxSalary': { $gt: 0 } },
            ],
          },
        ],
      });
    }
    if (employment) {
      if (employment === 'b2b') {
        offers = offers.find({ 'employment.b2b.allowB2b': true });
      } else if (employment === 'uop') {
        offers = offers.find({ 'employment.uop.allowUop': true });
      }
    }
    if (experience) {
      offers = offers.find({ expLevel: experience });
    }
    if (undisclosed) {
      offers = offers.find({ 'employment.undisclosed': true });
    }
    if (remote) {
      offers = offers.find({
        $or: [{ fullyRemote: true }, { fullyRemote: false }],
      });
    }
    return offers;
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
