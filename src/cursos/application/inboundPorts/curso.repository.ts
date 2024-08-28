import { Injectable } from "@nestjs/common";
import { Curso } from "../../domain/curso.model";

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

  async atualizarCurso(cursoComAlunos: Curso): Promise<Curso> {

    const cursoValido = this.cursos.find(curso => curso.idCurso === cursoComAlunos.idCurso);

    if (!cursoValido) {
      throw new Error('Curso não encontrado');
    }

    cursoValido.alunos.push(...cursoComAlunos.alunos)
    
    return await this.salvarCurso(cursoValido);
  }
  
  buscarCursoPorId(id: string): Promise<Curso> {
    const Curso = this.cursos.find(curso => curso.idCurso === Number(id))
    return Promise.resolve(Curso)    
  };

}