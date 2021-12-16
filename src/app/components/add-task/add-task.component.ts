import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from './../../services/ui.service';

import { Task } from './../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  task: string = '';
  datetime: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subcription: Subscription;

  constructor(private uiService: UiService) {
    this.subcription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.task) {
      alert('Please add a task.');
      return;
    }

    const newTask: Task = {
      task: this.task,
      datetime: this.datetime,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.task = '';
    this.datetime = '';
    this.reminder = false;

    this.uiService.toggleAddTask();
  }
}
