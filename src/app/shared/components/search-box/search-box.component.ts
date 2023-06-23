import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
        this.onDebounce.emit(value);
    });
  }

  ngOnDestroy() {
    this.debouncerSuscription?.unsubscribe;
  }

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress( searchText: string) {
    this.debouncer.next(searchText);
  }
}
