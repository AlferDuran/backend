import { Injectable } from '@nestjs/common';
import { Color } from './color.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ColorService extends TypeOrmCrudService<Color> {
  constructor(@InjectRepository(Color) repo) {
    super(repo);
  }

  create(createDto: Omit<Color, 'active' | 'id'>): Promise<Color> {
    return this.repo.save(createDto);
  }

  findByType(type: 'tolerance' | 'multiplier'): Promise<Color[]> {
    return this.repo.find({ where: { type } });
  }

  update(id: number, updateDto: Partial<Color>): Promise<Color> {
    return this.repo.save({ id, ...updateDto });
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.repo.delete(id);
  }
}
