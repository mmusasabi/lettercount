'use babel';

import LettercountView from './lettercount-view';
import { CompositeDisposable } from 'atom';

export default {

  lettercountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lettercountView = new LettercountView(state.lettercountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lettercountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lettercount:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lettercountView.destroy();
  },

  serialize() {
    return {
      lettercountViewState: this.lettercountView.serialize()
    };
  },

  toggle() {
    console.log('Lettercount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
