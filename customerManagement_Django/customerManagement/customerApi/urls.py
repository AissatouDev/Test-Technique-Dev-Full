from django.urls import path
from customerApi import views

urlpatterns = [
    path('clients/', views.client_List),
    path('client/<int:pk>/', views.client_detail),
    path('client/search', views.search)
]
