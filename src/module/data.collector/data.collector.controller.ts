import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { DataCollectorService } from './data.collector.service';
import { CreateDataCollectorDto } from './dto/create-data.collector.dto';
import { UpdateDataCollectorDto } from './dto/update-data.collector.dto';

@Controller('collector')
export class DataCollectorController {
  constructor(private readonly dataCollectorService: DataCollectorService) {}

  @Post()
  create(@Body() createDataCollectorDto: CreateDataCollectorDto) {
    return this.dataCollectorService.create(createDataCollectorDto);
  }

  @Get()
async  findAll(@Res() res: Response) {

    return res.status(200).json(await this.dataCollectorService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataCollectorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataCollectorDto: UpdateDataCollectorDto) {
    return this.dataCollectorService.update(+id, updateDataCollectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataCollectorService.remove(+id);
  }
}
