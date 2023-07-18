import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] | undefined;
  nom = "";

  constructor(
    private clientService: ClientService,
    private router: Router,
    private notificationService: NotificationService
  ){

  }

  ngOnInit(){
    this.getAllClients()
  }

  getAllClients(){
    this.clientService.read().subscribe({
      next: (data) => {
        console.log(data);
        this.clients = data
      },
      error: () => {

      }
    })
  }

  onEdit(cl: Client){
    this.router.navigateByUrl("client-edit/"+cl.id);
  }

  onDelete(cl: Client){
    let message = confirm("Etes-vous sûr de vouloir supprimer?");
    if (message) {
      this.clientService.delete(cl).subscribe({
        next: () => {
          this.notificationService.notifySuccess('Client supprimé avec succès!', 'Suppression Client');
          this.getAllClients()
        },
        error: () => {
          this.notificationService.notifyError('Une erreur est survenue! Réessayez','Suppression Client')
        }
      })
    }
  }

  onSearch(): void {
    this.clientService.searchByName(this.nom).subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
      }
    });
  }

}
