export abstract class EmailStrategy {
  public abstract send(html: string): Promise<void>;
}
