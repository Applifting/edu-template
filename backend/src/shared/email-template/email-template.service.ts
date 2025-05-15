import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { CompilableTemplate } from './interfaces/compilable-template.interface';

@Injectable()
export class EmailTemplateService {
  private readonly TEMPLATE_BASE_PATH = path.resolve(
    __dirname,
    '../../../assets/templates/html/',
  );

  async compileTemplate<T extends Record<string, any>>({
    templatePath,
    variables,
  }: CompilableTemplate<T>): Promise<string> {
    try {
      const filePath = path.resolve(this.TEMPLATE_BASE_PATH, templatePath);
      const htmlTemplate = await fs.readFile(filePath, 'utf8');
      const handlebarsTemplate = Handlebars.compile(htmlTemplate);
      const filledTemplate = handlebarsTemplate(variables);

      return filledTemplate;
    } catch (error) {
      console.error('Error compiling template:', error);
      throw new Error('Failed to read or compile email template.');
    }
  }
}
