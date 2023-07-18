from django.db import models

class Client(models.Model):
    nom = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=25)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.nom