import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travels, TravelData, TravelDataWithoutId } from '../../travels'; // Importáljuk a Travels osztályt és a TravelData típust

@Injectable()
export class TravelsService {
  private travels = new Travels(); // Használjuk a Travels osztályt

  create(createTravelDto: CreateTravelDto): TravelData {
    return this.travels.add(createTravelDto);
  }

  findAll(sort?: string): TravelData[] {
    let sortedTravels = Array.from(this.travels.getAll());
    if (sort) {
      const [key, order] = sort.split('_');
      sortedTravels.sort((a, b) => {
        if (order === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
    }
    return sortedTravels;
  }

  findOne(id: number): TravelData {
    const travel = this.travels.getById(id);
    if (!travel) {
      throw new NotFoundException(`Travel with id ${id} not found`);
    }
    return travel;
  }

  update(id: number, updateTravelDto: UpdateTravelDto): TravelData {
    const existingTravel = this.findOne(id);
    const updatedTravel: TravelDataWithoutId = {
      destination: updateTravelDto.destination ?? existingTravel.destination,
      description: updateTravelDto.description ?? existingTravel.description,
      imgUrl: updateTravelDto.imgUrl ?? existingTravel.imgUrl,
      price: updateTravelDto.price ?? existingTravel.price,
      discount: updateTravelDto.discount ?? existingTravel.discount,
    };
    return this.travels.replace(id, updatedTravel);
  }

  remove(id: number): void {
    const success = this.travels.remove(id);
    if (!success) {
      throw new NotFoundException(`Travel with id ${id} not found`);
    }
  }
}