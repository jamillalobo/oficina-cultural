import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from '../../adapters/dto/create-curso.dto';
import { Curso } from 'src/cursos/domain/curso.model';
import { CursoRepository } from '../inboundPorts/curso.repository';

@Injectable()
export class CursosService {

  private idCounter: number;

  constructor(private cursoRepository: CursoRepository) {}

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const cursos = this.cursoRepository.listarCursos();

    this.idCounter = (await cursos).length > 1 ? cursos[(await cursos).length - 1].id + 1 : 1;

    const novoCurso: Curso = {
      idCurso: this.idCounter,
      titulo: createCursoDto.titulo,
      descricao: createCursoDto.descricao,
      alunos: [],
    }

    this.cursoRepository.salvarCurso(novoCurso)
    return novoCurso;
  }

  async findAll() : Promise<Curso[]> {
    return await this.cursoRepository.listarCursos();
  }

  async findOne(id: string): Promise<Curso> {
    return await this.cursoRepository.buscarCursoPorId(id)
  }
}
