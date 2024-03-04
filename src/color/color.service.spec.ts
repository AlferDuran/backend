import { Test, TestingModule } from '@nestjs/testing';
import { ColorService } from './color.service';
import { Color } from './color.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ColorService', () => {
  let colorService: ColorService;

  const mockColorRepository = {
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorService,
        { provide: getRepositoryToken(Color), useValue: mockColorRepository },
      ],
    }).compile();

    colorService = module.get<ColorService>(ColorService);
  });

  it('should be defined', () => {
    expect(colorService).toBeDefined();
  });

  describe('create', () => {
    it('should create a color', async () => {
      const colorDto: Omit<Color, 'active' | 'id'> = {
        name: 'Test Color',
        type: 'tolerance',
        value: 10,
        hex: '',
      };

      const createdColor: Color = { id: 1, active: true, ...colorDto };

      mockColorRepository.save.mockResolvedValue(createdColor);

      const result = await colorService.create(colorDto);

      expect(result).toEqual(createdColor);
    });
  });

  describe('findByType', () => {
    it('should find colors by type', async () => {
      const mockColors: Color[] = [
        {
          id: 1,
          active: true,
          name: 'Color1',
          type: 'tolerance',
          value: 10,
          hex: '',
        },
        {
          id: 2,
          active: true,
          name: 'Color2',
          type: 'tolerance',
          value: 10,
          hex: '',
        },
      ];

      const type = 'tolerance';

      mockColorRepository.find.mockResolvedValue(mockColors);

      const result = await colorService.findByType(type);

      expect(result).toEqual(mockColors);
    });
  });

  describe('update', () => {
    it('should update a color', async () => {
      const id = 1;
      const updateDto: Partial<Color> = { name: 'Updated Color' };
      const updatedColor: Color = {
        id,
        active: true,
        name: 'Updated Color',
        value: 5,
        hex: '#ffffff',
        type: 'multiplier',
      };

      mockColorRepository.save.mockResolvedValue(updatedColor);

      const result = await colorService.update(id, updateDto);

      expect(result).toEqual(updatedColor);
    });
  });

  describe('remove', () => {
    it('should remove a color', async () => {
      const id = 1;
      const mockDeleteResult = { affected: 1 };

      mockColorRepository.delete.mockResolvedValue(mockDeleteResult);

      const result = await colorService.remove(id);

      expect(result).toEqual(mockDeleteResult);
    });
  });
});
