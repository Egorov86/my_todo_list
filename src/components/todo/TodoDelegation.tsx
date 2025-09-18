import { memo, useCallback, useRef, useState } from 'react';

type ActionType = 'add' | 'del' | 'toggle';

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

const Button = memo(
  ({
    action,
    children,
  }: {
    action: ActionType;
    children: React.ReactNode;
  }) => {
    return <button data-action={action}>{children}</button>;
  }
);

function Form1({ ref }: { ref: React.MutableRefObject<HTMLInputElement | null> }) {
  return (
    <fieldset>
      <legend>Form 1</legend>
      <input ref={ref} />
      <Button action={'add'}>➕</Button>
    </fieldset>
  );
}

const Form = memo(Form1);

export function ToDoDelegation() {
  const ref = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<ToDoItem[]>([]);

  const addItem = (text: string): void => {
    setList((prev) => [...prev, new ToDoItem(text)]);
  };

  const delItem = (id: number): void => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCheck = (id: number): void => {
    setList((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      const updatedItem = prev[index].toggleCheck();
      return [
        ...prev.slice(0, index),
        updatedItem,
        ...prev.slice(index + 1),
      ];
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    const closestActionEl = target.closest('[data-action]');
    if (!closestActionEl) return;

    const action = closestActionEl.dataset.action as ActionType;
    let id: number | undefined;

    if (action === 'del' || action === 'toggle') {
      const parentWithId = target.closest('[data-id]');
      if (parentWithId) {
        id = parseInt(parentWithId.dataset.id!, 10); // Типобезопасность
      }
    }

    switch (action) {
      case 'add':
        if (ref.current && ref.current.value.trim()) {
          addItem(ref.current.value.trim());
          ref.current.value = '';
        }
        break;
      case 'del':
        if (typeof id === 'number') {
          delItem(id);
        }
        break;
      case 'toggle':
        if (typeof id === 'number') {
          toggleCheck(id);
        }
        break;
    }
  };

  return (
    <fieldset onClick={handleClick}>
      <Form ref={ref} />
      <List list={list} />
    </fieldset>
  );
}

function Item({ item }: { item: ToDoItem }): JSX.Element {
  return (
    <li data-id={`${item.id}`}>
      <label>
        <input readOnly checked={item.checked} type="checkbox" data-action="toggle" />
        {item.text}
        <Button action="del">❌</Button>
        {item.checked && '✔'}
      </label>
    </li>
  );
}

const PureItem = memo(Item);

function List({ list }: { list: ToDoItem[] }): JSX.Element {
  return (
    <fieldset>
      <legend>List</legend>
      <ol>{list.map((item) => <PureItem key={item.id} item={item} />)}</ol>
    </fieldset>
  );
}