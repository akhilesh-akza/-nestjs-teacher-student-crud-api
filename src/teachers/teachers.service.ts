import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  // POST Create teacher

  async create(createTeacherDto: CreateTeacherDto) {
    const exists =
      (await this.teacherRepository.count({
        where: { id: createTeacherDto.id },
      })) != 0
        ? true
        : false;

    if (exists) {
      throw new HttpException('Teacher ID already exists', HttpStatus.CONFLICT);
    }
    this.teacherRepository.save(createTeacherDto);
    return {
      message: 'Teacher successfully created',
    };
  }

  // GET ReadAll teacher

  async findAll(limit: number) {
    const result = await this.teacherRepository.find({ take: limit });
    return result;
  }

  // GET ReadOne teacher

  async findOne(id: number) {
    const result = await this.teacherRepository.findOneBy({ id: id });
    if (!result) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const result = await this.teacherRepository.update(id, updateTeacherDto);
    if (result.affected == 0) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Updated successfully',
    };
  }

  async remove(id: number) {
    const result = await this.teacherRepository.delete({ id: id });
    if (result.affected == 0) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Deleted successfully',
    };
  }
}
