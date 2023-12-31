from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from customerApi.models import Client
from customerApi.serializers import ClientSerializer

@api_view(['GET', 'POST'])
def client_List(request):
    if request.method == 'GET':
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer= ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def client_detail(request, pk):
    try:
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
       client.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def search(request):
    nom = request.GET.get('nom', '')
    if nom:
        clients = Client.objects.filter(nom__icontains=nom)
    else:
        clients = Client.objects.all()
    
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)