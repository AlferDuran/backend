import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { Color } from './color.entity';

@Controller('colors')
export class ColorController {
  constructor(public service: ColorService) {}

  @Get('seed')
  async seedData(): Promise<string> {
    await Promise.all([
      this.service.create({
        name: 'black',
        value: 0,
        hex: '#000000',
        type: 'multiplier',
      }),
      this.service.create({
        name: 'brown',
        value: 1,
        hex: '#95804a',
        type: 'multiplier',
      }),
      this.service.create({
        name: 'red',
        value: 2,
        hex: '#ca3435',
        type: 'multiplier',
      }),
      this.service.create({
        name: 'orange',
        value: 3,
        hex: '#ffa010',
        type: 'tolerance',
      }),
      this.service.create({
        name: 'yellow',
        value: 4,
        hex: '#fef200',
        type: 'tolerance',
      }),
    ]);
    return 'Database seeded successfully!';
  }

  @Post()
  create(@Body() createDto: Color) {
    return this.service.create(createDto);
  }

  @Get('/:type')
  findAll(@Param('type') type: 'multiplier' | 'tolerance') {
    return this.service.findByType(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
