import { Aluno } from "src/alunos/domain/aluno.model";

export class Curso {
    idCurso: number;       
    titulo: string;     
    descricao: string;  
    alunos: Aluno[];
}
