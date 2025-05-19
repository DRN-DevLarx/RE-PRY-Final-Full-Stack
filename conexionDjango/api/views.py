
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Libros, Autor, Categorias, LibrosCategorias
from .serializers import LibrosSerializer, AutorSerializer, CategoriasSerializer, LibrosCategoriasSerializer

from rest_framework.permissions import BasePermission, IsAuthenticated




class IsAdminUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="admin").exists()


class IsLectorUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="lector").exists()


class IsBibliotecarioUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="bibliotecario").exists()


class LibrosListCreateView(ListCreateAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated,IsLectorUserGroup]
    queryset = Libros.objects.all()
    serializer_class = LibrosSerializer


class LibrosDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated]
    queryset = Libros.objects.all()
    serializer_class = LibrosSerializer


class AutorListCreateView (ListCreateAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated,
                          IsLectorUserGroup, IsBibliotecarioUserGroup]
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer


class AutorDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated]
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer


class CategoriasListCreateView(ListCreateAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated,
                          IsLectorUserGroup, IsBibliotecarioUserGroup]
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer


class CategoriasDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated, IsLectorUserGroup]
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer


class LibrosCategoriasListCreateView(ListCreateAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated, IsLectorUserGroup]
    queryset = LibrosCategorias.objects.all()
    serializer_class = LibrosCategoriasSerializer


class LibrosCategoriasDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUserGroup, IsAuthenticated]
    queryset = LibrosCategorias.objects.all()
    serializer_class = LibrosCategoriasSerializer
