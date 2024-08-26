import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../../adapters/dto/create-aluno.dto';
import { Aluno } from '../../domain/aluno.model';
import { AlunoRepository } from '../inboundPortas/aluno.repository';
import { error } from 'console';

@Injectable()
export class AlunosService {

  private idCounter: number;

  constructor(private readonly alunoRepository: AlunoRepository) {
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

  matricular(id: number, idCurso: number) {}

}
