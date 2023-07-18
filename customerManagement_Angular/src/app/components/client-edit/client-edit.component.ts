import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  clientId!: number;
  clientFormGroup!: FormGroup;

  constructor(
    private activatedRoute:ActivatedRoute,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.clientId = this.activatedRoute.snapshot.params['id'];
    this.clientService.readOne(this.clientId).subscribe({
      next: (client) => {
        this.clientFormGroup = new FormGroup({
          id: new FormControl(client.id),
          nom: new FormControl(client.nom, Validators.required),
          email: new FormControl(client.email, Validators.required),
          phone: new FormControl(client.phone, Validators.required),
          status: new FormControl(client.status, Validators.required)
        })
      },
      error: () => {

      }
    })

  }

  updateCustomer(){
    this.clientService.update(this.clientFormGroup.value).subscribe({
      next: () => {
        this.notificationService.notifySuccess('Client modifié avec succès!', 'Modification Client');
        this.router.navigateByUrl("/clients")
      },
      error: () => {
        this.notificationService.notifyError('Une erreur est survenue! Réessayez','Modification Client')
      }
    })
  }

}
