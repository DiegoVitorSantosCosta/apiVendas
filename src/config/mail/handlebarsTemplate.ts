import handlebars from 'handlebars';

export interface ITemplateVariables {
    [key: string]: string | number;
}  // interface para definir os valores que serão passados para o template, aqui estou dizendo que o valor de key pode ser varias string ou numbers

export interface IParseMailTemplateDTO {
    template: string;
    variables: ITemplateVariables;
}
class HandlebarsTemplate {
    public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {

        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}

export default HandlebarsTemplate;