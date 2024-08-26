import { Controller, Post, Body, Param } from '@nestjs/common';
import { AlunosService } from '../application/outboundPorts/alunos.service';
import { CreateAlunoDto } from '../adapters/dto/create-aluno.dto';
// import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  cadastrar(@Body() createAlunoDto: CreateAlunoDto) {
    this.alunosService.criarAluno(createAlunoDto);
  }

  @Post(':id/curso/idCurso')
  matricular(@Param('id') id: number, @Param('idCurso') idCurso: number) {	
    this.alunosService.matricular(id, idCurso);
  }

}
