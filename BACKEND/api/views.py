from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from .models import (
    Usuarios, Intereses, InteresesUsuarios, Ofertas, Empresas,
    OfertasEmpresas, Postulaciones, AuditoriaOfertas
)
from .serializers import (
    UsuariosSerializer, InteresesSerializer, InteresesUsuariosSerializer, 
    OfertasSerializer, EmpresasSerializer, OfertasEmpresasSerializer,
    PostulacionesSerializer, AuditoriaOfertasSerializer
)

# ------------------- Permisos personalizados -------------------
class IsAdminUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="admin").exists()

class IsEmpresaUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="empresa").exists()

class IsUsuarioUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="usuario").exists()

# ------------------- Vistas Usuarios -------------------
class RegisterUserView(CreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [AllowAny]

class UsuariosListCreateView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, IsAdminUserGroup]
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class UsuariosDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUserGroup]
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

# ------------------- Vistas Intereses -------------------
class InteresesListCreateView(ListCreateAPIView):
    queryset = Intereses.objects.all()
    serializer_class = InteresesSerializer

class InteresesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Intereses.objects.all()
    serializer_class = InteresesSerializer

# ------------------- Vistas InteresesUsuarios -------------------
class InteresesUsuariosListCreateView(ListCreateAPIView):
    queryset = InteresesUsuarios.objects.all()
    serializer_class = InteresesUsuariosSerializer

class InteresesUsuariosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = InteresesUsuarios.objects.all()
    serializer_class = InteresesUsuariosSerializer

# ------------------- Vistas Ofertas -------------------
class OfertasListCreateView(ListCreateAPIView):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer

class OfertasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ofertas.objects.all()
    serializer_class = OfertasSerializer

# ------------------- Vistas Empresas -------------------
class EmpresasListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsEmpresaUser]
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer

class EmpresasDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsEmpresaUser]
    queryset = Empresas.objects.all()
    serializer_class = EmpresasSerializer

# ------------------- Vistas OfertasEmpresas -------------------
class OfertasEmpresasListCreateView(ListCreateAPIView):
    queryset = OfertasEmpresas.objects.all()
    serializer_class = OfertasEmpresasSerializer

class OfertasEmpresasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = OfertasEmpresas.objects.all()
    serializer_class = OfertasEmpresasSerializer

# ------------------- Vistas Postulaciones -------------------
class PostulacionesListCreateView(ListCreateAPIView):
    queryset = Postulaciones.objects.all()
    serializer_class = PostulacionesSerializer

class PostulacionesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Postulaciones.objects.all()
    serializer_class = PostulacionesSerializer


class AuditoriaOfertasListCreateView(ListCreateAPIView):
    queryset = AuditoriaOfertas.objects.all()
    serializer_class = AuditoriaOfertasSerializer
    
class AuditoriaOfertasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = AuditoriaOfertas
    serializer_class = AuditoriaOfertasSerializer
    