import { beforeEach, describe, it, expect } from 'vitest';
import { useLayoutStore } from './LayoutStore';

beforeEach(() => {
  useLayoutStore.getState().reset();

  localStorage.clear();
});

describe('LayoutStore', () => {
  it('should toggle editing mode', () => {
    const { isEditing, toggleEditing } = useLayoutStore.getState();
    expect(isEditing).toBe(false);

    toggleEditing();
    expect(useLayoutStore.getState().isEditing).toBe(true);

    toggleEditing();
    expect(useLayoutStore.getState().isEditing).toBe(false);
  });

  it('edit layout background', () => {
    const { layout, editLayoutBackground } = useLayoutStore.getState();
    expect(layout.background).toBe('#ffffff');

    editLayoutBackground('#000000');
    expect(useLayoutStore.getState().layout.background).toBe('#000000');
  });

  it("should add a button to the layout's components", () => {
    const { layout, addButton } = useLayoutStore.getState();
    expect(layout.components).toHaveLength(0);

    addButton({
      id: '1',
      type: 'BUTTON',
      properties: {},
    });

    expect(useLayoutStore.getState().layout.components).toHaveLength(1);
    expect(useLayoutStore.getState().layout.components[0].id).toBe('1');
  });

  it("should add a table to the layout's components", () => {
    const { layout, addTable } = useLayoutStore.getState();
    expect(layout.components).toHaveLength(0);

    addTable({
      id: '1',
      type: 'TABLE',
      tableType: 'sales',
      properties: {},
      columns: [],
    });

    expect(useLayoutStore.getState().layout.components).toHaveLength(1);
    expect(useLayoutStore.getState().layout.components[0].id).toBe('1');
    expect(useLayoutStore.getState().layout.components[0].type).toBe('TABLE');
  });

  it('should select a component', () => {
    const { selectedComponentId, selectComponent } = useLayoutStore.getState();
    expect(selectedComponentId).toEqual(null);

    selectComponent('1');
    expect(useLayoutStore.getState().selectedComponentId).toEqual('1');

    selectComponent('2');
    expect(useLayoutStore.getState().selectedComponentId).toEqual('2');

    selectComponent(null);
    expect(useLayoutStore.getState().selectedComponentId).toEqual(null);
  });

  it('should update a button properties', () => {
    const { layout, addButton, updateButton } = useLayoutStore.getState();
    expect(layout.components).toHaveLength(0);
    addButton({
      id: '1',
      type: 'BUTTON',
      properties: {},
    });

    expect(useLayoutStore.getState().layout.components).toHaveLength(1);
    expect(
      useLayoutStore.getState().layout.components[0].properties.text
    ).toBeUndefined();
    updateButton('1', { text: 'Updated Button', textColor: 'red' });
    expect(useLayoutStore.getState().layout.components[0].properties.text).toBe(
      'Updated Button'
    );
    expect(
      useLayoutStore.getState().layout.components[0].properties.textColor
    ).toBe('red');
  });

  it('should update a table properties', () => {
    const { layout, addTable, updateTable } = useLayoutStore.getState();
    expect(layout.components).toHaveLength(0);
    addTable({
      id: '1',
      type: 'TABLE',
      properties: {
        headerColor: 'blue',
        backgroundColor: 'white',
        textColor: 'black',
        size: { width: '100%', height: '200px' },
      },
      columns: [{ type }],
    });
    expect(useLayoutStore.getState().layout.components.tables).toHaveLength(1);
    expect(
      useLayoutStore.getState().layout.components.tables[0].properties
        .headerColor
    ).toBe('blue');
    updateTable('1', { headerColor: 'red', backgroundColor: 'gray' });
    expect(
      useLayoutStore.getState().layout.components.tables[0].properties
        .headerColor
    ).toBe('red');
    expect(
      useLayoutStore.getState().layout.components.tables[0].properties
        .backgroundColor
    ).toBe('gray');
  });

  it('should delete a button from the layout', () => {
    const { layout, addButton, deleteButton } = useLayoutStore.getState();
    expect(layout.components.buttons).toHaveLength(0);
    addButton({
      id: '1',
      properties: {
        label: 'Test Button',
        color: 'blue',
        isClicked: false,
        textColor: 'white',
        position: { mode: 'absolute', x: 10, y: 10 },
      },
    });
    expect(useLayoutStore.getState().layout.components.buttons).toHaveLength(1);
    deleteButton('1');
    expect(useLayoutStore.getState().layout.components.buttons).toHaveLength(0);
  });

  it('should delete a table from the layout', () => {
    const { layout, addTable, deleteTable } = useLayoutStore.getState();
    expect(layout.components.tables).toHaveLength(0);
    addTable({
      id: '1',
      type: 'sales',
      properties: {
        headerColor: 'blue',
        backgroundColor: 'white',
        textcolor: 'black',
        size: { width: '100%', height: '200px' },
      },
      position: { mode: 'grid', gridRow: 1, gridCol: 1 },
      columns: [{ type: 'DESCR', title: 'Description' }],
    });
    expect(useLayoutStore.getState().layout.components.tables).toHaveLength(1);
    deleteTable('1');
    expect(useLayoutStore.getState().layout.components.tables).toHaveLength(0);
  });

  it('should reset the store to its initial state', () => {
    const store = useLayoutStore.getState();

    store.toggleEditing();
    store.addButton({
      id: '1',
      properties: {
        label: 'Test Button',
        color: 'blue',
        isClicked: false,
        textColor: 'white',
        position: { mode: 'absolute', x: 10, y: 10 },
      },
    });
    store.selectComponent('1', 'buttons');

    expect(useLayoutStore.getState().isEditing).toBe(true);
    expect(useLayoutStore.getState().layout.components.buttons).toHaveLength(1);
    expect(useLayoutStore.getState().selectedComponent).toEqual({
      id: '1',
      type: 'buttons',
    });

    store.reset();

    expect(useLayoutStore.getState().isEditing).toBe(false);
    expect(useLayoutStore.getState().layout.components.buttons).toHaveLength(0);
    expect(useLayoutStore.getState().selectedComponent).toEqual({
      id: null,
      type: 'buttons',
    });
  });
});
