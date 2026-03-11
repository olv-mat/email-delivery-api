export abstract class EmailStrategy {
  public abstract send(subject: string, html: string): Promise<void>;
}
