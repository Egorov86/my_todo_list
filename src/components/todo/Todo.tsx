import { memo, useCallback, useRef, useState } from 'react';

interface ToDoItemProps {
  id: number;
  checked: boolean;
  text: string;
}

class ToDoItem implements ToDoItemProps {
  id: number;
  checked: boolean;
  text: string;

  constructor(text: string) {
    this.id = Math.random();
    this.checked = false;
    this.text = text;
  }

  toggleCheck(): ToDoItem {
    return new ToDoItem(this.text).with({ checked: !this.checked });
  }

  with(props: Partial<ToDoItem>): ToDoItem {
    return Object.assign(new ToDoItem(this.text), this, props);
  }
}