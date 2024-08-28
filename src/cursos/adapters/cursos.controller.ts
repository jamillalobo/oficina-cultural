import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CursosService } from '../application/outboundPorts/cursos.service';
import { CreateCursoDto } from '../adapters/dto/create-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(id);
  }
}
