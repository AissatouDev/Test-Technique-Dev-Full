import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  constructor(
    private router: Router,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) {}

  clientFormGroup: FormGroup | any;

  ngOnInit(){
    this.clientFormGroup = new FormGroup({
      nom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    })
  }

  get formControls() {
    return this.clientFormGroup['controls'];
  }


  saveCustomer(){
    this.clientService.create(this.clientFormGroup.value).subscribe({
      next: (data) => {
        this.notificationService.notifySuccess('Client ajouté avec succès!', 'Création Client');
        this.router.navigateByUrl('/clients')
      }, error: () => {
        this.notificationService.notifyError('Une erreur est survenue! Réessayez','Création Client')
      }
    })
  }
}
