import { Curso } from './../../domain/curso.model';
import { Injectable } from "@nestjs/common";


@Injectable()
export class CursoRepository{
  cursos: Curso[] = [] // conexao com o banco de dados

  salvarCurso(curso: Curso): Promise<Curso> {
    this.cursos.push(curso);
    return Promise.resolve(curso);
  }

  listarCursos(): Promise<Curso[]> {
    return Promise.resolve(this.cursos);
  };

  async atualizarCurso(id: string, novoAluno: string): Promise<Curso> {

    const curso = this.cursos.find(curso => curso.idCurso === Number(id));
    
    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    curso.alunos.push(novoAluno);

    return await this.salvarCurso(curso);
  }
  
  buscarCursoPorId(id: string): Promise<Curso> {
    const curso = this.cursos.find(curso => curso.idCurso === Number(id))
    return Promise.resolve(curso)    
  };

}