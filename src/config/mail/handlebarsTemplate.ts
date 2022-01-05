import handlebars from 'handlebars';
import fs from 'fs';

export interface ITemplateVariables {
    [key: string]: string | number;
}  // interface para definir os valores que serão passados para o template, aqui estou dizendo que o valor de key pode ser varias string ou numbers

export interface IParseMailTemplateDTO {
    file: string;
    variables: ITemplateVariables;
}
class HandlebarsTemplate {
    public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {

        const templateFileContent = await fs.promises.readFile(
            file,
            {
                encoding: 'utf-8'
            });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}

export default HandlebarsTemplate;