import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // POST Create student

  async create(createStudentDto: CreateStudentDto) {
    try {
      await this.studentRepository.insert(createStudentDto);
      return {
        message: 'Student successfully created',
      };
    } catch (err) {
      throw new ConflictException('Student already exists!');
    }
  }

  // GET ReadAll students

  async findAll(limit: number) {
    const result = await this.studentRepository.find({ take: limit });
    return result;
  }

  // GET ReadOne student

  async findOne(id: number) {
    const result = await this.studentRepository.findOneBy({ id: id });
    if (!result) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const result = await this.studentRepository.update(id, updateStudentDto);
    if (result.affected == 0) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Updated successfully',
    };
  }

  async remove(id: number) {
    const result = await this.studentRepository.delete({ id: id });
    if (result.affected == 0) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Deleted successfully',
    };
  }
}
