import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../../adapters/dto/create-aluno.dto';
import { Aluno } from '../../domain/aluno.model';
import { AlunoRepository } from '../inboundPorts/aluno.repository';
import { error } from 'console';
import { CursoRepository } from '../../../cursos/application/inboundPorts/curso.repository';

@Injectable()
export class AlunosService {

  private idCounter: number;

  constructor(private readonly alunoRepository: AlunoRepository, private readonly cursoRepository: CursoRepository) {
  }

  async criarAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const alunos = this.alunoRepository.listarAlunos();

    this.idCounter = (await alunos).length > 1 ? alunos[(await alunos).length - 1].id + 1 : 1;

    const emailJaExiste = (await alunos).find((aluno) => aluno.email === createAlunoDto.email)

    if(emailJaExiste) {
      throw new error('Email ja cadastrado!')
    }

    const novoAluno: Aluno = {
      id: this.idCounter,
      nome: createAlunoDto.nome,
      endereco: createAlunoDto.endereco,
      email: createAlunoDto.email,
      telefone: createAlunoDto.telefone,
      cursos: []
    }

    this.alunoRepository.salvarAluno(novoAluno);
    
    return novoAluno;
  }

  async matricular(email: string, idCurso: string): Promise<Aluno> {
    const aluno = this.alunoRepository.buscarAlunoPorEmail(email);

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    const curso = this.cursoRepository.buscarCursoPorId(idCurso)

    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    await this.alunoRepository.atualizarAluno(email, (await curso).titulo);
    
    await this.cursoRepository.atualizarCurso(idCurso, (await aluno).nome);

    return this.alunoRepository.buscarAlunoPorEmail(email); 
  }
}