from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    UsuariosViewSet, UsersViewSet, InteresesViewSet, InteresesUsuariosViewSet, Users_UsuariosViewSet, EmpresasViewSet,
    OfertasViewSet, PostulacionesViewSet, AuditoriaOfertasViewSet, Users_EmpresasViewSet, auth_user_groups, 
    CustomTokenObtainPairView, UserDataView, CYSMensajesViewSet, EnviarClaveTemporalViewSet
)

from rest_framework_simplejwt.views import( TokenRefreshView)

# Configuración del router para ViewSets
router = DefaultRouter()

router.register(r'mensajesCYS', CYSMensajesViewSet, basename='mensajesCYS')
router.register(r'claveTemporal', EnviarClaveTemporalViewSet, basename='EnviarClaveTemporal')
router.register(r'users', UsersViewSet)
router.register(r'usuarios', UsuariosViewSet)
router.register(r'users-usuarios', Users_UsuariosViewSet)
router.register(r'user-group', auth_user_groups)
router.register(r'intereses', InteresesViewSet)
router.register(r'intereses-usuarios', InteresesUsuariosViewSet)
router.register(r'empresas', EmpresasViewSet)
router.register(r'users-empresas', Users_EmpresasViewSet)


router.register(r'ofertas', OfertasViewSet)
router.register(r'postulaciones', PostulacionesViewSet)
router.register(r'auditoria-ofertas', AuditoriaOfertasViewSet)


urlpatterns = router.urls + [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user-data/", UserDataView.as_view(), name="user-data"),
]