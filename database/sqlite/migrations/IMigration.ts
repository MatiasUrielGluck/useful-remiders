export interface IMigration {
  execute: () => Promise<void>;
}
