from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    UsuariosViewSet, UsersViewSet, InteresesViewSet, InteresesUsuariosViewSet, Users_UsuariosViewSet, EmpresasViewSet,
    OfertasViewSet, OfertasEmpresasViewSet,
    PostulacionesViewSet, AuditoriaOfertasViewSet,
    UserDataView, Users_EmpresasViewSet, auth_user_groups
)

# Configuración del router para ViewSets
router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'usuarios', UsuariosViewSet)
router.register(r'users-usuarios', Users_UsuariosViewSet)
router.register(r'user-group', auth_user_groups)
router.register(r'intereses', InteresesViewSet)
router.register(r'intereses-usuarios', InteresesUsuariosViewSet)
router.register(r'empresas', EmpresasViewSet)
router.register(r'users-empresas', Users_EmpresasViewSet)


router.register(r'ofertas', OfertasViewSet)
router.register(r'ofertas-empresas', OfertasEmpresasViewSet)
router.register(r'postulaciones', PostulacionesViewSet)
router.register(r'auditoria-ofertas', AuditoriaOfertasViewSet)


# Agregar rutas personalizadas para autenticación
# urlpatterns = router.urls + [
#     path("register/", RegisterUserView.as_view(), name="register"),
#     path("login/", UserLoginView.as_view(), name="login"),
#     path("user-data/", UserDataView.as_view(), name="user-data"),
# ]

urlpatterns = router.urls + [
    path("user-data/", UserDataView.as_view(), name="user-data"),
]
