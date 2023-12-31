import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  constructor() {}

  /**
   * Método que um gancho de ciclo de vida que invoca uma função
   * personalizada de detecção de alterações para uma diretiva,
   * além da verificação realizada pelo detector de alterações padrão.
   */
  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm('Você deseja realmente Deletar tudo?');

    if (confirm) {
      this.taskList = [];
    }
  }

  public setEmiterTaskList(event: string) {
    this.taskList.push({ checked: false, task: event });
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Task está vazia, deseja Deletar?');

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      // Rdeordena sempre que selecionado
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}
