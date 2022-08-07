export interface ICommand<T> {
  validate(): void;
  resolve(props: T): any;
}
