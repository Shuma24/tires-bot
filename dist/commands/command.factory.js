"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandFactory = void 0;
class CommandFactory {
    constructor(_startCommand, _addProductCommand, _imageCommand, _deleteCommand, _updateCommand, _getCommand, _banCommand, _unbanCommand) {
        this._startCommand = _startCommand;
        this._addProductCommand = _addProductCommand;
        this._imageCommand = _imageCommand;
        this._deleteCommand = _deleteCommand;
        this._updateCommand = _updateCommand;
        this._getCommand = _getCommand;
        this._banCommand = _banCommand;
        this._unbanCommand = _unbanCommand;
    }
    createCommands() {
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
exports.CommandFactory = CommandFactory;
