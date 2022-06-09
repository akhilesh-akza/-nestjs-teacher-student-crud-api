import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum Dept {
  CS = 'Computer Science',
  CE = 'Civil',
  ME = 'Mechanical',
  EC = 'Electronics',
  EE = 'Electrical',
}

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student ID',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Full Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: Dept, description: 'Department/Branch' })
  @IsNotEmpty()
  @IsEnum(Dept)
  department: Dept;

  @ApiProperty({ description: 'Current Semester' })
  @IsNotEmpty()
  @IsNumber()
  semester: number;

  @ApiProperty({
    description: 'No idea',
  })
  @IsNotEmpty()
  @IsString()
  division: string;

  @ApiProperty({
    description: 'Age [ Optional ]',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  age: number;
}
