import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Color } from './color.entity';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService],
  exports: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
