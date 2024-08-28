import { CursoRepository } from '../../../cursos/application/inboundPorts/curso.repository';
import { AlunoRepository } from '../inboundPorts/aluno.repository';
import { AlunosService } from './alunos.service';

describe('AlunosService', () => {


  it('should create a aluno', async () => {
    const alunoRepository = new AlunoRepository();
    const cursoRepository = new CursoRepository();
    const service = new AlunosService(alunoRepository, cursoRepository);
    
    const esperado = {
      id: 1,
      nome: 'Joao',
      endereco: 'Rua A',
      email: 'joao@doe.com',
      telefone: '123456789',
      cursos: []
    }

    const resultado = await service.criarAluno({ nome: 'Joao', endereco: 'Rua A', email: 'joao@doe.com', telefone: '123456789' });

    expect(resultado).toEqual(esperado);
  
  });

  it('should matricular a aluno', async () => {
    const alunoRepository = new AlunoRepository();
    const cursoRepository = new CursoRepository();
    const service = new AlunosService(alunoRepository, cursoRepository);
  
    const alunoEsperado = {
      id: 1,
      nome: 'Joao',
      endereco: 'Rua A',
      email: 'joao@doe.com',
      telefone: '123456789',
      cursos: ['Curso Python'],  // Aluno deve estar matriculado neste curso
    };
  
    const cursoEsperado = {
      idCurso: 1,
      titulo: 'Curso Python',
      descricao: 'Descricao A',
      alunos: ['Joao'],  // O nome do aluno deve estar na lista de alunos do curso
    };
  
    // Criar um aluno e um curso
    await service.criarAluno({ nome: 'Joao', endereco: 'Rua A', email: 'joao@doe.com', telefone: '123456789' });
    await cursoRepository.salvarCurso({ idCurso: 1, titulo: 'Curso Python', descricao: 'Descricao A', alunos: [] });
  
    // Realizar a matrícula
    const alunoMatriculado = await service.matricular('joao@doe.com', '1');
  
    // Buscar o curso atualizado para verificação
    const cursoAtualizado = await cursoRepository.buscarCursoPorId('1');
  
    // Verificar se o aluno foi matriculado corretamente
    expect(alunoMatriculado).toEqual(alunoEsperado);
    expect(cursoAtualizado).toEqual(cursoEsperado);
  });
  
  
});
