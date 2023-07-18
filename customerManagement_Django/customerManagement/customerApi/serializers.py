from rest_framework import serializers
from customerApi.models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id','nom','email','phone','status')