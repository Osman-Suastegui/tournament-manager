import { Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/homeService/home.service';
import { authService } from '../../../services/authenticateService/auth.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public search: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  public status: "upcoming" | "ongoing" | "completed" | "" = "";
  constructor(
    private app: HomeService,
    private router: Router,
    private auth: authService,
    private route: ActivatedRoute
  ) { }

  usuario: string = localStorage.getItem('usuario') || '';
  tipoUsuario: any = '';

  ngOnInit(): void {
    this.syncStateWithUrl();
    this.initSearchListener();

  }

  goToCreateTournament() {
    this.router.navigate(['/tournament']);
  }

  onStatusClick(status: "upcoming" | "ongoing" | "completed" | "") {
    this.status = status;
  }

  private initSearchListener(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
      )
      .subscribe(term => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { q: term || null },
          queryParamsHandling: 'merge',
          replaceUrl: false        // pushState → Back button works
        });
      });
  }
  

  private syncStateWithUrl(): void {
    const initialQ = this.route.snapshot.queryParamMap.get('q') ?? '';
    this.search.setValue(initialQ, { emitEvent: false });

    const initialStatus = this.route.snapshot.queryParamMap.get('status') as "upcoming" | "ongoing" | "completed" | "" | null;
    if (initialStatus === "upcoming" || initialStatus === "ongoing" || initialStatus === "completed" || initialStatus === "") {
      this.status = initialStatus;
    }
  }

}

