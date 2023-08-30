import { Command } from './command';
import { ICommandFactory } from './interfaces/factory.interface';

export class CommandFactory implements ICommandFactory {
  constructor(
    private readonly _startCommand: Command,
    private readonly _addProductCommand: Command,
    private readonly _imageCommand: Command,
    private readonly _deleteCommand: Command,
    private readonly _updateCommand: Command,
    private readonly _getCommand: Command,
    private readonly _banCommand: Command,
    private readonly _unbanCommand: Command,
  ) {}

  createCommands(): Command[] {
    return [
      this._startCommand,
      this._addProductCommand,
      this._imageCommand,
      this._deleteCommand,
      this._updateCommand,
      this._getCommand,
      this._banCommand,
      this._unbanCommand,
    ];
  }
}
