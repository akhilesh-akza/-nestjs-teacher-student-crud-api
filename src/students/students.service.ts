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
    try {
      const result = await this.studentRepository.save(createStudentDto);
      return result;
    } catch (error) {
      return {
        error,
      };
    }
  }

  // GET ReadAll students

  async findAll() {
    const result = await this.studentRepository.find();
    return result;
  }

  // GET ReadOne student

  async findOne(id: number) {
    try {
      const result = await this.studentRepository.findOneByOrFail({ id: id });
      return result;
    } catch (error) {
      // console.log(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      return await this.studentRepository.update({ id: id }, updateStudentDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    try {
      return await this.studentRepository.delete({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
