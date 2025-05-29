from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterUserView, UserDetailView, UsuariosListCreateView, UsuariosDetailView,
    InteresesListCreateView, InteresesDetailView,
    InteresesUsuariosListCreateView, InteresesUsuariosDetailView,
    OfertasListCreateView, OfertasDetailView,
    EmpresasListCreateView, EmpresasDetailView,
    OfertasEmpresasListCreateView, OfertasEmpresasDetailView,
    PostulacionesListCreateView, PostulacionesDetailView,
    AuditoriaOfertasListCreateView, AuditoriaOfertasDetailView, UserDataView, UserLoginView
)


router = DefaultRouter()

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register-user"),
    path("register/<int:pk>/", UserDetailView.as_view(), name="usuarios-detail"),

    path("usuarios/", UsuariosListCreateView.as_view(), name="usuarios-list"),
    path("usuarios/<int:pk>/", UsuariosDetailView.as_view(), name="usuarios-detail"),
    
    path("intereses/", InteresesListCreateView.as_view(), name="intereses-list"),
    path("intereses/<int:pk>/", InteresesDetailView.as_view(), name="intereses-detail"),
    
    path("intereses-usuarios/", InteresesUsuariosListCreateView.as_view(), name="intereses-usuarios-list"),
    path("intereses-usuarios/<int:pk>/", InteresesUsuariosDetailView.as_view(), name="intereses-usuarios-detail"),
    
    path("ofertas/", OfertasListCreateView.as_view(), name="ofertas-disponibles-list"),
    path("ofertas/<int:pk>/", OfertasDetailView.as_view(), name="ofertas-disponibles-detail"),
    
    path("empresas/", EmpresasListCreateView.as_view(), name="empresas-list"),
    path("empresas/<int:pk>/", EmpresasDetailView.as_view(), name="empresas-detail"),
    
    path("ofertas-empresas/", OfertasEmpresasListCreateView.as_view(), name="ofertas-empresas-list"),
    path("ofertas-empresas/<int:pk>/", OfertasEmpresasDetailView.as_view(), name="ofertas-empresas-detail"),
    
    path("postulaciones/", PostulacionesListCreateView.as_view(), name="postulaciones-list"),
    path("postulaciones/<int:pk>/", PostulacionesDetailView.as_view(), name="postulaciones-detail"),
    
    path("auditoria-ofertas/", AuditoriaOfertasListCreateView.as_view(), name="auditoria-ofertas-list"),
    path("auditoria-ofertas/<int:pk>/", AuditoriaOfertasDetailView.as_view(), name="auditoria-ofertas-detail"),
]