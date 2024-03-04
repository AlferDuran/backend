import { Test, TestingModule } from '@nestjs/testing';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { Color } from './color.entity';

describe('ColorController', () => {
  let controller: ColorController;
  let service: ColorService;

  const mockColorService = {
    create: jest.fn(),
    findByType: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColorController],
      providers: [{ provide: ColorService, useValue: mockColorService }],
    }).compile();

    controller = module.get<ColorController>(ColorController);
    service = module.get<ColorService>(ColorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('seedData', () => {
    it('should seed the database with colors', async () => {
      const result = await controller.seedData();
      expect(result).toBe('Database seeded successfully!');
    });
  });

  describe('create', () => {
    it('should create a color', async () => {
      const colorDto: Color = {
        name: 'Test Color',
        value: 5,
        hex: '#ffffff',
        type: 'multiplier',
        id: 0,
        active: false,
      };

      jest.spyOn(service, 'create').mockResolvedValue(colorDto);

      const result = await controller.create(colorDto);

      expect(result).toEqual(colorDto);
    });
  });

  describe('findAll', () => {
    it('should find colors by type', async () => {
      const type: 'multiplier' | 'tolerance' = 'multiplier';
      const mockColors: Color[] = [
        {
          id: 1,
          name: 'Color1',
          value: 1,
          hex: '#FFFFFF',
          type,
          active: false,
        },
        {
          id: 2,
          name: 'Color2',
          value: 2,
          hex: '#000000',
          type,
          active: false,
        },
      ];

      jest.spyOn(service, 'findByType').mockResolvedValue(mockColors);

      const result = await controller.findAll(type);

      expect(result).toEqual(mockColors);
    });
  });

  describe('update', () => {
    it('should update a color', async () => {
      const id = '1';
      const updateDto = { name: 'Updated Color' };
      const updatedColor: Color = {
        id: 1,
        name: 'Updated Color',
        value: 5,
        hex: '#ffffff',
        type: 'multiplier',
        active: false,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedColor);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual(updatedColor);
    });
  });

  describe('remove', () => {
    it('should remove a color', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(mockDeleteResult);

      const result = await controller.remove(id);

      expect(result).toEqual(mockDeleteResult);
    });
  });
});
