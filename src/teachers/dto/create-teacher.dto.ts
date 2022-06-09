import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Dept } from 'src/common/departments';

export class CreateTeacherDto {
  @ApiProperty({ description: 'Teacher ID' })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Full name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Department / Branch', enum: Dept })
  @IsNotEmpty()
  @IsEnum(Dept)
  department: Dept;

  @ApiProperty({ description: 'Years of Experience' })
  @IsNotEmpty()
  @IsNumber()
  YOE: number;

  @ApiProperty({ description: 'Age', required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  age: number;
}
