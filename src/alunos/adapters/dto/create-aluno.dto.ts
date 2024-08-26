import { IsEmail, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  name: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Max( new Date().getFullYear() - 16)
  idade: number;
}