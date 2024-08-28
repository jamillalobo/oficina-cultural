import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

}