import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent  {
  currentDialog: MatDialogRef<DetailsComponent> = null;
  destroy = new Subject<any>();

  constructor(matDialog: MatDialog, route: ActivatedRoute, router: Router) {
    route.params.pipe(takeUntil(this.destroy))
    .subscribe(params => {
      if(this.currentDialog) {
        this.currentDialog.close();
      }

      this.currentDialog = matDialog.open(DetailsComponent, {
        data: { id: params.id }
      });
      this.currentDialog.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        router.navigateByUrl('/');
      })
    })
   }

  ngOnDestroy() {
    this.destroy.next();
  }

}
