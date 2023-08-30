import { Command } from '../command';

export interface ICommandFactory {
  createCommands(): Command[];
}
