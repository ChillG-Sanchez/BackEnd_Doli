import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { TravelData } from '../../travels'; // Importáljuk a TravelData típust

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Post()
  create(@Body() createTravelDto: CreateTravelDto): TravelData {
    return this.travelsService.create(createTravelDto);
  }

  @Get()
  findAll(@Query('sort') sort: string): TravelData[] {
    return this.travelsService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string): TravelData {
    return this.travelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto): TravelData {
    return this.travelsService.update(+id, updateTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.travelsService.remove(+id);
  }
}