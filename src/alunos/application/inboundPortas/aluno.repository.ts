import { Injectable } from "@nestjs/common";
import { Aluno } from "../../domain/aluno.model";

@Injectable()
export class AlunoRepository{
  alunos: Aluno[] = []

  salvarAluno(aluno: Aluno): Promise<Aluno> {
    this.alunos.push(aluno);
    return Promise.resolve(aluno);
  }

  listarAlunos(): Promise<Aluno[]> {
      return Promise.resolve(this.alunos);
  };
  
  buscarAlunoPorEmail(email: string): Promise<Aluno> {
    const aluno = this.alunos.find(aluno => aluno.email === email)
    return Promise.resolve(aluno)    
  };

}