import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../../adapters/dto/create-aluno.dto';
import { Aluno } from '../../domain/aluno.model';
import { AlunoRepository } from '../inboundPorts/aluno.repository';
import { error } from 'console';
import { CursoRepository } from 'src/cursos/application/inboundPorts/curso.repository';

@Injectable()
export class AlunosService {

  private idCounter: number;

  constructor(private readonly alunoRepository: AlunoRepository, private readonly cursoRepository: CursoRepository) {
  }

  async criarAluno(createAlunoDto: CreateAlunoDto) {
    const alunos = this.alunoRepository.listarAlunos();

    this.idCounter = (await alunos).length > 1 ? alunos[(await alunos).length - 1].id + 1 : 1;

    const emailJaExiste = (await alunos).find((aluno) => aluno.email === createAlunoDto.email)

    if(emailJaExiste) {
      throw new error('Email ja cadastrado!')
    }

    const novoAluno: Aluno = {
      id: this.idCounter,
      nome: createAlunoDto.name,
      endereco: createAlunoDto.endereco,
      email: createAlunoDto.email,
      telefone: createAlunoDto.telefone,
      cursos: []
    }

    this.alunoRepository.salvarAluno(novoAluno);
  }

  async matricular(email: string, idCurso: string) {
    const aluno = this.alunoRepository.buscarAlunoPorEmail(email);

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    const curso = this.cursoRepository.buscarCursoPorId(idCurso)

    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    const alunoMatriculado = {
      ...aluno,
      cursos: curso
    }

    const alunosNoCurso = {
      ...curso,
      alunos: aluno
    }
    
    this.alunoRepository.atualizarAluno(email, await alunoMatriculado);
    this.cursoRepository.atualizarCurso(await alunosNoCurso);
  }

}
