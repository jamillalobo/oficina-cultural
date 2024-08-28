import { IsString } from "class-validator";

export class CreateCursoDto {
    @IsString()
    titulo: string;

    @IsString()
    descricao: string;
}
