export class GoogleClient<T> {
  protected projectId: string;
  protected client: T;
  constructor(projectId: string) {
    this.projectId = projectId;
  }
}
