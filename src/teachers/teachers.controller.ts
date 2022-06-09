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
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('/teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly TeachersService: TeachersService) {}

  @ApiOperation({ description: 'Add new Teacher' })
  @ApiConflictResponse({ description: 'Teacher already exists' })
  @ApiCreatedResponse({ description: 'Teacher created' })
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.TeachersService.create(createTeacherDto);
  }

  @Get()
  findAll(@Query('limit', ParseIntPipe) limit: number) {
    return this.TeachersService.findAll(limit);
  }

  @ApiNotFoundResponse({ description: "Teacher doesn't exist" })
  @ApiOkResponse({ description: 'Teacher found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.TeachersService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: "Teacher doesn't exist" })
  @ApiOkResponse({ description: 'Teacher found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.TeachersService.update(+id, updateTeacherDto);
  }

  @ApiNotFoundResponse({ description: "Teacher doesn't exist" })
  @ApiOkResponse({ description: 'Teacher deleted' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.TeachersService.remove(+id);
  }
}
