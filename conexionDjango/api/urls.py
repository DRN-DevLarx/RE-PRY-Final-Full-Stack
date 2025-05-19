from django.urls import path
from .views import LibrosListCreateView,LibrosDetailView,AutorListCreateView,AutorDetailView
from .views import LibrosCategoriasListCreateView,LibrosCategoriasDetailView,CategoriasDetailView,CategoriasListCreateView

urlpatterns = [
     
     path('libros/',LibrosListCreateView.as_view(), name='libros-listar-crear'),
     path('libros/<int:pk>/',LibrosDetailView.as_view(), name='libros-editar-actualizar'),
     path('autores/',AutorListCreateView.as_view(), name='autores-listar-crear'),
     path('autores/<int:pk>/',AutorDetailView.as_view(), name='autores-editar-actualizar'),
     path('categorias/', CategoriasListCreateView.as_view(), name='categorias-list-create'),
     path('categorias/<int:pk>/', CategoriasDetailView.as_view(), name='categorias-editar-actualizar'),
     path('libros-categorias/', LibrosCategoriasListCreateView.as_view(), name='libros-categorias-list-create'),
     path('libros-categorias/<int:pk>/', LibrosCategoriasDetailView.as_view(), name='libros-categorias-editar-actualizar'),
]




