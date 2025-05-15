export interface CompilableTemplate<T extends Record<string, any>> {
  templatePath: string;
  variables: T;
}
