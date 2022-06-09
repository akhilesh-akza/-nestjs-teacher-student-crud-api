import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('/students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiConflictResponse({ description: 'Student already exists' })
  @ApiCreatedResponse({ description: 'Student created' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
  })
  findAll(@Query('limit') limit: number) {
    return this.studentsService.findAll(limit);
  }

  @ApiNotFoundResponse({ description: "Student doesn't exist" })
  @ApiOkResponse({ description: 'Student found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: "Student doesn't exist" })
  @ApiOkResponse({ description: 'Student found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @ApiNotFoundResponse({ description: "Student doesn't exist" })
  @ApiOkResponse({ description: 'Student deleted' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(+id);
  }
}
