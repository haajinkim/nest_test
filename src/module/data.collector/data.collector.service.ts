import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { CreateDataCollectorDto } from './dto/create-data.collector.dto';
import { UpdateDataCollectorDto } from './dto/update-data.collector.dto';

@Injectable()
export class DataCollectorService {
  constructor(
    private prisma: PrismaService,
    private readonly axios: HttpService
  ){}
  create(createDataCollectorDto: CreateDataCollectorDto) {
    return 'This action adds a new dataCollector';
  }

  //this renders the function every 15 minutes
  @Cron("0 */15 * * * *",)
  async findAll() {
    try {
        const {results}:any = await lastValueFrom(this.axios.get(`https://randomuser.me/api`).pipe(
          map(response => {
            return response.data;
          })
        ))

        console.log(results)
        const params = {
          email: results[0].email,
          name: results[0].name,
          address: results[0].state,
          city: results[0].city,
          country: results[0].country,
          location: results[0].location
        }
 
        const data = await this.prisma.user.create({data: params})

        return data
    } catch (error) {
      console.log('error: ', error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} dataCollector`;
  }

  update(id: number, updateDataCollectorDto: UpdateDataCollectorDto) {
    return `This action updates a #${id} dataCollector`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataCollector`;
  }
}
