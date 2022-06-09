import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (this.studentRepository.hasId(createStudentDto)) {
      throw new HttpException('Student ID already exists', HttpStatus.CONFLICT);
    }
    return await this.studentRepository.create(createStudentDto);
  }

  // GET ReadAll students

  async findAll() {
    const result = await this.studentRepository.find();
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
